import { BookOpen, GraduationCap, ClipboardList, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

const highlights = [
  {
    icon: BookOpen,
    title: "Programa del colegio",
    description: "Trabajamos con el material real de la escuela: tareas, textos, ejercicios y evaluaciones.",
  },
  {
    icon: GraduationCap,
    title: "Preparación para exámenes",
    description: "Repasamos los temas antes de cada evaluación para que el alumno llegue seguro y confiado.",
  },
  {
    icon: ClipboardList,
    title: "Writing y comprensión lectora",
    description: "Trabajamos habilidades específicas: redacción, reading comprehension y expresión oral.",
  },
  {
    icon: MessageCircle,
    title: "Clase 1 a 1 o grupal",
    description: "Se puede tomar de forma individual para máxima atención o en grupos pequeños de hasta 3 alumnos.",
  },
]

export function AcademicSupportSection() {
  return (
    <section id="apoyo-escolar" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Apoyo escolar
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              ¿Tu hijo/a tiene inglés en el colegio y necesita ayuda extra?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Clases enfocadas en el contenido de la escuela. Primaria, secundaria, exámenes, tareas — lo que necesite, cuando lo necesite.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow h-full flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center shadow-md">
            <p className="text-muted-foreground text-base mb-6">
              Reservá igual que una clase particular: elegís la profe, el horario y arrancás. Ideal para preparar un examen, resolver tareas o reforzar antes de fin de año.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 py-6 rounded-xl shadow-lg"
              asChild
            >
              <Link href="/clases-particulares">
                Reservar clase de apoyo →
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
