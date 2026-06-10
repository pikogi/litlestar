"use client"

import { useState, useEffect, useCallback } from "react"
import {
  format,
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
  getDay,
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Lock, LockOpen, User } from "lucide-react"

const TIME_SLOTS = [
  "10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00","19:00","20:00",
]

function CalendarPicker({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (d: Date) => void
}) {
  const [viewDate, setViewDate] = useState(selected ?? new Date())
  const today = startOfDay(new Date())

  const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
  const days: Date[] = []
  let cur = start
  while (!isBefore(end, cur)) {
    days.push(cur)
    cur = addDays(cur, 1)
  }

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold capitalize text-foreground">
          {format(viewDate, "MMMM yyyy", { locale: es })}
        </span>
        <button
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          type="button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Lu","Ma","Mi","Ju","Vi","Sá","Do"].map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-muted-foreground/70 py-1 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => {
          const isPast = isBefore(day, today)
          const isSun = getDay(day) === 0
          const disabled = isPast || isSun
          const isSelected = selected && isSameDay(day, selected)
          const inMonth = isSameMonth(day, viewDate)
          const isTodayDate = isToday(day)

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={[
                "h-9 w-full flex items-center justify-center rounded-lg text-sm transition-all font-medium",
                !inMonth ? "opacity-20 pointer-events-none" : "",
                disabled && inMonth ? "text-muted-foreground/40 cursor-not-allowed" : "",
                !disabled && !isSelected ? "hover:bg-primary/10 text-foreground cursor-pointer" : "",
                isSelected ? "bg-primary text-white shadow-sm font-bold" : "",
                isTodayDate && !isSelected ? "ring-2 ring-primary/40 text-primary" : "",
              ].filter(Boolean).join(" ")}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function SlotBlocker({ teacherName }: { teacherName: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [blockedSlots, setBlockedSlots] = useState<string[]>([])
  const [reservedSlots, setReservedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [togglingSlot, setTogglingSlot] = useState<string | null>(null)

  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true)
    const dateStr = format(date, "yyyy-MM-dd")
    const [blockedRes, reservedRes] = await Promise.all([
      fetch(`/api/panel/blocked-slots?teacher=${encodeURIComponent(teacherName)}&date=${dateStr}`),
      fetch(`/api/slots?teacher=${encodeURIComponent(teacherName)}&date=${dateStr}`),
    ])
    const { blocked } = await blockedRes.json()
    const { taken } = await reservedRes.json()
    setBlockedSlots(blocked ?? [])
    setReservedSlots((taken ?? []).filter((s: string) => !(blocked ?? []).includes(s)))
    setLoadingSlots(false)
  }, [teacherName])

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate)
  }, [selectedDate, fetchSlots])

  async function toggleSlot(slot: string) {
    if (!selectedDate) return
    setTogglingSlot(slot)
    const dateStr = format(selectedDate, "yyyy-MM-dd")
    const isBlocked = blockedSlots.includes(slot)

    if (isBlocked) {
      await fetch(
        `/api/panel/blocked-slots?teacher=${encodeURIComponent(teacherName)}&date=${dateStr}&time_slot=${encodeURIComponent(slot)}`,
        { method: "DELETE" }
      )
      setBlockedSlots((prev) => prev.filter((s) => s !== slot))
    } else {
      await fetch("/api/panel/blocked-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher_name: teacherName, date: dateStr, time_slot: slot }),
      })
      setBlockedSlots((prev) => [...prev, slot])
    }
    setTogglingSlot(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Calendar */}
      <div>
        <CalendarPicker selected={selectedDate} onSelect={setSelectedDate} />
      </div>

      {/* Slots */}
      <div>
        {!selectedDate ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Seleccioná un día</p>
              <p className="text-xs text-muted-foreground mt-1">para ver y gestionar los horarios</p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-foreground mb-4 capitalize">
              {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </p>

            {loadingSlots ? (
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((s) => (
                  <div key={s} className="h-11 rounded-xl bg-secondary animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBlocked = blockedSlots.includes(slot)
                    const isReserved = reservedSlots.includes(slot)
                    const isLoading = togglingSlot === slot

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isReserved || isLoading}
                        onClick={() => toggleSlot(slot)}
                        className={[
                          "h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5",
                          isReserved
                            ? "bg-blue-100 text-blue-700 cursor-not-allowed border border-blue-200"
                            : isBlocked
                            ? "bg-red-500 text-white hover:bg-red-600 shadow-sm"
                            : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                          isLoading ? "opacity-50" : "",
                        ].filter(Boolean).join(" ")}
                      >
                        {isReserved ? (
                          <User className="w-3.5 h-3.5 shrink-0" />
                        ) : isBlocked ? (
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <LockOpen className="w-3.5 h-3.5 shrink-0 opacity-60" />
                        )}
                        {slot}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-5 mt-5 pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded bg-primary/20 border border-primary/20 inline-block" />
                    Disponible
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded bg-red-500 inline-block" />
                    Bloqueado
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200 inline-block" />
                    Reservado
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
