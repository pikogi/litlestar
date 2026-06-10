"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

export default function PanelLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "set-password">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const hash = window.location.hash
    if (!hash.includes("access_token")) return

    const supabase = createSupabaseBrowserClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setMode("set-password")
    })
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Email o contraseña incorrectos.")
      setLoading(false)
      return
    }

    router.push("/panel")
    router.refresh()
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.")
      return
    }
    setLoading(true)
    setError("")

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setError("Error al guardar la contraseña: " + error.message)
      setLoading(false)
      return
    }

    router.push("/panel")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-primary mb-1">⭐ Little Star</div>
          <p className="text-muted-foreground text-sm">Panel de profes</p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-md p-8">
          {mode === "set-password" ? (
            <>
              <h1 className="text-xl font-bold text-foreground mb-2 text-center">Creá tu contraseña</h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Elegí una contraseña para acceder al panel.
              </p>

              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-foreground mb-1.5">
                    Contraseña
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-primary text-white font-semibold py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {loading ? "Guardando..." : "Guardar y entrar"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold text-foreground mb-6 text-center">Iniciar sesión</h1>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="••••••••"
                  />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-primary text-white font-semibold py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
