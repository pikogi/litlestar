import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

async function requireAdmin() {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return null

  const { data: teacher } = await serviceSupabase
    .from("teachers")
    .select("role")
    .eq("user_id", user.id)
    .single()

  return teacher?.role === "admin" ? user : null
}

export async function GET() {
  const adminUser = await requireAdmin()
  if (!adminUser) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { data } = await serviceSupabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true })

  return NextResponse.json(data ?? [])
}

export async function PATCH(request: Request) {
  const adminUser = await requireAdmin()
  if (!adminUser) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { id, status } = await request.json()

  if (!id || !["confirmed", "cancelled", "pending"].includes(status)) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 })
  }

  const { error } = await serviceSupabase
    .from("reservations")
    .update({ status })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
