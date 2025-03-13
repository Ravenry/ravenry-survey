/**
 * Handles POST requests from the form submission
 * Adds the submitted name, email and timestamp to the Google Sheet
 */
function doPost(e) {
  try {
    // Log incoming parameters
    Logger.log("Received parameters: " + JSON.stringify(e.parameter));
    
    // Get the spreadsheet and the first sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("Could not access spreadsheet");
    }
    Logger.log("Successfully accessed spreadsheet");
    
    var sheet = spreadsheet.getSheets()[0];
    if (!sheet) {
      throw new Error("Could not access first sheet");
    }
    Logger.log("Successfully accessed sheet");
    
    // Get form data directly from parameters
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    
    Logger.log("Processing data - Name: " + name + ", Email: " + email + ", Timestamp: " + timestamp);
    
    // Add the data to the sheet
    sheet.appendRow([name, email, timestamp]);
    Logger.log("Successfully appended row to sheet");
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput("Success!")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader('Access-Control-Allow-Origin', '*');
      
  } catch (error) {
    // Log the full error details
    Logger.log("Error occurred: " + error.toString());
    Logger.log("Stack trace: " + error.stack);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("The script is working!")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doOptions(e) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
