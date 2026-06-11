import { Sparkles, BookOpen, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"

const benefits = [
  {
    icon: Users,
    title: "Grupos reducidos",
    description: "Máximo 5 alumnos por clase para una atención personalizada y mayor participación.",
  },
  {
    icon: BookOpen,
    title: "Clases grabadas",
    description: "Acceso a las grabaciones de cada clase para que tu hijo pueda repasar cuando quiera.",
  },
  {
    icon: Sparkles,
    title: "Aprendizaje con juegos",
    description: "Método basado en juegos, proyectos y actividades interactivas que mantienen a los alumnos motivados.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Por qué Little Star
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Todo lo que necesitás para aprender inglés de verdad
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Combinamos tecnología, pedagogía y diversión para que cada clase sea una experiencia inolvidable.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 80}>
              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow h-full flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
