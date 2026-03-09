import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Reserva tu clase gratis",
    description: "Elige un horario que se adapte a tu familia. La primera clase es totalmente gratuita y sin compromiso.",
  },
  {
    number: "02",
    title: "Conoce a la profesora",
    description: "Tu hijo tendrá una clase de prueba donde evaluamos su nivel y le mostramos lo divertido que es aprender inglés.",
  },
  {
    number: "03",
    title: "Empieza a aprender",
    description: "Con su grupo de máximo 4 compañeros, tu hijo asiste a clases semanales de 40 minutos llenas de juegos y actividades.",
  },
  {
    number: "04",
    title: "Practica en el portal",
    description: "Entre clases, tu hijo accede al portal con videos, canciones, ejercicios y tareas que refuerzan lo aprendido.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Paso a paso
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
            Cómo funciona Little Star
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            En 4 simples pasos tu hijo estará aprendiendo inglés de forma divertida y efectiva.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/30 mb-5">
                  <span className="text-2xl font-extrabold text-accent-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-primary font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Sin compromiso. Cancela cuando quieras.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
