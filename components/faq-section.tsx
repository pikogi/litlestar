"use client"

import Script from "next/script"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"

const faqs = [
  {
    question: "¿Para qué edades son las clases de Little Star?",
    answer: "Nuestras clases están diseñadas para alumnos de 5 a 18 años. Agrupamos a los alumnos por edad y nivel para que cada clase sea adecuada y estimulante.",
  },
  {
    question: "¿Cuántos alumnos hay por clase?",
    answer: "Cada clase tiene un máximo de 5 alumnos. Esto garantiza que cada alumno reciba atención personalizada, tenga tiempo para participar y la profesora pueda corregir pronunciación individualmente.",
  },
  {
    question: "¿Cuánto dura cada clase?",
    answer: "Cada sesión dura 50 minutos, divididos en actividades dinámicas: warm-up con canciones, vocabulario con juegos, práctica de conversación y una actividad final divertida.",
  },
  {
    question: "¿Cuál es la diferencia entre el plan trimestral y el mensual?",
    answer: "El plan trimestral tiene un costo total de $195.000 (3 meses pagados juntos), mientras que el plan mensual cuesta $80.000 por mes sin compromiso. El plan trimestral te permite ahorrar $45.000.",
  },
  {
    question: "¿Qué pasa si inscribo a 2 hijos?",
    answer: "Si inscribes a 2 hermanos, obtienes un 20% de descuento en ambas membresías. El descuento aplica para plan trimestral.",
  },
  {
    question: "Mi hijo/a no sabe nada de inglés, ¿puede tomar clases?",
    answer: "Por supuesto. Tenemos niveles desde principiante absoluto. Las profesoras usan gestos, imágenes, juegos y actividades adaptadas a cada edad para que los alumnos entiendan desde la primera clase sin necesidad de traducir.",
  },
  {
    question: "¿Las clases funcionan también para adolescentes?",
    answer: "Sí. Tenemos grupos separados según la edad: niños (5-11 años) y adolescentes (12-18 años). El enfoque pedagógico cambia: con los más grandes usamos proyectos, debates, cultura pop y contenido relevante para ellos. El ritmo y los temas son muy distintos a los de los más chicos.",
  },
  {
    question: "¿Qué es el apoyo escolar y a quién está dirigido?",
    answer: "El apoyo escolar es un servicio de clases 1 a 1 enfocado en el material del colegio: tareas, exámenes, reading comprehension, writing y oral exams. Está pensado para alumnos de primaria y secundaria que necesitan reforzar el inglés de la escuela o prepararse para una evaluación importante.",
  },
  {
    question: "¿Qué necesito para las clases?",
    answer: "Solo necesitas una computadora o tablet con conexión a internet estable, cámara y micrófono. Recomendamos usar una pantalla grande (no celular) para que el niño pueda interactuar mejor con las actividades.",
  },
  {
    question: "¿Puedo cambiar de horario o profesor?",
    answer: "Sí, puedes reprogramar clases y solicitar cambio de grupo o profesora en cualquier momento a través de nuestro servicio de soporte por WhatsApp.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-secondary">
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-14">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground text-balance">
            Resolvemos tus dudas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Todo lo que necesitás saber antes de inscribirte.
          </p>
        </div>
        </Reveal>

        {/* FAQ Accordion */}
        <Reveal delay={100}>
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
