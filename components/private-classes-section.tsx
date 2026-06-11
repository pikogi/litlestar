import { UserCheck, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

const highlights = [
  {
    icon: UserCheck,
    title: "Atención exclusiva",
    description: "El alumno es el único en clase. Todo el tiempo de la profe es para él/ella.",
  },
  {
    icon: Calendar,
    title: "Horario a tu medida",
    description: "Elegís los días y horarios que mejor se adapten a la rutina de cada familia.",
  },
  {
    icon: TrendingUp,
    title: "Progreso acelerado",
    description: "Sin esperar turnos para participar. Cada minuto de clase es puro aprendizaje.",
  },
]

export function PrivateClassesSection() {
  return (
    <section id="clases-particulares" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Clases particulares
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              ¿Querés algo más personalizado?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Clases individuales 1 a 1 con nuestras profes. Máxima atención, ritmo propio y resultados más rápidos.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow h-full flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 py-6 rounded-xl shadow-lg"
              asChild
            >
              <Link href="/clases-particulares">
                Ver clases particulares →
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
