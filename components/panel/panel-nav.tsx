"use client"

import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import Link from "next/link"

export function PanelNav({ teacherName, role }: { teacherName: string; role: string }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/panel/login")
    router.refresh()
  }

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/panel" className="font-bold text-primary text-base">
            ⭐ Little Star
          </Link>
          {role === "admin" && (
            <Link
              href="/panel/admin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          )}
          {role === "teacher" && (
            <Link
              href="/panel/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Mi panel
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">{teacherName}</span>
          <button
            onClick={handleLogout}
            className="text-sm rounded-xl border border-border px-3 py-1.5 hover:bg-secondary transition-colors text-foreground"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
