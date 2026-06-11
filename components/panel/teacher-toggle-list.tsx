"use client"

import { useRef, useState } from "react"
import { ChevronDown, ChevronUp, ImageIcon, VideoIcon, Loader2, CheckCircle2 } from "lucide-react"

type Teacher = {
  id: string
  name: string
  bio: string | null
  active: boolean
  role: string
  image_url: string | null
  video_url: string | null
}

function TeacherEditor({ teacher }: { teacher: Teacher }) {
  const [name, setName] = useState(teacher.name)
  const [bio, setBio] = useState(teacher.bio ?? "")
  const [imageUrl, setImageUrl] = useState(teacher.image_url ?? "")
  const [videoUrl, setVideoUrl] = useState(teacher.video_url ?? "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)

  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File, type: "image" | "video") {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("type", type)
    fd.append("teacherId", teacher.id)
    const res = await fetch("/api/panel/admin/teachers/upload", { method: "POST", body: fd })
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
    await fetch("/api/panel/admin/teachers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teacher.id, name, bio }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="pt-4 pb-2 space-y-5">
      {/* Foto y video */}
      <div className="flex gap-6 flex-wrap">
        {/* Imagen */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Foto</p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
              {imageUrl
                ? <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                : <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
              }
            </div>
            <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <button
              type="button"
              disabled={uploadingImage}
              onClick={() => imageRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {uploadingImage ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo...</> : <><ImageIcon className="w-3.5 h-3.5" /> Cambiar</>}
            </button>
          </div>
        </div>

        {/* Video */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Video</p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
              {videoUrl
                ? <video src={videoUrl} className="w-full h-full object-cover" muted playsInline />
                : <VideoIcon className="w-5 h-5 text-muted-foreground/40" />
              }
            </div>
            <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            <button
              type="button"
              disabled={uploadingVideo}
              onClick={() => videoRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors disabled:opacity-60"
            >
              {uploadingVideo ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo...</> : <><VideoIcon className="w-3.5 h-3.5" /> Cambiar</>}
            </button>
          </div>
        </div>
      </div>

      {/* Nombre y bio */}
      <form onSubmit={handleSave} className="space-y-3 max-w-sm">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            placeholder="Descripción de la profe..."
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-primary text-white font-semibold px-4 py-2 text-xs hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...</> : "Guardar"}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Guardado
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export function TeacherToggleList({ teachers }: { teachers: Teacher[] }) {
  const [list, setList] = useState(teachers)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  async function toggleActive(teacher: Teacher) {
    setLoadingId(teacher.id)
    const res = await fetch("/api/panel/admin/teachers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: teacher.id, active: !teacher.active }),
    })
    if (res.ok) {
      setList((prev) => prev.map((t) => t.id === teacher.id ? { ...t, active: !t.active } : t))
    }
    setLoadingId(null)
  }

  const profes = list.filter((t) => t.role === "teacher")

  if (profes.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">No hay profes registradas todavía.</p>
  }

  return (
    <div className="divide-y divide-border">
      {profes.map((teacher) => (
        <div key={teacher.id}>
          {/* Row */}
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-secondary border border-border overflow-hidden shrink-0 flex items-center justify-center">
                {teacher.image_url
                  ? <img src={teacher.image_url} alt="" className="w-full h-full object-cover" />
                  : <span className="text-xs font-bold text-muted-foreground">{teacher.name.charAt(0)}</span>
                }
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm">{teacher.name}</p>
                {teacher.bio && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{teacher.bio}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Edit toggle */}
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === teacher.id ? null : teacher.id)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {expandedId === teacher.id ? <><ChevronUp className="w-4 h-4" /> Cerrar</> : <><ChevronDown className="w-4 h-4" /> Editar</>}
              </button>

              {/* Active toggle */}
              <button
                type="button"
                disabled={loadingId === teacher.id}
                onClick={() => toggleActive(teacher)}
                title={teacher.active ? "Visible — click para ocultar" : "Oculta — click para mostrar"}
                className={[
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50",
                  teacher.active ? "bg-primary" : "bg-muted",
                ].join(" ")}
              >
                <span className={[
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200",
                  teacher.active ? "translate-x-5" : "translate-x-0",
                ].join(" ")} />
              </button>
            </div>
          </div>

          {/* Inline editor */}
          {expandedId === teacher.id && (
            <div className="pb-4 pl-12">
              <TeacherEditor teacher={teacher} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
