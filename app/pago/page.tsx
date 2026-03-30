"use client"

import { useState } from "react"
import { Star, Check, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PLANES = [
  {
    id: "trimestral",
    name: "Plan Trimestral",
    price: "$180.000",
    period: "pago único por 3 meses",
    savings: "Ahorrás $60.000",
    badge: "Mejor precio",
    badgeClass: "bg-primary text-primary-foreground",
    highlight: true,
    features: [
      "2 clases por semana",
      "Grupos de máx. 5 alumnos",
      "50 minutos por clase",
      "Portal educativo incluido",
      "Soporte por WhatsApp",
    ],
  },
  {
    id: "mensual",
    name: "Plan Mensual",
    price: "$80.000",
    period: "por mes",
    savings: null,
    badge: null,
    badgeClass: "",
    highlight: false,
    features: [
      "2 clases por semana",
      "Grupos de máx. 5 alumnos",
      "50 minutos por clase",
      "Portal educativo incluido",
      "Soporte por WhatsApp",
    ],
  },
  {
    id: "personalizado",
    name: "Plan Personalizado",
    price: "$100.000",
    period: "a coordinar",
    savings: null,
    badge: "1 a 1",
    badgeClass: "bg-accent text-accent-foreground",
    highlight: false,
    features: [
      "Clases individuales",
      "Horario a elección",
      "Cantidad a definir",
      "Portal educativo incluido",
      "Seguimiento personalizado",
    ],
  },
]

export default function PagoPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState(false)

  async function handlePagar(planId: string) {
    setLoading(planId)
    setError(false)
    try {
      const res = await fetch("/api/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(true)
        setLoading(null)
      }
    } catch {
      setError(true)
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
              <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Little Star
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-semibold">Pago seguro</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-foreground">
            Elegí tu plan
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comenzamos las clases en Abril 2026
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-semibold">
            Hubo un error al procesar el pago. Por favor intentá de nuevo.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANES.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-3xl p-7 flex flex-col ${
                plan.highlight
                  ? "border-2 border-primary shadow-xl"
                  : "border border-border"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${plan.badgeClass}`}>
                    {plan.id === "trimestral" && <Star className="w-3.5 h-3.5" fill="currentColor" />}
                    {plan.id === "personalizado" && <Sparkles className="w-3.5 h-3.5" />}
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`text-center ${plan.badge ? "pt-4" : ""}`}>
                <h2 className="text-lg font-bold text-foreground">{plan.name}</h2>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <p className="text-xs text-muted-foreground mt-1">{plan.period}</p>
                </div>
                {plan.savings && (
                  <div className="inline-flex mt-2 px-3 py-1 rounded-full bg-accent/30 text-accent-foreground text-xs font-bold">
                    {plan.savings}
                  </div>
                )}
              </div>

              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className={`mt-7 w-full font-bold py-6 rounded-xl text-base ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
                disabled={loading !== null}
                onClick={() => handlePagar(plan.id)}
              >
                {loading === plan.id ? (
                  <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  "Pagar con Mercado Pago"
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Pago seguro con Mercado Pago</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Garantía de devolución 30 días</span>
          </div>
        </div>
      </main>
    </div>
  )
}
