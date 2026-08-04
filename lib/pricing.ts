import { headers } from "next/headers"

export type CurrencyCode = "ARS" | "USD" | "MXN"

export type PricingData = {
  quarterly: {
    price: string
    totalNote: string
    savings: string
  }
  monthly: {
    price: string
  }
  custom: {
    price: string
    note: string
    cta: string
  }
}

// Precios de referencia: ARS es el precio base (Argentina).
// USD/MXN son para la campaña de publicidad en USA y México.
// Conversión MXN calculada a ~$17.3 MXN/USD (agosto 2026) — revisar periódicamente.
const PRICING: Record<CurrencyCode, PricingData> = {
  ARS: {
    quarterly: {
      price: "$70.000",
      totalNote: "Total: $210.000 por 3 meses",
      savings: "Ahorra $30.000",
    },
    monthly: {
      price: "$80.000",
    },
    custom: {
      price: "A presupuestar",
      note: "Precio según frecuencia y cantidad de clases",
      cta: "Pedir presupuesto",
    },
  },
  USD: {
    quarterly: {
      price: "$79 USD",
      totalNote: "Total: $237 USD por 3 meses",
      savings: "Ahorra $60 USD",
    },
    monthly: {
      price: "$99 USD",
    },
    custom: {
      price: "$20 USD",
      note: "Por clase individual",
      cta: "Reservar clase particular",
    },
  },
  MXN: {
    quarterly: {
      price: "$1.370 MXN",
      totalNote: "Total: $4.110 MXN por 3 meses",
      savings: "Ahorra $1.035 MXN",
    },
    monthly: {
      price: "$1.715 MXN",
    },
    custom: {
      price: "$345 MXN",
      note: "Por clase individual",
      cta: "Reservar clase particular",
    },
  },
}

export async function getPricingForVisitor(): Promise<PricingData> {
  const headersList = await headers()
  const country = headersList.get("x-vercel-ip-country")

  if (country === "US") return PRICING.USD
  if (country === "MX") return PRICING.MXN
  return PRICING.ARS
}
