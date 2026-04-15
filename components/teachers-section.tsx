import { Reveal } from "@/components/reveal"
import { Star } from "lucide-react"

const teachers = [
  {
    name: "Miss Sofi",
    bio: "Profesora bilingüe con experiencia en educación infantil. Especialista en metodología lúdica y aprendizaje por inmersión.",
    video: "/miss-sofi.mp4",
    poster: "/images/miss-sofi-thumb.jpg",
  },
]

export function TeachersSection() {
  return (
    <section id="profes" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Nuestro equipo
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Conocé a nuestros profes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Docentes bilingües certificados, apasionados por enseñar y con experiencia en educación infantil.
            </p>
          </div>
        </Reveal>

        {/* Teachers grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teachers.map((teacher, index) => (
            <Reveal key={teacher.name} delay={index * 100} className="w-full max-w-xs">
              <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {/* Video */}
                <div className="relative aspect-[9/16] bg-black">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    poster={teacher.poster}
                  >
                    <source src={teacher.video} type="video/mp4" />
                    <track
                      kind="subtitles"
                      src="/miss-sofi.vtt"
                      srcLang="es"
                      label="Español"
                      default
                    />
                  </video>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
                      <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground">{teacher.name}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{teacher.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
