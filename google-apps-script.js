function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.openById("10QwxAHMXhm2EeSJrPha-xF7REm6cFSAoaJqjB0lNHdk").getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Fecha", "Nombre", "Hijo/a", "Edad", "Plan", "Dias", "Horarios"]);
  }

  sheet.appendRow([
    data.timestamp,
    data.parentName,
    data.childName,
    data.childAge,
    data.plan || "Sin seleccionar",
    data.days.join(", "),
    data.timeSlots.join(", ")
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
