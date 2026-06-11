"use client"

import { useRef, useState } from "react"
import { ImageIcon, VideoIcon, Loader2, CheckCircle2 } from "lucide-react"

type Profile = {
  name: string
  bio: string | null
  image_url: string | null
  video_url: string | null
}

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio ?? "")
  const [imageUrl, setImageUrl] = useState(profile.image_url ?? "")
  const [videoUrl, setVideoUrl] = useState(profile.video_url ?? "")

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File, type: "image" | "video") {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    const res = await fetch("/api/panel/profile/upload", {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    if (data.url) {
      if (type === "image") setImageUrl(data.url)
      else setVideoUrl(data.url)
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    await uploadFile(file, "image")
    setUploadingImage(false)
  }

  async function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingVideo(true)
    await uploadFile(file, "video")
    setUploadingVideo(false)
  }

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
    <div className="space-y-8 max-w-md">
      {/* Imagen */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Foto de perfil</p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              disabled={uploadingImage}
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {uploadingImage ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
              ) : (
                <><ImageIcon className="w-4 h-4" /> Cambiar foto</>
              )}
            </button>
            <p className="text-xs text-muted-foreground">JPG, PNG o WebP. Recomendado: cuadrada.</p>
          </div>
        </div>
      </div>

      {/* Video */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Video de presentación</p>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
            {videoUrl ? (
              <video src={videoUrl} className="w-full h-full object-cover" muted playsInline />
            ) : (
              <VideoIcon className="w-8 h-8 text-muted-foreground/40" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
            <button
              type="button"
              disabled={uploadingVideo}
              onClick={() => videoInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {uploadingVideo ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
              ) : (
                <><VideoIcon className="w-4 h-4" /> Cambiar video</>
              )}
            </button>
            <p className="text-xs text-muted-foreground">MP4 recomendado. El video se muestra en tu perfil.</p>
          </div>
        </div>
      </div>

      {/* Nombre y bio */}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
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
            className="flex items-center gap-2 rounded-xl bg-primary text-white font-semibold px-6 py-2.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</> : "Guardar cambios"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> ¡Guardado!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
