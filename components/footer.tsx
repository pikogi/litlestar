import { Star } from "lucide-react"

const footerLinks = {
  escuela: [
    { label: "Beneficios", href: "#beneficios" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Portal educativo", href: "#portal" },
    { label: "Precios", href: "#precios" },
  ],
  soporte: [
    { label: "Preguntas frecuentes", href: "#faq" },
    {
      label: "Contacto por WhatsApp",
      href: "https://wa.me/5493517712181?text=Quiero%20reservar%20la%20clase%20gratuita%20para%20mi%20hijo%2Fa",
      external: true,
    },
    { label: "Politica de privacidad", href: "/politica-de-privacidad" },
    { label: "Terminos y condiciones", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="contacto" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent">
                <Star className="w-6 h-6 text-accent-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold text-background tracking-tight">
                Little Star
              </span>
            </div>
            <p className="text-background/60 leading-relaxed max-w-xs">
              Clases de inglés online en vivo para niños de 5 a 12 años. Grupos reducidos, profesores certificados y un portal educativo único.
            </p>
          </div>

          {/* Links: Escuela */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-4">
              Escuela
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.escuela.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Soporte */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-background/40 mb-4">
              Soporte
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            {`\u00A9 ${new Date().getFullYear()} Little Star. Todos los derechos reservados.`}
          </p>
          <div className="flex items-center gap-1 text-sm text-background/40">
            <span>Hecho con</span>
            <Star className="w-3.5 h-3.5 text-accent" fill="currentColor" />
            <span>para las familias de Latinoamérica</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
