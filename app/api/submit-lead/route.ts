import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    console.error("[submit-lead] NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL no está definida")
    return NextResponse.json({ success: false, error: "webhook_not_configured" })
  }

  let body
  try {
    body = await req.json()
  } catch (err) {
    console.error("[submit-lead] Error leyendo el body:", err)
    return NextResponse.json({ success: false, error: "invalid_body" })
  }

  const payload = {
    timestamp: new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Cordoba",
    }),
    ...body,
  }

  console.log("[submit-lead] Enviando al sheet:", JSON.stringify(payload))

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // Apps Script lee mejor text/plain que application/json en server-side
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    console.log("[submit-lead] Respuesta Apps Script - status:", response.status)
    const text = await response.text()
    console.log("[submit-lead] Respuesta Apps Script - body:", text)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[submit-lead] Error llamando Apps Script:", err)
    return NextResponse.json({ success: false, error: String(err) })
  }
}
