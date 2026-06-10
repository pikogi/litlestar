"use client"

import { useState } from "react"

export function CreateTeacherForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await fetch("/api/panel/admin/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })

    const data = await res.json()

    if (res.ok) {
      setResult({ ok: true, message: `Invitación enviada a ${email}. La miss recibirá un email para crear su contraseña.` })
      setName("")
      setEmail("")
    } else {
      setResult({ ok: false, message: data.error ?? "Error al enviar la invitación." })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleCreate} className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Nombre de la profe
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Miss Sofi"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="miss@littlestar.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {result && (
        <p className={`text-sm font-medium ${result.ok ? "text-green-600" : "text-red-500"}`}>
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Enviando invitación..." : "Enviar invitación"}
      </button>
    </form>
  )
}
