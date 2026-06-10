"use client"

import { useState } from "react"

type Teacher = {
  id: string
  name: string
  bio: string | null
  active: boolean
  role: string
}

export function TeacherToggleList({ teachers }: { teachers: Teacher[] }) {
  const [list, setList] = useState(teachers)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function toggleActive(teacher: Teacher) {
    setLoadingId(teacher.id)
    const res = await fetch("/api/panel/admin/teachers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teacher.id, active: !teacher.active }),
    })
    if (res.ok) {
      setList((prev) =>
        prev.map((t) => (t.id === teacher.id ? { ...t, active: !t.active } : t))
      )
    }
    setLoadingId(null)
  }

  const profes = list.filter((t) => t.role === "teacher")

  if (profes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No hay profes registradas todavía.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {profes.map((teacher) => (
        <div
          key={teacher.id}
          className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0"
        >
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm">{teacher.name}</p>
            {teacher.bio && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                {teacher.bio}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={loadingId === teacher.id}
            onClick={() => toggleActive(teacher)}
            title={teacher.active ? "Visible en la página — click para ocultar" : "Oculta — click para mostrar"}
            className={[
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50",
              teacher.active ? "bg-primary" : "bg-muted",
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200",
                teacher.active ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
