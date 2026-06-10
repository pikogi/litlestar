import { PrivateClassesContent } from "@/components/private-classes-content"
import { supabase } from "@/lib/supabase"
import { Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Clases Particulares de Inglés para Niños | Little Star",
  description:
    "Clases individuales 1 a 1 de inglés online para niños de 5 a 12 años. Elegí tu profe, reservá gratis y avanzá a tu ritmo.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ClasesParticularesPage() {
  const { data } = await supabase
    .from("teachers")
    .select("name, bio")
    .eq("active", true)
    .eq("role", "teacher")
    .order("created_at", { ascending: true })

  const teachers = (data ?? []).map((t) => ({
    name: t.name as string,
    bio: (t.bio as string) ?? "",
  }))
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
              <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">Little Star</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <PrivateClassesContent teachers={teachers} />

        <p className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          Tus datos están seguros y no serán compartidos con terceros.
        </p>
      </main>
    </div>
  )
}
