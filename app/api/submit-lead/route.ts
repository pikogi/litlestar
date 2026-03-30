import { NextRequest, NextResponse } from "next/server"

/**
 * Para conectar con Google Sheets:
 *
 * 1. Abrí tu Google Sheet: https://docs.google.com/spreadsheets/d/10QwxAHMXhm2EeSJrPha-xF7REm6cFSAoaJqjB0lNHdk
 * 2. Ir a Extensiones → Apps Script
 * 3. Reemplazá todo el código con esto:
 *
 * -------------------------------------------------------------------
 * function doPost(e) {
 *   const data = JSON.parse(e.postData.contents);
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *
 *   if (sheet.getLastRow() === 0) {
 *     sheet.appendRow(['Fecha', 'Nombre padre/madre', 'Nombre hijo/a', 'Edad', 'Plan', 'Días', 'Horarios']);
 *   }
 *
 *   sheet.appendRow([
 *     data.timestamp,
 *     data.parentName,
 *     data.childName,
 *     data.childAge,
 *     data.plan || 'Sin seleccionar',
 *     data.days.join(', '),
 *     data.timeSlots.join(', '),
 *   ]);
 *
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ success: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * -------------------------------------------------------------------
 *
 * 4. Guardar (Ctrl+S) y hacer clic en "Implementar" → "Nueva implementación"
 * 5. Tipo: "Aplicación web", Ejecutar como: "Yo", Acceso: "Cualquier usuario"
 * 6. Copiá la URL que te da y pegala en .env.local:
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/...
 */

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    // No bloqueamos la UX si el webhook no está configurado
    return NextResponse.json({ success: true })
  }

  try {
    const body = await req.json()
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("es-AR", {
          timeZone: "America/Argentina/Cordoba",
        }),
        ...body,
      }),
    })
  } catch (err) {
    console.error("Google Sheets webhook error:", err)
  }

  return NextResponse.json({ success: true })
}
