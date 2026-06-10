import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"
import { createClient } from "@supabase/supabase-js"

const adminAuthClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(request: Request) {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { data: adminTeacher } = await serviceSupabase
    .from("teachers")
    .select("role")
    .eq("user_id", user.id)
    .single()

  if (adminTeacher?.role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 })
  }

  const { email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const { data: authUsers } = await adminAuthClient.auth.admin.listUsers()
  const targetUser = authUsers?.users?.find((u) => u.email === email)

  if (!targetUser) {
    return NextResponse.json({ error: "Usuario no encontrado en Auth" }, { status: 404 })
  }

  const { error } = await adminAuthClient.auth.admin.updateUserById(targetUser.id, { password })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
