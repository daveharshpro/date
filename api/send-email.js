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
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.warn('Could not parse string body:', e);
      }
    }

    const { partnerName, myName } = body;

    const cleanPartnerName = (partnerName || 'Special Someone').trim();
    const cleanMyName = (myName || 'Me').trim();

    // SMTP Credentials (with default fallbacks so email ALWAYS delivers)
    const gmailUser = process.env.GMAIL_USER || 'daveharsh0902@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || 'frbctlrbtgsyrzms';
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'daveharsh0905@gmail.com';

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
      to: recipientEmail,
      subject: `❤️ Date Proposal Accepted! ${cleanPartnerName} & ${cleanMyName}`,
      text: `Hey! ❤️ Someone just completed the date experience on your website!

Date Names Personalization:
• Her Name / Nickname: ${cleanPartnerName}
• His Name / Nickname: ${cleanMyName}

The date is officially unlocked and happening! 😌❤️

Sent from Date Journey website.`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 28px; background-color: #12030A; color: #FFF0F5; border-radius: 16px; max-width: 520px; margin: 0 auto; border: 1px solid #FF4D6D; box-shadow: 0 10px 30px rgba(255, 77, 109, 0.2);">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 40px;">❤️</span>
            <h2 style="color: #FF7597; margin-top: 8px; font-size: 24px; font-weight: 700;">Date Proposal Accepted!</h2>
            <p style="font-size: 15px; color: #FFE4E6; margin-top: 4px;">Someone just completed the date proposal on your website!</p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.07); padding: 20px; border-radius: 12px; border-left: 4px solid #FF4D6D; margin: 24px 0;">
            <h3 style="margin-top: 0; color: #FFB3C1; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Personalized Date Names</h3>
            
            <div style="margin-top: 14px; font-size: 16px;">
              <p style="margin: 8px 0; color: #FFCCD5;">
                <strong style="color: #FF7597;">What she will be called:</strong><br/>
                <span style="font-size: 20px; font-weight: bold; color: #FFFFFF; display: inline-block; margin-top: 4px; background: rgba(255, 77, 109, 0.2); px-3 py-1; border-radius: 6px;">${cleanPartnerName}</span>
              </p>
              
              <p style="margin: 16px 0 8px 0; color: #FFCCD5;">
                <strong style="color: #FF7597;">What he will be called:</strong><br/>
                <span style="font-size: 20px; font-weight: bold; color: #FFFFFF; display: inline-block; margin-top: 4px; background: rgba(255, 77, 109, 0.2); px-3 py-1; border-radius: 6px;">${cleanMyName}</span>
              </p>
            </div>
          </div>

          <div style="text-align: center; background: rgba(251, 191, 36, 0.1); padding: 12px; border-radius: 8px; border: 1px solid rgba(251, 191, 36, 0.3);">
            <p style="color: #FBBF24; font-size: 16px; font-weight: 600; margin: 0;">🔓 Date officially unlocked & happening! 🎉</p>
          </div>

          <p style="text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 25px;">Sent automatically from your Date Journey website.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Notification email sent successfully with names!' });
  } catch (error) {
    console.error('[API Error] Failed to send notification email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error.message
    });
  }
}
