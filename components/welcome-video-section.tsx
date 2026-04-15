import { Reveal } from "@/components/reveal"

export function WelcomeVideoSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Un mensaje para vos
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Conocé a Little Star
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Te cuento cómo funcionan las clases y por qué Little Star es diferente.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/30 bg-black aspect-video">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source src="/welcome-video.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
