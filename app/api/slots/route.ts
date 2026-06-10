import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// GET /api/slots?teacher=Miss+Sofi&date=2026-06-15
// Returns the list of already-taken time slots for a teacher on a given date.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teacher = searchParams.get("teacher")
  const date = searchParams.get("date")

  if (!teacher || !date) {
    return NextResponse.json({ taken: [] })
  }

  const [reservationsResult, blockedResult] = await Promise.all([
    supabase
      .from("reservations")
      .select("time_slot")
      .eq("teacher", teacher)
      .eq("date", date)
      .in("status", ["pending", "confirmed"]),
    supabase
      .from("blocked_slots")
      .select("time_slot")
      .eq("teacher_name", teacher)
      .eq("date", date),
  ])

  const reserved = reservationsResult.data?.map((r) => r.time_slot) ?? []
  const blocked = blockedResult.data?.map((r) => r.time_slot) ?? []
  const taken = [...new Set([...reserved, ...blocked])]

  return NextResponse.json({ taken })
}

// POST /api/slots
// Creates a pending reservation. Returns 409 if the slot is already taken.
export async function POST(request: Request) {
  const body = await request.json()
  const { teacher, date, time_slot, parent_name, child_name, child_age } = body

  if (!teacher || !date || !time_slot) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const { error } = await supabase.from("reservations").insert({
    teacher,
    date,
    time_slot,
    parent_name,
    child_name,
    child_age,
    status: "pending",
  })

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "slot_taken" }, { status: 409 })
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
