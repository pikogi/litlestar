"use client"

import { useState } from "react"
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

type Reservation = {
  id: string
  teacher: string
  date: string
  time_slot: string
  status: string
  parent_name: string | null
  child_name: string | null
  child_age: string | null
  created_at: string
}

const STATUS: Record<string, { label: string; icon: React.ReactNode; card: string; badge: string }> = {
  pending: {
    label: "Pendiente",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    card: "border-l-yellow-400",
    badge: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  confirmed: {
    label: "Confirmada",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    card: "border-l-green-400",
    badge: "bg-green-50 text-green-700 border border-green-200",
  },
  cancelled: {
    label: "Cancelada",
    icon: <XCircle className="w-3.5 h-3.5" />,
    card: "border-l-red-300",
    badge: "bg-red-50 text-red-600 border border-red-200",
  },
}

function formatDate(dateStr: string) {
  try {
    const [year, month, day] = dateStr.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    return format(date, "EEE d MMM", { locale: es })
  } catch {
    return dateStr
  }
}

export function ReservationsList({
  reservations,
  isAdmin = false,
  onStatusChange,
}: {
  reservations: Reservation[]
  isAdmin?: boolean
  onStatusChange?: (id: string, status: string) => void
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleStatusChange(id: string, status: string) {
    setLoadingId(id)
    await fetch("/api/panel/admin/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    onStatusChange?.(id, status)
    setLoadingId(null)
  }

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">Sin reservas todavía</p>
        <p className="text-xs text-muted-foreground mt-1">Las reservas de los alumnos aparecerán acá</p>
      </div>
    )
  }

  const pending = reservations.filter((r) => r.status === "pending")
  const rest = reservations.filter((r) => r.status !== "pending")
  const sorted = [...pending, ...rest]

  return (
    <div className="divide-y divide-border">
      {sorted.map((r) => {
        const s = STATUS[r.status] ?? STATUS.pending
        const isLoading = loadingId === r.id

        return (
          <div
            key={r.id}
            className={`flex items-center gap-4 px-6 py-4 border-l-4 hover:bg-secondary/30 transition-colors ${s.card} ${r.status === "cancelled" ? "opacity-60" : ""}`}
          >
            {/* Avatar inicial */}
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">
                {(r.child_name ?? "?")[0].toUpperCase()}
              </span>
            </div>

            {/* Info principal */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-foreground">{r.child_name ?? "—"}</span>
                {r.child_age && (
                  <span className="text-xs text-muted-foreground">{r.child_age}</span>
                )}
                {isAdmin && (
                  <span className="text-xs text-muted-foreground">· {r.teacher}</span>
                )}
              </div>
              {r.parent_name && (
                <div className="flex items-center gap-1 mt-0.5">
                  <User className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">{r.parent_name}</span>
                </div>
              )}
            </div>

            {/* Fecha y hora */}
            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground capitalize">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                {formatDate(r.date)}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {r.time_slot}
              </div>
            </div>

            {/* Badge estado */}
            <div className="shrink-0">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${s.badge}`}>
                {s.icon}
                {s.label}
              </span>
            </div>

            {/* Acciones admin */}
            {isAdmin && (
              <div className="flex gap-2 shrink-0">
                {r.status !== "confirmed" && r.status !== "cancelled" && (
                  <button
                    onClick={() => handleStatusChange(r.id, "confirmed")}
                    disabled={isLoading}
                    className="text-xs rounded-lg bg-green-600 text-white px-3 py-1.5 font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    Confirmar
                  </button>
                )}
                {r.status === "confirmed" && (
                  <button
                    onClick={() => handleStatusChange(r.id, "cancelled")}
                    disabled={isLoading}
                    className="text-xs rounded-lg border border-red-200 text-red-600 px-3 py-1.5 font-medium hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
