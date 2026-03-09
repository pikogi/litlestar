import { Check, Star, Shield, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

const includedBase = [
  "Clases en vivo de 50 minutos",
  "3 clases por semana",
  "Grupos de máximo 4 alumnos",
  "Profesores certificados",
  "Acceso al portal educativo",
  "Tareas semanales",
  "Reporte de progreso mensual",
  "Soporte por WhatsApp",
]

const includedPersonalizado = [
  "Clases individuales 1 a 1",
  "Frecuencia y horario a elección",
  "Cantidad de clases a definir",
  "Profesores certificados",
  "Acceso al portal educativo",
  "Seguimiento personalizado",
  "Reporte de progreso",
  "Soporte por WhatsApp",
]

const WA_BASE = "https://wa.me/5493543573905?text="

const WA_CUATRIMESTRAL = WA_BASE + encodeURIComponent("Hola, me interesa el Plan Cuatrimestral de Little Star. ¿Pueden darme más información?")
const WA_MENSUAL = WA_BASE + encodeURIComponent("Hola, me interesa el Plan Mensual de Little Star. ¿Pueden darme más información?")
const WA_PERSONALIZADO = WA_BASE + encodeURIComponent("Hola, me interesa el Plan Personalizado de Little Star. Me gustaría recibir un presupuesto a medida.")

export function PricingSection() {
  return (
    <section id="precios" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Precios
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
            Planes simples y accesibles
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Elige el plan que mejor se adapte a tu familia. Todos los planes incluyen acceso completo al portal educativo.
          </p>
        </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Quarterly Plan */}
          <Reveal delay={0} className="flex">
          <div className="relative bg-card rounded-3xl border-2 border-primary shadow-xl p-8 flex flex-col w-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                <Star className="w-4 h-4" fill="currentColor" />
                Mejor precio
              </div>
            </div>

            <div className="text-center pt-4">
              <h3 className="text-xl font-bold text-foreground">Plan Cuatrimestral</h3>
              <p className="text-sm text-muted-foreground mt-1">4 meses pagados juntos</p>

              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-foreground">$60.000</span>
                  <span className="text-lg text-muted-foreground font-semibold">/mes</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total: <span className="font-bold text-foreground">$240.000</span> por 4 meses
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-accent/30 text-accent-foreground text-sm font-bold">
                  Ahorra $80.000
                </div>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-3 flex-1">
              {includedBase.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-xl text-base" asChild>
              <a href={WA_CUATRIMESTRAL} target="_blank" rel="noopener noreferrer">
                Elegir plan cuatrimestral
              </a>
            </Button>
          </div>
          </Reveal>

          {/* Monthly Plan */}
          <Reveal delay={100} className="flex">
          <div className="bg-card rounded-3xl border border-border p-8 flex flex-col w-full">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground">Plan Mensual</h3>
              <p className="text-sm text-muted-foreground mt-1">Pago mes a mes, sin compromiso</p>

              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-foreground">$80.000</span>
                  <span className="text-lg text-muted-foreground font-semibold">/mes</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Facturado mensualmente
                </p>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-3 flex-1">
              {includedBase.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" variant="outline" className="mt-8 w-full font-bold py-6 rounded-xl text-base" asChild>
              <a href={WA_MENSUAL} target="_blank" rel="noopener noreferrer">
                Elegir plan mensual
              </a>
            </Button>
          </div>
          </Reveal>

          {/* Custom Plan */}
          <Reveal delay={200} className="flex">
          <div className="relative bg-card rounded-3xl border-2 border-accent/60 p-8 flex flex-col w-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                A tu medida
              </div>
            </div>

            <div className="text-center pt-4">
              <h3 className="text-xl font-bold text-foreground">Plan Personalizado</h3>
              <p className="text-sm text-muted-foreground mt-1">Diseñado para las necesidades de tu hijo/a</p>

              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-extrabold text-foreground">A presupuestar</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Precio según frecuencia y cantidad de clases
                </p>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-3 flex-1">
              {includedPersonalizado.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 rounded-xl text-base" asChild>
              <a href={WA_PERSONALIZADO} target="_blank" rel="noopener noreferrer">
                Pedir presupuesto
              </a>
            </Button>
          </div>
          </Reveal>
        </div>

        {/* Discount banner */}
        <div className="mt-10 max-w-6xl mx-auto">
          <div className="bg-accent/20 border border-accent/40 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/40 shrink-0">
              <Users className="w-7 h-7 text-accent-foreground" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-lg font-bold text-foreground">
                Descuento para 2 hermanos: <br className="sm:hidden" />20% OFF
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Si inscribes a 2 hijos, obtienes un 20% de descuento en el plan cuatrimestral.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-6 max-w-6xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 shrink-0">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-lg font-bold text-foreground">
                Garantía de devolución de 30 días
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Si durante los primeros 30 días no estás satisfecho con nuestro servicio, te devolvemos el 100% de tu dinero. Sin preguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
