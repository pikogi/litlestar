import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { supabase as serviceSupabase } from "@/lib/supabase"
import { AdminReservations } from "@/components/panel/admin-reservations"
import { CreateTeacherForm } from "@/components/panel/create-teacher-form"
import { TeacherToggleList } from "@/components/panel/teacher-toggle-list"
import { SetPasswordForm } from "@/components/panel/set-password-form"
import { PanelNav } from "@/components/panel/panel-nav"

export default async function AdminPage() {
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

  if (!teacher || teacher.role !== "admin") redirect("/panel/dashboard")

  const { data: reservations } = await serviceSupabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true })

  const { data: allTeachers } = await serviceSupabase
    .from("teachers")
    .select("id, name, bio, active, role")
    .eq("role", "teacher")
    .order("created_at", { ascending: true })

  return (
    <div className="min-h-screen bg-secondary">
      <PanelNav teacherName={teacher.name} role={teacher.role} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel de administración</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Todas las reservas y gestión de profes
          </p>
        </div>

        {/* Todas las reservas */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Todas las reservas</h2>
          </div>
          <div className="p-2">
            <AdminReservations initialReservations={reservations ?? []} />
          </div>
        </section>

        {/* Profes activas */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Profes</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Activá o desactivá quién aparece en la página pública
            </p>
          </div>
          <div className="px-6 py-2">
            <TeacherToggleList teachers={allTeachers ?? []} />
          </div>
        </section>

        {/* Crear cuenta de profe */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Agregar profe</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Le llega un email de invitación para crear su contraseña
            </p>
          </div>
          <div className="p-6">
            <CreateTeacherForm />
          </div>
        </section>

        {/* Setear contraseña sin email */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Setear contraseña manual</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Si el email no llega o hay rate limit — seteá la contraseña vos y mandásela por WhatsApp
            </p>
          </div>
          <div className="p-6">
            <SetPasswordForm />
          </div>
        </section>
      </main>
    </div>
  )
}
