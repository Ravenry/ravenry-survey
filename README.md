# Ravenry Survey Report Download

This project is a landing page for the "Shaping the Future of Work: How Independent Talent is Redefining Work in Singapore" report by Ravenry.

## Features

- Landing page with information about the report
- Form to collect user details (Name, Company, Email)
- Thank you page after form submission
- Email sending functionality using Resend
- Data collection in Google Sheets

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Resend API key (get one at [resend.com](https://resend.com))
- A Google Sheet with the Google Apps Script deployed

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Resend API key:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```
4. Update the Google Apps Script URL in `index.html` if needed:
   ```javascript
   fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
     method: 'POST',
     body: formData
   })
   ```

### Running the Application Locally

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`

### Deploying to Vercel

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add the `RESEND_API_KEY` variable with your Resend API key

5. For production deployment:
   ```
   vercel --prod
   ```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

### Google Sheet Setup

1. Create a Google Sheet with the following headers in the first row:
   - name
   - company
   - email
   - timestamp

2. Deploy the Google Apps Script (see `google_apps_script.js`) as a web app.

## Email Template

The email sent to users includes:
- Personalized greeting with first name
- Thank you message
- Information about the report
- Download link for the report
- Contact information

## License

All rights reserved © 2023 Ravenry