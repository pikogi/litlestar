import { Star, Users, Clock, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Reveal } from "@/components/reveal"

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/20" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-primary/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <Reveal direction="left" className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 mb-6">
              <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
              <span className="text-sm font-bold text-accent-foreground">
                Clases online en vivo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance">
              Un mundo de{" "}
              <span className="text-primary">oportunidades</span>{" "}
              para tu hijo/a con el{" "}
              <span className="text-accent-foreground bg-accent/30 px-2 rounded-lg">{"inglés"}</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Para niños y niñas de 5 a 12 años
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Max 5 alumnos</p>
                  <p className="text-xs text-muted-foreground">por clase</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">50 minutos</p>
                  <p className="text-xs text-muted-foreground">por sesión</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Portal exclusivo</p>
                  <p className="text-xs text-muted-foreground">videos y canciones</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 py-6 rounded-xl shadow-lg" asChild>
                <a
                  href={`https://wa.me/5493517712181?text=${encodeURIComponent("Hola, me gustaría reservar una reunión para conocer más sobre Little Star y programar la primera clase para mi hijo/a.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserva tu clase gratis
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-bold px-8 py-6 rounded-xl" asChild>
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </div>

            {/* Trust badge */}
            <p className="mt-6 text-sm text-muted-foreground">
              Garantía de devolución de 30 días. Sin compromisos.
            </p>
          </Reveal>

          {/* Hero image */}
          <Reveal direction="right" className="flex-1 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/30">
              <Image
                src="/images/hero-kids.jpg"
                alt="Niños aprendiendo inglés online con Little Star"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-2xl shadow-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" fill="currentColor" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent/40 border-2 border-card flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" fill="currentColor" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Sin matrícula de ingreso</p>
                  <p className="text-xs text-muted-foreground">pagas solo por las clases</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
