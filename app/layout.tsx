import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900']
});

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Little Star - Clases de Inglés Online para Niños y Niñas',
  description: 'Clases de inglés online en vivo para niños de 5 a 12 años. Grupos reducidos de máximo 4 alumnos, clases de 50 minutos con profesores nativos. Portal educativo con videos, canciones y ejercicios.',
  keywords: ['clases inglés niños', 'inglés online niños', 'escuela inglés online', 'Little Star'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={nunito.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
