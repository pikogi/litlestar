import { Star } from "lucide-react"
import { Reveal } from "@/components/reveal"

const testimonials = [
  {
    name: "Maria Rodriguez",
    location: "Córdoba Capital, Córdoba",
    rating: 5,
    text: "Mi hija de 6 años esperaba cada clase con emoción. En solo 3 meses ya decía frases completas en inglés. Los profesores son increíbles y el portal tiene canciones que canta todo el día.",
  },
  {
    name: "Carolina Perez",
    location: "Villa Carlos Paz, Córdoba",
    rating: 5,
    text: "Inscribí a mis dos hijos y el descuento del 20% fue genial. Los grupos reducidos hacen que cada niño participe mucho más que en otras escuelas que probamos. Lo recomiendo totalmente.",
  },
  {
    name: "Ana Garcia",
    location: "Río Cuarto, Córdoba",
    rating: 5,
    text: "Al principio mi hijo era muy tímido para hablar en inglés, pero la profesora lo hizo sentir tan cómodo que ahora no para. El portal con videos y ejercicios es un complemento excelente.",
  },
  {
    name: "Laura Mendoza",
    location: "Alta Gracia, Córdoba",
    rating: 5,
    text: "La garantía de 30 días nos dio confianza para probar. Desde la primera clase supimos que era lo que buscábamos. Mi niño de 5 años ya entiende instrucciones básicas en inglés.",
  },
  {
    name: "Patricia Sanchez",
    location: "Villa María, Córdoba",
    rating: 5,
    text: "Lo mejor es que son máximo 5 niños por clase. Mi hija recibe mucha atención y la profesora corrige su pronunciación en tiempo real. Las tareas del portal son súper divertidas.",
  },
  {
    name: "Diana Lopez",
    location: "Laguna Larga, Córdoba",
    rating: 5,
    text: "Llevamos 3 meses con Little Star y el progreso de mi hijo es impresionante. Puede mantener conversaciones simples en inglés y le encanta ver los videos del portal.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-accent-foreground" fill="currentColor" />
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  const colors = [
    "bg-primary/20 text-primary",
    "bg-accent/50 text-accent-foreground",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
  ]
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${color}`}>
      {initials}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Familias que confían en nosotros
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
              Lo que dicen los papás y mamás
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Más de 100 familias de toda Latinoamérica ya aprendieron inglés con Little Star.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, index) => (
            <Reveal key={t.name} delay={index * 80} className="break-inside-avoid">
              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <StarRating rating={t.rating} />
                <p className="mt-4 text-foreground leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <Avatar name={t.name} />
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
