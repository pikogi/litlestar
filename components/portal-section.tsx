"use client"

import { useState } from "react"
import { Music, Gamepad2, PenTool, BookOpen } from "lucide-react"
import { Reveal } from "@/components/reveal"

const tabs = [
  {
    id: "canciones",
    label: "Canciones en inglés",
    icon: Music,
    video: "/portal-video-2.mp4",
  },
  {
    id: "juegos",
    label: "Juegos interactivos",
    icon: Gamepad2,
    video: "/portal-video-1.mp4",
  },
]

const features = [
  {
    icon: Music,
    title: "Canciones en inglés",
    description: "Música original diseñada para que los niños memoricen frases y vocabulario cantando.",
  },
  {
    icon: Gamepad2,
    title: "Juegos interactivos",
    description: "Actividades tipo juego que evalúan comprensión y mantienen a los niños motivados.",
  },
  {
    icon: PenTool,
    title: "Ejercicios divertidos",
    description: "Actividades para reforzar lo aprendido en cada clase de forma dinámica.",
  },
  {
    icon: BookOpen,
    title: "Tareas semanales",
    description: "Ejercicios para completar entre clase y clase que consolidan el aprendizaje.",
  },
]

export function PortalSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeVideo = tabs.find((t) => t.id === activeTab)!

  return (
    <section id="portal" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Video interactivo */}
          <Reveal direction="left" className="flex-1 order-2 lg:order-1 w-full">
            <div className="relative mx-auto w-full lg:max-w-xl">

              {/* Tabs */}
              <div className="flex gap-2 mb-4 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Monitor frame */}
              <div className="relative rounded-[1.25rem] lg:rounded-[2.25rem] bg-foreground p-1.5 lg:p-3 shadow-2xl border-2 lg:border-4 border-primary/20">
                <div
                  className="absolute left-1/2 top-3 -translate-x-1/2 h-2 w-2 rounded-full bg-background/30"
                  aria-hidden="true"
                />
                <div className="rounded-[0.75rem] lg:rounded-[1.75rem] overflow-hidden bg-black">
                  <div className="relative aspect-[16/10]">
                    <video
                      key={activeVideo.video}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                      playsInline
                      loop
                    >
                      <source src={activeVideo.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>

              {/* Stand */}
              <div className="mx-auto mt-3 h-3 w-40 rounded-b-2xl bg-foreground/90 shadow-lg" aria-hidden="true" />
              <div className="mx-auto h-6 w-56 rounded-b-3xl bg-foreground/80" aria-hidden="true" />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal direction="right" className="flex-1 order-1 lg:order-2 text-center lg:text-left">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Portal del alumno
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Un mundo de aprendizaje fuera de clase
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Con la membresía de Little Star, tu hijo accede a un portal exclusivo donde puede seguir aprendiendo a su ritmo.
            </p>

            {/* Feature list */}
            <div className="mt-8 flex flex-col gap-5 text-left">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 80}>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/30 shrink-0">
                      <feature.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
