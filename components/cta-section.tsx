import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image */}
          <Reveal direction="left" className="flex-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto lg:mx-0">
              <Image
                src="/images/kid-laptop.jpg"
                alt="Alumno feliz aprendiendo inglés con Little Star"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal direction="right" className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground text-balance">
              La primera clase es gratis. Dale a tu hijo/a o adolescente la oportunidad de brillar.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Reserva una clase de prueba sin compromiso. Conocé a las profes, ve cómo aprende y decidí después.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 py-6 rounded-xl text-base shadow-lg" asChild>
                <Link href="/inscripcion">
                  Reserva tu clase gratis
                </Link>
              </Button>
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  )
}
