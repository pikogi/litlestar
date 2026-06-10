"use client"

import { useRef, useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrivateClassesForm } from "@/components/private-classes-form"

type TeacherData = { name: string; bio: string }

const VIDEO_MAP: Record<string, { video: string; poster: string }> = {
  "Miss Sofi": { video: "/miss-sofi.mp4", poster: "/images/miss-sofi-thumb.png" },
  "Miss Ruth": { video: "/miss-ruth.mp4", poster: "/images/miss-ruth-thumb.png" },
}

export function PrivateClassesContent({ teachers }: { teachers: TeacherData[] }) {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  function handleSelectTeacher(name: string | null) {
    setSelectedTeacher(name)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 mb-4">
          <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
          <span className="text-sm font-bold text-accent-foreground">Clases particulares de inglés</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground text-balance">
          Clases 1 a 1 con nuestras profes
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty max-w-xl mx-auto">
          Elegí la profe ideal para tu hijo/a y reservá la primera clase gratis. Sin compromisos.
        </p>
      </div>

      {/* Teachers grid */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {teachers.map((teacher) => {
          const media = VIDEO_MAP[teacher.name]
          return (
            <div key={teacher.name} className="w-full max-w-xs">
              <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                {media ? (
                  <div className="bg-black">
                    <video
                      className="w-full h-auto block"
                      controls
                      preload="metadata"
                      playsInline
                      poster={media.poster}
                    >
                      <source src={media.video} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="bg-accent/20 h-40 flex items-center justify-center">
                    <Star className="w-12 h-12 text-accent-foreground/40" fill="currentColor" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
                      <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                    </div>
                    <h2 className="text-xl font-extrabold text-foreground">{teacher.name}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-5 flex-1">{teacher.bio}</p>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl"
                    onClick={() => handleSelectTeacher(teacher.name)}
                  >
                    Elegir {teacher.name}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Form section */}
      <div ref={formRef} id="reservar" className="scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-foreground">Reservá tu clase gratis</h2>
          <p className="mt-2 text-muted-foreground text-sm">Sin compromisos. La primera clase es 100% gratis.</p>
        </div>
        <div className="bg-card rounded-3xl border border-border shadow-lg p-6 md:p-10 max-w-xl mx-auto">
          <PrivateClassesForm
            key={selectedTeacher ?? "none"}
            initialTeacher={selectedTeacher}
            teachers={teachers}
          />
        </div>
      </div>
    </>
  )
}
