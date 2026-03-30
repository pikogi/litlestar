"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  Check,
  ChevronRight,
  Users,
  Clock,
  BookOpen,
  MessageCircle,
  ArrowLeft,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Reemplazá con el ID de tu video de YouTube ──────────────────────────────
// Ej: si la URL es https://www.youtube.com/watch?v=dQw4w9WgXcQ, el ID es dQw4w9WgXcQ
const YOUTUBE_VIDEO_ID = "REEMPLAZAR_CON_ID_DE_YOUTUBE"
// ─────────────────────────────────────────────────────────────────────────────

type Plan = "trimestral" | "mensual" | "personalizado" | null

type FormData = {
  plan: Plan
  parentName: string
  childName: string
  childAge: string
  days: string[]
  timeSlots: string[]
}

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

const TIME_SLOTS = [
  { id: "morning", label: "Mañana", time: "8:00 – 12:00" },
  { id: "afternoon", label: "Tarde", time: "12:00 – 17:00" },
  { id: "evening", label: "Noche", time: "17:00 – 21:00" },
]

const PLANS = [
  {
    id: "trimestral" as Plan,
    name: "Plan Trimestral",
    price: "$60.000/mes",
    note: "3 meses pagados juntos · Ahorrás $60.000",
    badge: "Mejor precio",
    badgeClass: "bg-primary text-primary-foreground",
  },
  {
    id: "mensual" as Plan,
    name: "Plan Mensual",
    price: "$80.000/mes",
    note: "Pago mensual, sin compromiso",
    badge: null,
    badgeClass: "",
  },
  {
    id: "personalizado" as Plan,
    name: "Plan Personalizado",
    price: "A presupuestar",
    note: "Clases individuales 1 a 1",
    badge: "A tu medida",
    badgeClass: "bg-accent text-accent-foreground",
  },
]

const TOTAL_STEPS = 5

function buildWAMessage(data: FormData): string {
  const planLabels: Record<NonNullable<Plan>, string> = {
    trimestral: "Trimestral ($60.000/mes)",
    mensual: "Mensual ($80.000/mes)",
    personalizado: "Personalizado (1 a 1)",
  }
  const plan = data.plan ? planLabels[data.plan] : "Sin definir"
  return (
    `Hola! Soy ${data.parentName} y me gustaría inscribir a ${data.childName} (${data.childAge}).\n` +
    `Plan de interés: ${plan}.\n` +
    `Días disponibles: ${data.days.join(", ")}.\n` +
    `Horarios: ${data.timeSlots.join(", ")}.`
  )
}

