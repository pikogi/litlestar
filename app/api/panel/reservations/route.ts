import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

export async function GET() {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { data: teacher } = await serviceSupabase
    .from("teachers")
    .select("name")
    .eq("user_id", user.id)
    .single()

  if (!teacher) return NextResponse.json({ error: "not_found" }, { status: 404 })

  const { data } = await serviceSupabase
    .from("reservations")
    .select("*")
    .eq("teacher", teacher.name)
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true })

  return NextResponse.json(data ?? [])
}
