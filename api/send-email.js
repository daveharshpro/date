import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers for security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { partnerName, myName } = req.body || {};

    const cleanPartnerName = (partnerName || '').trim();
    const cleanMyName = (myName || '').trim();

    if (!cleanPartnerName || !cleanMyName) {
      return res.status(400).json({ error: 'Partner name and my name are required' });
    }

    const gmailUser = process.env.GMAIL_USER || 'daveharsh0902@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      console.warn('[API Warning] GMAIL_APP_PASSWORD environment variable is not set.');
      return res.status(200).json({
        success: false,
        message: 'Credentials not configured on server, but request accepted gracefully.'
      });
    }

    // Configure Nodemailer SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const mailOptions = {
      from: `"Date Journey ❤️" <${gmailUser}>`,
      to: 'daveharsh0902@gmail.com',
      subject: '❤️ We Have Date Names!',
      text: `Hey! ❤️ Someone just completed the date experience.

Date details:
• What should I call them? → ${cleanPartnerName}
• What will they call me? → ${cleanMyName}

Looks like the date is officially happening! 😌❤️

Sent from the date website.`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #12030A; color: #FFF0F5; border-radius: 12px; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #FF7597; text-align: center;">❤️ We Have Date Names!</h2>
          <p style="font-size: 16px; color: #FFE4E6;">Hey! Someone just completed the date proposal on your website! 😌</p>
          <div style="background: rgba(255, 255, 255, 0.08); padding: 15px; border-radius: 8px; border: 1px solid #FF4D6D; margin: 20px 0;">
            <p style="margin: 8px 0; font-size: 15px; color: #FFB3C1;"><strong>What should I call them?</strong> → <span style="color: #FFF; font-weight: bold;">${cleanPartnerName}</span></p>
            <p style="margin: 8px 0; font-size: 15px; color: #FFB3C1;"><strong>What will they call me?</strong> → <span style="color: #FFF; font-weight: bold;">${cleanMyName}</span></p>
          </div>
          <p style="text-align: center; color: #FBBF24; font-size: 16px;">Looks like the date is officially happening! 🔓❤️</p>
          <p style="text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 25px;">Sent from the date website.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('[API Error] Failed to send notification email:', error);
    // Return 200 so client user experience is never broken by email SMTP issues
    return res.status(200).json({
      success: false,
      error: 'Failed to send email silently',
      details: error.message
    });
  }
}
