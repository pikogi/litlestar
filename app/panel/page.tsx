import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"

export default async function PanelIndexPage() {
  const authClient = await createSupabaseServerClient()

  const {
    data: { user },
  } = await authClient.auth.getUser()

  if (!user) redirect("/panel/login")

  let { data: teacher } = await serviceSupabase
    .from("teachers")
    .select("role")
    .eq("user_id", user.id)
    .single()

  // Primera vez que la miss entra: vincular por email
  if (!teacher && user.email) {
    const { data: unlinked } = await serviceSupabase
      .from("teachers")
      .select("id, role")
      .eq("email", user.email)
      .is("user_id", null)
      .single()

    if (unlinked) {
      await serviceSupabase
        .from("teachers")
        .update({ user_id: user.id })
        .eq("id", unlinked.id)
      teacher = { role: unlinked.role }
    }
  }

  if (teacher?.role === "admin") redirect("/panel/admin")

  redirect("/panel/dashboard")
}
