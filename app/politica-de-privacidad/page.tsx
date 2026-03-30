import Link from "next/link"
import { Star } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad – Little Star",
  description: "Política de privacidad de Little Star English.",
}

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
              <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Little Star
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <h1 className="text-3xl font-extrabold text-foreground">Política de Privacidad</h1>
          <p className="text-muted-foreground text-sm">Última actualización: marzo de 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Responsable del tratamiento</h2>
            <p className="text-muted-foreground">
              Little Star English es responsable del tratamiento de los datos personales que se recopilan
              a través de este sitio web y de nuestros canales de comunicación (WhatsApp, redes sociales).
              Ante cualquier consulta podés contactarnos por WhatsApp al{" "}
              <a
                href="https://wa.me/5493517712181"
                className="text-primary font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 9 351 771-2181
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Datos que recopilamos</h2>
            <p className="text-muted-foreground">
              Al completar el formulario de inscripción o contactarnos, podemos recopilar los
              siguientes datos:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Nombre del padre, madre o tutor</li>
              <li>Nombre y edad del hijo/a</li>
              <li>Disponibilidad horaria (días y franjas)</li>
              <li>Número de WhatsApp (al iniciar la conversación)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Finalidad del tratamiento</h2>
            <p className="text-muted-foreground">
              Utilizamos los datos recopilados exclusivamente para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Asignarte un horario de clase acorde a tu disponibilidad</li>
              <li>Contactarte por WhatsApp para coordinar la primera clase gratuita</li>
              <li>Enviarte información relevante sobre nuestros servicios educativos</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Compartir datos con terceros</h2>
            <p className="text-muted-foreground">
              No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines
              comerciales. Los datos pueden ser almacenados en herramientas de gestión interna
              (como Google Sheets) utilizadas únicamente por el equipo de Little Star.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Redes sociales y Meta</h2>
            <p className="text-muted-foreground">
              Este sitio puede utilizar el píxel de Meta (Facebook/Instagram) con fines
              publicitarios para medir el rendimiento de nuestras campañas. Meta puede recopilar
              datos según su propia{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                className="text-primary font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. Tus derechos</h2>
            <p className="text-muted-foreground">
              Tenés derecho a acceder, rectificar o solicitar la eliminación de tus datos personales
              en cualquier momento. Para ejercer estos derechos, contactanos por WhatsApp al{" "}
              <a
                href="https://wa.me/5493517712181"
                className="text-primary font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                +54 9 351 771-2181
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">7. Cambios en esta política</h2>
            <p className="text-muted-foreground">
              Podemos actualizar esta política de privacidad ocasionalmente. La versión vigente
              estará siempre disponible en esta página.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
