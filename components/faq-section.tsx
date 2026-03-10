"use client"

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
    answer: "Nuestras clases están diseñadas para niños de 5 a 12 años. Agrupamos a los alumnos por edad y nivel para que cada clase sea adecuada y estimulante.",
  },
  {
    question: "¿Cuántos niños hay por clase?",
    answer: "Cada clase tiene un máximo de 5 alumnos. Esto garantiza que cada niño reciba atención personalizada, tenga tiempo para participar y la profesora pueda corregir pronunciación individualmente.",
  },
  {
    question: "¿Cuánto dura cada clase?",
    answer: "Cada sesión dura 50 minutos, divididos en actividades dinámicas: warm-up con canciones, vocabulario con juegos, práctica de conversación y una actividad final divertida.",
  },
  {
    question: "¿Qué incluye el portal educativo?",
    answer: "El portal incluye videos interactivos, canciones originales en inglés, ejercicios tipo juego y tareas semanales. Tu hijo puede acceder en cualquier momento para reforzar lo aprendido en clase.",
  },
  {
    question: "¿Cuál es la diferencia entre el plan trimestral y el mensual?",
    answer: "El plan trimestral tiene un costo de $60.000 por mes (3 meses pagados juntos por $180.000), mientras que el plan mensual cuesta $80.000 por mes sin compromiso. El plan trimestral te permite ahorrar $60.000.",
  },
  {
    question: "¿Qué pasa si inscribo a 2 hijos?",
    answer: "Si inscribes a 2 hermanos, obtienes un 20% de descuento en ambas membresías. El descuento aplica para plan trimestral.",
  },
  {
    question: "¿Cómo funciona la garantía de 30 días?",
    answer: "Si durante los primeros 30 días no estás satisfecho con nuestro servicio por cualquier motivo, te devolvemos el 100% de tu dinero. Solo debes contactarnos y procesamos el reembolso sin preguntas.",
  },
  {
    question: "Mi hijo no sabe nada de inglés, ¿puede tomar clases?",
    answer: "Por supuesto. Tenemos niveles desde principiante absoluto. Los profesores usan gestos, imágenes, juegos y el método TPR (respuesta física total) para que los niños entiendan desde la primera clase sin necesidad de traducir.",
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

export function FAQSection() {
  return (
    <section id="faq" className="pb-16 lg:pb-24 pt-6 lg:pt-8">
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
            Todo lo que necesitas saber antes de inscribir a tu hijo.
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
