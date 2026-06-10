import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"
import { createClient } from "@supabase/supabase-js"

const adminAuthClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function requireAdmin() {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return null
  const { data: t } = await serviceSupabase
    .from("teachers")
    .select("role")
    .eq("user_id", user.id)
    .single()
  return t?.role === "admin" ? user : null
}

export async function POST(request: Request) {
  const adminUser = await requireAdmin()
  if (!adminUser) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { name, email } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"

  const { error: inviteError } = await adminAuthClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${siteUrl}/auth/callback`,
  })

  if (inviteError) {
    const alreadyExists = inviteError.message.toLowerCase().includes("already been registered")
    if (alreadyExists) {
      // User exists — send a password reset email so they can set/reset their password
      const { error: resetError } = await adminAuthClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth/callback`,
      })
      if (resetError) {
        return NextResponse.json({ error: resetError.message }, { status: 500 })
      }
    } else {
      return NextResponse.json({ error: inviteError.message }, { status: 500 })
    }
  }

  const { data: existing } = await serviceSupabase
    .from("teachers")
    .select("id")
    .eq("email", email)
    .single()

  if (!existing) {
    const { error: dbError } = await serviceSupabase.from("teachers").insert({
      name,
      email,
      role: "teacher",
      active: true,
    })
    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request) {
  const adminUser = await requireAdmin()
  if (!adminUser) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { id, active } = await request.json()

  if (!id || typeof active !== "boolean") {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const { error } = await serviceSupabase
    .from("teachers")
    .update({ active })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
