const express = require('express');
const { Resend } = require('resend');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables in development mode
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (error) {
    console.warn('dotenv not found, skipping...');
  }
}

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend with API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn('Warning: RESEND_API_KEY environment variable is not set. Email functionality will not work.');
}
const resend = new Resend(resendApiKey);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, company, downloadLink } = req.body;
    
    // Get first name from full name
    const firstName = name.split(' ')[0];
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'The Ravenry Team <team@mail.theravenry.com>',
      to: email,
      subject: '📥 Download the Report: Shaping the Future of Work in Singapore',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <p>Hi ${firstName},</p>
          
          <p>Thank you for your interest in our report, Shaping the Future of Work: How Independent Talent is Redefining Work in Singapore.</p>
          
          <p>This report provides key insights into the evolving workforce landscape, helping businesses and professionals navigate the rise of independent talent.</p>
          
          <p style="margin: 25px 0;">
            <a href="${downloadLink}" style="background-color: #0050C5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">👉 Download your report here</a>
          </p>
          
          <p>We hope you find it valuable! If you have any questions or would like to discuss the insights further, feel free to reach out to <a href="mailto:matthew@theravenry.com">matthew@theravenry.com</a></p>
          
          <p>Best,<br>The Ravenry Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 