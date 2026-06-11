"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react"

export function CreateTeacherForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await fetch("/api/panel/admin/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setResult({ ok: true, message: `Profe creada. Ya puede entrar con ${email} y la contraseña que le pasaste.` })
      setName("")
      setEmail("")
      setPassword("")
    } else {
      setResult({ ok: false, message: data.error ?? "Error al crear la profe." })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleCreate} className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
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
        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
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
        <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Pasale esta contraseña por WhatsApp. Ella puede cambiarla desde su perfil.</p>
      </div>

      {result && (
        <p className={`flex items-center gap-1.5 text-sm font-medium ${result.ok ? "text-green-600" : "text-red-500"}`}>
          {result.ok && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creando...</> : "Crear profe"}
      </button>
    </form>
  )
}
