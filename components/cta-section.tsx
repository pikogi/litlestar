import { Star, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image */}
          <div className="flex-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/kid-laptop.jpg"
                alt="Niño feliz aprendiendo inglés con Little Star"
                width={480}
                height={360}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground text-balance">
              La primera clase es gratis. Dale a tu hijo la oportunidad de brillar.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Reserva una clase de prueba sin compromiso. Conoce a la profesora, 
              ve cómo tu hijo disfruta aprendiendo y decide después.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 py-6 rounded-xl text-base shadow-lg" asChild>
                <a
                  href="https://wa.me/5493543573905?text=Quiero%20reservar%20la%20clase%20gratuita%20para%20mi%20hijo%2Fa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserva tu clase gratis
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">Garantía 30 días</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
          
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
