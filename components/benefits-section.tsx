import { Globe, Sparkles, BookOpen, Headphones, Shield, Users } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Grupos reducidos",
    description: "Máximo 4 alumnos por clase para una atención personalizada y mayor participación de cada niño.",
  },
  {
    icon: Globe,
    title: "Inmersión en inglés",
    description: "Las clases son 100% en inglés. Los niños se acostumbran rápidamente a comunicarse sin traducir.",
  },
  {
    icon: Sparkles,
    title: "Aprendizaje con juegos",
    description: "Método basado en juegos, canciones y actividades interactivas que mantienen a los niños motivados.",
  },
  {
    icon: BookOpen,
    title: "Portal educativo",
    description: "Acceso a videos, canciones, ejercicios y tareas para reforzar lo aprendido en cada clase.",
  },
  {
    icon: Headphones,
    title: "Profesores certificados",
    description: "Docentes nativos y bilingües con experiencia en educación infantil y certificaciones internacionales.",
  },
  {
    icon: Shield,
    title: "Garantía 30 días",
    description: "Si no estás satisfecho, te devolvemos tu dinero. Sin preguntas, sin complicaciones.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Por qué Little Star
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
            Todo lo que tu hijo necesita para aprender inglés
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Combinamos tecnología, pedagogía y diversión para que cada clase sea una experiencia inolvidable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
