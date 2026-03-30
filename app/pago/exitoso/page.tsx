"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Star, MessageCircle, Check } from "lucide-react"
import Link from "next/link"

const PLAN_LABELS: Record<string, string> = {
  trimestral: "Plan Trimestral",
  mensual: "Plan Mensual",
  personalizado: "Plan Personalizado",
}

const PLAN_PRICES: Record<string, number> = {
  trimestral: 180000,
  mensual: 80000,
  personalizado: 100000,
}

function ExitosoInner() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("external_reference") ?? ""
  const status = searchParams.get("collection_status")
  const isPending = searchParams.get("pending") === "1"

  useEffect(() => {
    // Disparar conversión solo en pagos aprobados
    if (status === "approved" || (!status && !isPending)) {
      if (typeof window !== "undefined" && (window as any).fbq) {
        ;(window as any).fbq("track", "Purchase", {
          value: PLAN_PRICES[plan] ?? 0,
          currency: "ARS",
          content_name: PLAN_LABELS[plan] ?? plan,
        })
      }
    }
  }, [plan, status, isPending])

  const waMessage = `Hola! Acabo de realizar el pago del ${PLAN_LABELS[plan] ?? "plan"}. Quedo a la espera de confirmar mi horario.`
  const waUrl = `https://wa.me/5493517712181?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
              <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Little Star
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-card rounded-3xl border border-border shadow-lg p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            {isPending ? (
              <Star className="w-9 h-9 text-primary" fill="currentColor" />
            ) : (
              <Check className="w-10 h-10 text-primary" />
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-foreground">
            {isPending ? "Pago en proceso" : "¡Pago recibido!"}
          </h1>

          <p className="mt-3 text-muted-foreground text-sm">
            {isPending
              ? "Tu pago está siendo procesado. Te avisaremos cuando se confirme."
              : `Tu ${PLAN_LABELS[plan] ?? "plan"} está confirmado. El siguiente paso es coordinar tu horario por WhatsApp.`}
          </p>

          {!isPending && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:bg-[#20b858] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Coordinar horario por WhatsApp
            </a>
          )}

          <p className="mt-5 text-xs text-muted-foreground">
            Guardá este comprobante. Ante cualquier consulta escribinos por WhatsApp.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function ExitosoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <ExitosoInner />
    </Suspense>
  )
}
