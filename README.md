# Ravenry Survey Landing Page

This landing page includes a form that collects email addresses when users download the report. The form data is sent to a Google Sheet.

## Setting Up Google Sheets Integration

Follow these steps to set up the Google Sheets integration:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name the spreadsheet "Ravenry Survey Responses"
3. Add headers in the first row: "Name", "Email", "Timestamp"

### Step 2: Create a Google Apps Script

1. In your Google Sheet, click on "Extensions" > "Apps Script"
2. Replace the default code with the code from the `google_apps_script.js` file in this repository
3. Save the script (File > Save)
4. Click on "Deploy" > "New deployment"
5. Select "Web app" as the deployment type
6. Set "Who has access" to "Anyone" (this allows the form to submit data without authentication)
7. Click "Deploy"
8. Copy the Web App URL that is generated

### Step 3: Update the HTML File

1. Open the `index.html` file
2. Find the line with `const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';`
3. Replace `'YOUR_GOOGLE_SCRIPT_URL'` with the Web App URL you copied in Step 2

## How It Works

1. When a user clicks on any "Download Report" button, they are directed to the form at the bottom of the page
2. After submitting their email, the data is sent to the Google Sheet
3. Upon successful submission, the user is redirected to the report download link

## Customization

- You can modify the form fields in the HTML file to collect additional information
- Update the Google Apps Script to handle the additional fields
- Adjust the styling in the HTML file to match your branding

## Troubleshooting

If the form submission is not working:

1. Check the browser console for any JavaScript errors
2. Verify that the Google Apps Script URL is correct
3. Make sure the Google Apps Script is deployed as a web app with the correct permissions
4. Check that the Google Sheet is accessible to the script