import { NextRequest, NextResponse } from "next/server"

const PLANES: Record<string, { title: string; unit_price: number }> = {
  trimestral: {
    title: "Plan Trimestral - Little Star",
    unit_price: 180000,
  },
  mensual: {
    title: "Plan Mensual - Little Star",
    unit_price: 80000,
  },
  personalizado: {
    title: "Plan Personalizado - Little Star",
    unit_price: 100000, // ← actualizá este precio según corresponda
  },
}

export async function POST(req: NextRequest) {
  const { plan } = await req.json()

  if (!plan || !(plan in PLANES)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const accessToken = process.env.MP_ACCESS_TOKEN

  if (!baseUrl || !accessToken) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 })
  }

  const planData = PLANES[plan]

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: plan,
          title: planData.title,
          quantity: 1,
          unit_price: planData.unit_price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${baseUrl}/pago/exitoso`,
        failure: `${baseUrl}/pago?error=1`,
        pending: `${baseUrl}/pago/exitoso?pending=1`,
      },
      auto_return: "approved",
      external_reference: plan,
      statement_descriptor: "LITTLE STAR",
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("MP error:", data)
    return NextResponse.json({ error: "Error al crear preferencia" }, { status: 500 })
  }

  return NextResponse.json({ url: data.init_point })
}
