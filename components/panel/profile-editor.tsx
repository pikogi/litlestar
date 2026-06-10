"use client"

import { useState } from "react"

type Profile = {
  name: string
  bio: string | null
}

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio ?? "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    await fetch("/api/panel/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio }),
    })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Nombre
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          placeholder="Contá algo sobre vos como profe..."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-medium">¡Guardado!</span>
        )}
      </div>
    </form>
  )
}
