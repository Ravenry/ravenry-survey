/**
 * Handles POST requests from the form submission
 * Adds the submitted name, email and timestamp to the Google Sheet
 */
function doPost(e) {
  // Add CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // Get the spreadsheet and the first sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Get form data
    const data = e.parameter;
    
    // Add the data to the sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.timestamp || new Date().toISOString()
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doOptions(e) {
  // Handle CORS preflight requests
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}
