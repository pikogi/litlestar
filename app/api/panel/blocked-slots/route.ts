import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teacher = searchParams.get("teacher")
  const date = searchParams.get("date")

  if (!teacher || !date) {
    return NextResponse.json({ blocked: [] })
  }

  const { data } = await serviceSupabase
    .from("blocked_slots")
    .select("time_slot")
    .eq("teacher_name", teacher)
    .eq("date", date)

  return NextResponse.json({ blocked: data?.map((r) => r.time_slot) ?? [] })
}

export async function POST(request: Request) {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { teacher_name, date, time_slot } = await request.json()

  if (!teacher_name || !date || !time_slot) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const { error } = await serviceSupabase
    .from("blocked_slots")
    .insert({ teacher_name, date, time_slot })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const teacher = searchParams.get("teacher")
  const date = searchParams.get("date")
  const time_slot = searchParams.get("time_slot")

  if (!teacher || !date || !time_slot) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const { error } = await serviceSupabase
    .from("blocked_slots")
    .delete()
    .eq("teacher_name", teacher)
    .eq("date", date)
    .eq("time_slot", time_slot)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
