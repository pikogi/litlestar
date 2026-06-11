import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

export async function POST(request: Request) {
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get("file") as File
  const type = formData.get("type") as string // "image" | "video"

  if (!file || !type) {
    return NextResponse.json({ error: "missing file or type" }, { status: 400 })
  }

  const ext = file.name.split(".").pop()
  const path = `${user.id}/${type}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error: uploadError } = await serviceSupabase.storage
    .from("teachers")
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = serviceSupabase.storage
    .from("teachers")
    .getPublicUrl(path)

  const column = type === "image" ? "image_url" : "video_url"
  const { error: dbError } = await serviceSupabase
    .from("teachers")
    .update({ [column]: publicUrl })
    .eq("user_id", user.id)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ url: publicUrl })
}
