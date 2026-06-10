"use client"

import { useState } from "react"

export function SetPasswordForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await fetch("/api/panel/admin/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      setResult({ ok: true, message: `Contraseña seteada. Mandásela a la miss por WhatsApp.` })
      setPassword("")
    } else {
      setResult({ ok: false, message: data.error ?? "Error." })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Email de la profe</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="miss@littlestar.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña temporal</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
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
        {loading ? "Guardando..." : "Setear contraseña"}
      </button>
    </form>
  )
}
