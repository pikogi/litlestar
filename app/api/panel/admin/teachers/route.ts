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

  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  // Check if auth user already exists
  const { data: existingList } = await adminAuthClient.auth.admin.listUsers()
  const existingAuthUser = existingList?.users.find((u) => u.email === email)

  let authUserId: string

  if (existingAuthUser) {
    // Update password for existing user
    const { error } = await adminAuthClient.auth.admin.updateUserById(existingAuthUser.id, { password })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    authUserId = existingAuthUser.id
  } else {
    // Create new auth user with password, no email sent
    const { data, error } = await adminAuthClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    authUserId = data.user.id
  }

  // Upsert teacher row
  const { data: existing } = await serviceSupabase
    .from("teachers")
    .select("id")
    .eq("email", email)
    .single()

  if (existing) {
    await serviceSupabase
      .from("teachers")
      .update({ name, user_id: authUserId })
      .eq("id", existing.id)
  } else {
    const { error: dbError } = await serviceSupabase.from("teachers").insert({
      name,
      email,
      user_id: authUserId,
      role: "teacher",
      active: true,
    })
    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request) {
  const adminUser = await requireAdmin()
  if (!adminUser) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const body = await request.json()
  const { id, active, name, bio } = body

  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })

  const updates: Record<string, unknown> = {}
  if (typeof active === "boolean") updates.active = active
  if (name !== undefined) updates.name = name
  if (bio !== undefined) updates.bio = bio

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "no fields to update" }, { status: 400 })
  }

  const { error } = await serviceSupabase
    .from("teachers")
    .update(updates)
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
