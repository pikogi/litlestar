import { headers } from "next/headers"

export type CurrencyCode = "ARS" | "USD" | "MXN"

export type PricingData = {
  quarterly: {
    amount: string
    currency: string
    totalNote: string
    savings: string
  }
  monthly: {
    amount: string
    currency: string
  }
  custom: {
    amount: string
    currency: string
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
      amount: "$70.000",
      currency: "",
      totalNote: "Total: $210.000 por 3 meses",
      savings: "Ahorra $30.000",
    },
    monthly: {
      amount: "$80.000",
      currency: "",
    },
    custom: {
      amount: "A presupuestar",
      currency: "",
      note: "Precio según frecuencia y cantidad de clases",
      cta: "Pedir presupuesto",
    },
  },
  USD: {
    quarterly: {
      amount: "$79",
      currency: "USD",
      totalNote: "Total: $237 USD por 3 meses",
      savings: "Ahorra $60 USD",
    },
    monthly: {
      amount: "$99",
      currency: "USD",
    },
    custom: {
      amount: "$20",
      currency: "USD",
      note: "Por clase individual",
      cta: "Reservar clase particular",
    },
  },
  MXN: {
    quarterly: {
      amount: "$1.370",
      currency: "MXN",
      totalNote: "Total: $4.110 MXN por 3 meses",
      savings: "Ahorra $1.035 MXN",
    },
    monthly: {
      amount: "$1.715",
      currency: "MXN",
    },
    custom: {
      amount: "$345",
      currency: "MXN",
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
