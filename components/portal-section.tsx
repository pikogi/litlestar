import { Play, Music, PenTool, BookOpen } from "lucide-react"
import Image from "next/image"
import { Reveal } from "@/components/reveal"

const features = [
  {
    icon: Play,
    title: "Videos interactivos",
    description: "Lecciones animadas que capturan la atención de los niños y refuerzan vocabulario y pronunciación.",
  },
  {
    icon: Music,
    title: "Canciones en inglés",
    description: "Música original diseñada para que los niños memoricen frases y vocabulario cantando.",
  },
  {
    icon: PenTool,
    title: "Ejercicios divertidos",
    description: "Actividades interactivas tipo juego que evalúan comprensión y mantienen a los niños motivados.",
  },
  {
    icon: BookOpen,
    title: "Tareas semanales",
    description: "Ejercicios para completar entre clase y clase que refuerzan lo aprendido con la profesora.",
  },
]

export function PortalSection() {
  return (
    <section id="portal" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image */}
          <Reveal direction="left" className="flex-1 order-2 lg:order-1">
            <div className="relative mx-auto w-full lg:max-w-xl">
              {/* Monitor frame */}
              <div className="relative rounded-[1.25rem] lg:rounded-[2.25rem] bg-foreground p-1.5 lg:p-3 shadow-2xl border-2 lg:border-4 border-primary/20">
                <div
                  className="absolute left-1/2 top-3 -translate-x-1/2 h-2 w-2 rounded-full bg-background/30"
                  aria-hidden="true"
                />
                <div className="rounded-[0.75rem] lg:rounded-[1.75rem] overflow-hidden bg-background">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/portal-preview.png"
                      alt="Portal educativo de Little Star con videos, canciones y ejercicios"
                      fill
                      sizes="(min-width: 1024px) 520px, (min-width: 768px) 70vw, 90vw"
                      className="object-cover"
                    />
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
              Con la membresia de Little Star, tu hijo accede a un portal exclusivo donde puede seguir aprendiendo a su ritmo.
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
