import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"
import { SlotBlocker } from "@/components/panel/slot-blocker"
import { ReservationsList } from "@/components/panel/reservations-list"
import { ProfileEditor } from "@/components/panel/profile-editor"
import { PanelNav } from "@/components/panel/panel-nav"

export default async function DashboardPage() {
  const authClient = await createSupabaseServerClient()

  const {
    data: { user },
  } = await authClient.auth.getUser()

  if (!user) redirect("/panel/login")

  const { data: teacher } = await serviceSupabase
    .from("teachers")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!teacher) redirect("/panel/login")
  if (teacher.role === "admin") redirect("/panel/admin")

  const { data: reservations } = await serviceSupabase
    .from("reservations")
    .select("*")
    .eq("teacher", teacher.name)
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true })

  return (
    <div className="min-h-screen bg-secondary">
      <PanelNav teacherName={teacher.name} role={teacher.role} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Hola, {teacher.name} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Panel de control de tus clases particulares
          </p>
        </div>

        {/* Reservas */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Mis reservas</h2>
          </div>
          <div className="p-2">
            <ReservationsList reservations={reservations ?? []} />
          </div>
        </section>

        {/* Bloquear horarios */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Bloquear horarios</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hacé click en un horario verde para bloquearlo. Los bloqueados no aparecen disponibles para los alumnos.
            </p>
          </div>
          <div className="p-6">
            <SlotBlocker teacherName={teacher.name} />
          </div>
        </section>

        {/* Editar perfil */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Mi perfil</h2>
          </div>
          <div className="p-6">
            <ProfileEditor profile={{ name: teacher.name, bio: teacher.bio, image_url: teacher.image_url ?? null, video_url: teacher.video_url ?? null }} />
          </div>
        </section>
      </main>
    </div>
  )
}
