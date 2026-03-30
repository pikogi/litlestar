import { LeadForm } from "@/components/lead-form"
import { Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Inscripción – Little Star",
  description: "Reservá la clase gratuita de inglés para tu hijo/a.",
}

export default function InscripcionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simplificado para mantener el foco en el formulario */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
              <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Little Star
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="bg-card rounded-3xl border border-border shadow-lg p-6 md:p-10">
          <LeadForm />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          Tus datos están seguros y no serán compartidos con terceros.
        </p>
      </main>
    </div>
  )
}
