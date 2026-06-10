"use client"

import { useState, useEffect } from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  format,
  getDay,
} from "date-fns"
import { es } from "date-fns/locale"
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Star,
  MessageCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Teacher = string | null

type FormData = {
  teacher: Teacher
  parentName: string
  childName: string
  childAge: string
  selectedDate: Date | null
  selectedTimeSlot: string
}

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
]

const WEEK_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

const TOTAL_STEPS = 3
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5493517712181"

function buildWAMessage(data: FormData): string {
  const teacher = data.teacher ?? "Sin preferencia"
  const date = data.selectedDate
    ? format(data.selectedDate, "EEEE d 'de' MMMM", { locale: es })
    : "A coordinar"
  const time = data.selectedTimeSlot || "A coordinar"
  return (
    `Hola! Soy ${data.parentName} y me gustaría reservar una clase particular de inglés para ${data.childName} (${data.childAge}).\n` +
    `Profe de preferencia: ${teacher}.\n` +
    `Fecha preferida: ${date}.\n` +
    `Horario: ${time}.`
  )
}

function CalendarPicker({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (date: Date) => void
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = startOfDay(new Date())

  const monthStart = startOfMonth(currentMonth)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calEnd = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })

  const days: Date[] = []
  let d = calStart
  while (d <= calEnd) {
    days.push(d)
    d = addDays(d, 1)
  }

  function isDisabled(date: Date) {
    return isBefore(startOfDay(date), today) || getDay(date) === 0
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-foreground capitalize text-sm">
          {format(currentMonth, "MMMM yyyy", { locale: es })}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map((wd) => (
          <div
            key={wd}
            className="text-center text-xs font-semibold text-muted-foreground py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, idx) => {
          const inMonth = isSameMonth(day, currentMonth)
          const isSelected = selected ? isSameDay(day, selected) : false
          const isTodayDate = isToday(day)
          const disabled = isDisabled(day)

          if (!inMonth) {
            return <div key={idx} className="aspect-square" />
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !disabled && onSelect(day)}
              disabled={disabled}
              className={[
                "aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all",
                disabled
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "hover:bg-primary/10 cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary font-bold shadow-sm"
                  : "",
                isTodayDate && !isSelected
                  ? "ring-1 ring-primary text-primary font-bold"
                  : "",
                !isSelected && !disabled ? "text-foreground" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type Props = {
  initialTeacher?: Teacher
  teachers?: { name: string; bio: string }[]
}

export function PrivateClassesForm({ initialTeacher, teachers = [] }: Props) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    teacher: initialTeacher ?? null,
    parentName: "",
    childName: "",
    childAge: "",
    selectedDate: null,
    selectedTimeSlot: "",
  })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [takenSlots, setTakenSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch taken slots whenever teacher + date change
  useEffect(() => {
    if (!formData.selectedDate || !formData.teacher) {
      setTakenSlots([])
      return
    }
    const date = format(formData.selectedDate, "yyyy-MM-dd")
    setLoadingSlots(true)
    fetch(`/api/slots?teacher=${encodeURIComponent(formData.teacher)}&date=${date}`)
      .then((r) => r.json())
      .then((data) => setTakenSlots(data.taken ?? []))
      .catch(() => setTakenSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [formData.selectedDate, formData.teacher])

  function validateStep2(): boolean {
    const e: Record<string, string> = {}
    if (!formData.parentName.trim()) e.parentName = "Ingresá tu nombre"
    if (!formData.childName.trim()) e.childName = "Ingresá el nombre de tu hijo/a"
    if (!formData.childAge) e.childAge = "Seleccioná la edad"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleFinish() {
    setErrors({})

    // If a specific teacher + date + time slot are selected, reserve the slot
    if (formData.teacher && formData.selectedDate && formData.selectedTimeSlot) {
      setSubmitting(true)
      try {
        const res = await fetch("/api/slots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacher: formData.teacher,
            date: format(formData.selectedDate, "yyyy-MM-dd"),
            time_slot: formData.selectedTimeSlot,
            parent_name: formData.parentName,
            child_name: formData.childName,
            child_age: formData.childAge,
          }),
        })

        if (res.status === 409) {
          setTakenSlots((prev) => [...prev, formData.selectedTimeSlot])
          setFormData((prev) => ({ ...prev, selectedTimeSlot: "" }))
          setErrors({ slot: "Ese horario acaba de ser reservado. Por favor elegí otro." })
          setSubmitting(false)
          return
        }
      } catch {
        // If API fails, continue anyway — WhatsApp confirmation is the fallback
      }
      setSubmitting(false)
    }

    setDone(true)
  }

  if (done) {
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWAMessage(formData))}`
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
          {formData.teacher && (
            <p>
              <span className="font-semibold">Profe:</span> {formData.teacher}
            </p>
          )}
          {formData.selectedDate && (
            <p>
              <span className="font-semibold">Fecha:</span>{" "}
              <span className="capitalize">
                {format(formData.selectedDate, "EEEE d 'de' MMMM", { locale: es })}
              </span>
            </p>
          )}
          {formData.selectedTimeSlot && (
            <p>
              <span className="font-semibold">Horario:</span> {formData.selectedTimeSlot}
            </p>
          )}
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
          Te confirmamos el horario a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
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

      {/* Step 1: Teacher selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 1
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              ¿Con qué profe querés la clase?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Podés cambiar la profe más adelante si es necesario.
            </p>
          </div>

          <div className="space-y-3">
            {teachers.map((teacher) => (
              <button
                key={teacher.name}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    teacher: prev.teacher === teacher.name ? null : teacher.name,
                  }))
                }
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                  formData.teacher === teacher.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent shrink-0">
                    <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {teacher.bio}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      formData.teacher === teacher.name
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {formData.teacher === teacher.name && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                </div>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, teacher: null }))}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                formData.teacher === null
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Sin preferencia</p>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.teacher === null
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {formData.teacher === null && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
              </div>
            </button>
          </div>

          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
            onClick={() => setStep(2)}
          >
            Continuar
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}

      {/* Step 2: Contact info */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 2
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
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
            </Button>
            <Button
              size="lg"
              className="flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base"
              onClick={() => {
                if (validateStep2()) setStep(3)
              }}
            >
              Continuar
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Date + time slot picker */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Paso 3
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              Elegí tu horario
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seleccioná una fecha y el bloque horario que mejor te queda.
            </p>
          </div>

          <CalendarPicker
            selected={formData.selectedDate}
            onSelect={(date) =>
              setFormData((prev) => ({ ...prev, selectedDate: date, selectedTimeSlot: "" }))
            }
          />

          {/* Time slots — appear after a date is picked */}
          {formData.selectedDate && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">¿En qué horario?</p>
                {loadingSlots && (
                  <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const taken = takenSlots.includes(slot)
                  const selected = formData.selectedTimeSlot === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={taken || loadingSlots}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, selectedTimeSlot: slot }))
                      }
                      className={[
                        "rounded-xl border-2 py-2.5 text-center font-bold text-sm transition-all relative",
                        taken
                          ? "border-border bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through"
                          : selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/40 text-foreground cursor-pointer",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
              {formData.teacher === null && (
                <p className="text-xs text-muted-foreground">
                  Seleccioná una profe en el paso 1 para ver disponibilidad en tiempo real.
                </p>
              )}
            </div>
          )}

          {errors.slot && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {errors.slot}
            </p>
          )}

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
              onClick={handleFinish}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>¡Reservar clase! <ChevronRight className="w-5 h-5 ml-1" /></>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
