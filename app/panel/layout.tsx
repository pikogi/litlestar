import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel | Little Star",
  robots: "noindex",
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
