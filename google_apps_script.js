/**
 * Handles POST requests from the form submission
 * Adds the submitted name, email and timestamp to the Google Sheet
 */
function doPost(e) {
  // Get the spreadsheet and the first sheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheets()[0];
  
  // Parse the JSON data from the request
  const data = JSON.parse(e.postData.contents);
  
  // Add the data to the sheet
  sheet.appendRow([
    data.name,
    data.email,
    data.timestamp
  ]);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
