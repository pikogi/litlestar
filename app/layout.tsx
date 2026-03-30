import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  description: 'Clases de inglés online en vivo para niños de 5 a 12 años. Grupos reducidos de máximo 5 alumnos, clases de 50 minutos con profesores bilingües. Portal educativo con videos, canciones y ejercicios.',
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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '919267777576799');
            fbq('init', '2184658699016188');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=919267777576799&ev=PageView&noscript=1"
          />
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=2184658699016188&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  )
}
