import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

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

  const formData = await request.formData()
  const file = formData.get("file") as File
  const type = formData.get("type") as string  // "image" | "video"
  const teacherId = formData.get("teacherId") as string

  if (!file || !type || !teacherId) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 })
  }

  const ext = file.name.split(".").pop()
  const path = `${teacherId}/${type}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error: uploadError } = await serviceSupabase.storage
    .from("teachers")
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = serviceSupabase.storage
    .from("teachers")
    .getPublicUrl(path)

  const column = type === "image" ? "image_url" : "video_url"
  const { error: dbError } = await serviceSupabase
    .from("teachers")
    .update({ [column]: publicUrl })
    .eq("id", teacherId)

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json({ url: publicUrl })
}