function LeadFormInner() {
  const searchParams = useSearchParams()
  const initialPlan = (searchParams.get("plan") as Plan) ?? null

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    plan: initialPlan,
    parentName: "",
    childName: "",
    childAge: "",
    days: [],
    timeSlots: [],
  })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function toggleArray(key: "days" | "timeSlots", value: string) {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {}
    if (!formData.parentName.trim()) e.parentName = "Ingresá tu nombre"
    if (!formData.childName.trim()) e.childName = "Ingresá el nombre de tu hijo/a"
    if (!formData.childAge) e.childAge = "Seleccioná la edad"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleFinish() {
    if (formData.timeSlots.length === 0) {
      setErrors({ timeSlots: "Seleccioná al menos un horario" })
      return
    }
    setErrors({})
    setDone(true)
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch (_) {
      // No bloqueamos la UX si falla el webhook
    }
  }

  if (done) {
    const waUrl = `https://wa.me/5493517712181?text=${encodeURIComponent(buildWAMessage(formData))}`
    const planLabels: Record<NonNullable<Plan>, string> = {
      trimestral: "Trimestral",
      mensual: "Mensual",
      personalizado: "Personalizado",
    }
    return (
      <div className="text-center py-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Star className="w-9 h-9 text-primary" fill="currentColor" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">
          ¡Listo, {formData.parentName}!
        </h2>
        <p className="mt-3 text-muted-foreground text-sm max-w-xs mx-auto">
          Ya tenemos tus datos. El último paso es confirmar el horario por WhatsApp.
        </p>

        <div className="mt-6 bg-muted/50 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-2 text-sm">
          <p>
            <span className="font-semibold">Alumno/a:</span> {formData.childName},{" "}
            {formData.childAge}
          </p>
          {formData.plan && (
            <p>
              <span className="font-semibold">Plan:</span> {planLabels[formData.plan]}
            </p>
          )}
          <p>
            <span className="font-semibold">Días:</span> {formData.days.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Horarios:</span> {formData.timeSlots.join(", ")}
          </p>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:bg-[#20b858] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Confirmar por WhatsApp
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          Te asignamos un horario que se ajuste a tu disponibilidad.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Paso {step} de {TOTAL_STEPS}
          </span>
          <span className="text-xs font-semibold text-primary">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Paso 1: Conoce Little Star ─────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 1
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              ¿Qué hace especial a Little Star?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Antes de elegir tu plan, conocé cómo son nuestras clases.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Users, label: "Grupos de 5", sub: "máx. por clase" },
              { Icon: Clock, label: "50 minutos", sub: "por sesión" },
              { Icon: BookOpen, label: "Portal educativo", sub: "videos y tareas" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="bg-primary/5 rounded-2xl p-3 text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <p className="text-xs font-bold text-foreground leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground leading-tight">{sub}</p>
              </div>
            ))}
          </div>

          {/* Video embed */}
          <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
              title="Cómo son las clases de Little Star"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
            onClick={() => setStep(2)}
          >
            Ver nuestros planes
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}

      {/* ── Paso 2: Planes ─────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 2
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              Elige tu plan
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Podés cambiar el plan más adelante. Esto es solo orientativo.
            </p>
          </div>

          <div className="space-y-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    plan: prev.plan === plan.id ? null : plan.id,
                  }))
                }
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                  formData.plan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground">{plan.name}</span>
                      {plan.badge && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${plan.badgeClass}`}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{plan.note}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-base font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.plan === plan.id
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {formData.plan === plan.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl font-bold"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
            </Button>
            <Button
              size="lg"
              className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
              onClick={() => setStep(3)}
            >
              Continuar
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Paso 3: Datos de contacto ───────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 3
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              Cuéntanos sobre vos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Para personalizar tu experiencia.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">
                Tu nombre
              </label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, parentName: e.target.value }))
                }
                placeholder="Ej: María González"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.parentName ? "border-red-400" : "border-border"
                }`}
              />
              {errors.parentName && (
                <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">
                Nombre de tu hijo/a
              </label>
              <input
                type="text"
                value={formData.childName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, childName: e.target.value }))
                }
                placeholder="Ej: Sofía"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.childName ? "border-red-400" : "border-border"
                }`}
              />
              {errors.childName && (
                <p className="text-xs text-red-500 mt-1">{errors.childName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-1.5">
                Edad de tu hijo/a
              </label>
              <select
                value={formData.childAge}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, childAge: e.target.value }))
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.childAge ? "border-red-400" : "border-border"
                }`}
              >
                <option value="">Seleccioná la edad</option>
                {[5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                  <option key={age} value={`${age} años`}>
                    {age} años
                  </option>
                ))}
              </select>
              {errors.childAge && (
                <p className="text-xs text-red-500 mt-1">{errors.childAge}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl font-bold"
              onClick={() => setStep(2)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
            </Button>
            <Button
              size="lg"
              className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
              onClick={() => {
                if (validateStep3()) setStep(4)
              }}
            >
              Continuar
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Paso 4: Días disponibles ────────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 4
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              ¿Qué días puede conectarse {formData.childName}?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Podés elegir más de uno.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DAYS.map((day) => {
              const selected = formData.days.includes(day)
              return (
                <button
                  key={day}
                  onClick={() => toggleArray("days", day)}
                  className={`rounded-2xl border-2 py-3.5 px-4 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 text-foreground"
                  }`}
                >
                  {selected && <Check className="w-4 h-4 shrink-0" />}
                  {day}
                </button>
              )
            })}
          </div>
          {errors.days && <p className="text-xs text-red-500">{errors.days}</p>}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl font-bold"
              onClick={() => setStep(3)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
            </Button>
            <Button
              size="lg"
              className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
              onClick={() => {
                if (formData.days.length === 0) {
                  setErrors({ days: "Seleccioná al menos un día" })
                  return
                }
                setErrors({})
                setStep(5)
              }}
            >
              Continuar
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Paso 5: Horarios ────────────────────────────────────────────── */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 5
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              ¿En qué horarios puede conectarse?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Podés elegir más de uno. ¡Último paso!
            </p>
          </div>

          <div className="space-y-3">
            {TIME_SLOTS.map((slot) => {
              const selected = formData.timeSlots.includes(slot.label)
              return (
                <button
                  key={slot.id}
                  onClick={() => toggleArray("timeSlots", slot.label)}
                  className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{slot.label}</p>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selected ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          {errors.timeSlots && (
            <p className="text-xs text-red-500">{errors.timeSlots}</p>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl font-bold"
              onClick={() => setStep(4)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
            </Button>
            <Button
              size="lg"
              className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
              onClick={handleFinish}
            >
              ¡Reservar clase gratis!
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function LeadForm() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <LeadFormInner />
    </Suspense>
  )
}
