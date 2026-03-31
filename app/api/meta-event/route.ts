import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

// Ambos píxeles reciben el mismo evento
const PIXELS = [
  { id: process.env.META_PIXEL_1_ID, token: process.env.META_PIXEL_1_TOKEN },
  { id: process.env.META_PIXEL_2_ID, token: process.env.META_PIXEL_2_TOKEN },
].filter((p): p is { id: string; token: string } => Boolean(p.id && p.token))

export async function POST(req: NextRequest) {
  if (PIXELS.length === 0) {
    console.error("[meta-event] No hay píxeles configurados")
    return NextResponse.json({ success: false, error: "no_pixels_configured" })
  }

  const { eventName, eventId, eventSourceUrl, userData = {}, customData = {}, fbp, fbc } = await req.json()

  const userDataPayload: Record<string, unknown> = {}
  if (fbp) userDataPayload.fbp = fbp
  if (fbc) userDataPayload.fbc = fbc
  if (userData.firstName) userDataPayload.fn = [sha256(userData.firstName)]

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: eventSourceUrl,
    user_data: userDataPayload,
    ...(Object.keys(customData).length > 0 && { custom_data: customData }),
  }

  const results = await Promise.allSettled(
    PIXELS.map((pixel) =>
      fetch(
        `https://graph.facebook.com/v19.0/${pixel.id}/events?access_token=${pixel.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [event] }),
        }
      )
        .then((r) => r.json())
        .then((data) => {
          console.log(`[meta-event] Pixel ${pixel.id} →`, JSON.stringify(data))
          return data
        })
    )
  )

  const errors = results.filter((r) => r.status === "rejected")
  if (errors.length > 0) {
    console.error("[meta-event] Errores:", errors)
  }

  return NextResponse.json({ success: true })
}
