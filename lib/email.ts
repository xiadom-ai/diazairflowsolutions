import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  preferredTime?: string;
}

interface EmergencyEmailData {
  name: string;
  phone: string;
  address: string;
  issueDescription: string;
  urgencyLevel: string;
}

/**
 * Send contact form email via Resend
 */
export async function sendContactEmail(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || "info@diazairflowsolutions.com";

    // Send notification to business
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form: ${data.service} - ${data.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header {
      background: linear-gradient(135deg, #003361 0%, #ff6b35 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px 20px;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #003361;
    }
    .label {
      font-weight: bold;
      color: #003361;
      display: block;
      margin-bottom: 5px;
    }
    .value {
      color: #333;
      font-size: 15px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #003361;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .priority {
      background: #ff6b35;
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      display: inline-block;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      p style="margin: 10px 0 0 0; opacity: 0.9;">Diaz Airflow Solutions Inc.</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">${data.name}</span>
      </div>

      <div class="field">
        <span class="label">Email:</span>
        <span class="value">${data.email}</span>
      </div>

      ${data.phone ? `
      <div class="field">
        <span class="label">Phone:</span>
        <span class="value">${data.phone}</span>
      </div>
      ` : ''}

      <div class="field">
        <span class="label">Service Requested:</span>
        <span class="value">${data.service}</span>
      </div>

      ${data.preferredTime ? `
      <div class="field">
        <span class="label">Preferred Time:</span>
        <span class="value">${data.preferredTime}</span>
      </div>
      ` : ''}

      <div class="field">
        <span class="label">Message:</span>
        <div class="value" style="white-space: pre-wrap;">${data.message}</div>
      </div>

      <div class="priority">
        ⏰ Response Required: Within 2 hours during business hours
      </div>
    </div>

    <div class="footer">
      <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
      <p>Diaz Airflow Solutions Inc. - 24/7 Emergency Service</p>
      <p>(240) 432-7489 | info@diazairflowsolutions.com</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: toEmail,
      subject: "Thank You for Contacting Diaz Airflow Solutions Inc.",
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header {
      background: linear-gradient(135deg, #003361 0%, #ff6b35 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #fff;
      padding: 40px 30px;
      border-radius: 0 0 8px 8px;
    }
    .cta-button {
      display: inline-block;
      background: #ff6b35;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: bold;
    }
    .info-box {
      background: #f0f7ff;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #003361;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Thank You, ${data.name}!</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We've received your message</p>
    </div>

    <div class="content">
      <p style="font-size: 16px;">Hello ${data.name},</p>

      <p>Thank you for contacting <strong>Diaz Airflow Solutions Inc.</strong>. We've received your inquiry about <strong>${data.service}</strong> and our team will respond within 2 hours during business hours.</p>

      <div class="info-box">
        <p style="margin: 0; font-weight: bold; color: #003361;">📋 What happens next?</p>
        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
          <li>Our team is reviewing your request</li>
          <li>You'll receive a call or email within 2 hours</li>
          <li>We'll schedule a convenient time for service or consultation</li>
        </ul>
      </div>

      <p style="font-weight: bold; color: #003361; margin-top: 30px;">Need immediate assistance?</p>
      <p>For emergency HVAC service, call us now:</p>

      <center>
        <a href="tel:2404327489" class="cta-button" style="color: white;">📞 Call (240) 432-7489</a>
      </center>

      <div class="footer">
        <p><strong>Diaz Airflow Solutions Inc.</strong></p>
        <p>24/7 Emergency Service | Licensed & Insured | Serving DMV Since 2010</p>
        <p>13133 Beaver Terrace, Rockville, MD 20853 | (240) 432-7489 | info@diazairflowsolutions.com</p>
        <p style="margin-top: 15px; color: #999;">
          <a href="https://www.diazairflowsolutions.com" style="color: #003361;">Visit Our Website</a> |
          <a href="https://www.diazairflowsolutions.com/book-appointment" style="color: #003361;">Book an Appointment</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email"
    };
  }
}

/**
 * Send emergency service email (higher priority)
 */
export async function sendEmergencyEmail(data: EmergencyEmailData): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || "info@diazairflowsolutions.com";

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `🚨 EMERGENCY SERVICE REQUEST - ${data.urgencyLevel.toUpperCase()} - IMMEDIATE ACTION REQUIRED`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
      border: 3px solid #991b1b;
    }
    .alert {
      background: #fee2e2;
      border-left: 6px solid #dc2626;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .content {
      background: #fff;
      padding: 30px 20px;
      border-radius: 0 0 8px 8px;
      border: 2px solid #dc2626;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
      background: #fef2f2;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #dc2626;
    }
    .label {
      font-weight: bold;
      color: #dc2626;
      display: block;
      margin-bottom: 5px;
      text-transform: uppercase;
      font-size: 12px;
    }
    .value {
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    .urgent-action {
      background: #dc2626;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">🚨 EMERGENCY SERVICE REQUEST</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">IMMEDIATE ATTENTION REQUIRED</p>
    </div>

    <div class="content">
      <div class="alert">
        <strong style="color: #dc2626; font-size: 16px;">URGENCY LEVEL: ${data.urgencyLevel.toUpperCase()}</strong><br>
        <span style="color: #666; font-size: 14px;">Time Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</span>
      </div>

      <div class="urgent-action">
        ⚡ DISPATCH TECHNICIAN IMMEDIATELY ⚡
      </div>

      <div class="field">
        <span class="label">Customer Name:</span>
        <span class="value">${data.name}</span>
      </div>

      <div class="field">
        <span class="label">Phone Number (CALL NOW):</span>
        <span class="value">
          <a href="tel:${data.phone}" style="color: #dc2626; font-size: 18px; font-weight: bold; text-decoration: none;">
            📞 ${data.phone}
          </a>
        </span>
      </div>

      <div class="field">
        <span class="label">Service Address:</span>
        <span class="value">${data.address}</span>
      </div>

      <div class="field">
        <span class="label">Issue Description:</span>
        <div class="value" style="white-space: pre-wrap; line-height: 1.8;">${data.issueDescription}</div>
      </div>

      <div class="urgent-action">
        🎯 TARGET RESPONSE: Under 2 Hours<br>
        📞 Call Customer Within 5 Minutes
      </div>

      <div style="background: #fffbeb; border: 2px solid #f59e0b; padding: 15px; border-radius: 6px; margin-top: 20px;">
        <p style="margin: 0; font-weight: bold; color: #92400e;">⚠️ Emergency Protocol:</p>
        <ol style="margin: 10px 0 0 0; padding-left: 20px; color: #78350f;">
          <li>Call customer immediately to confirm details</li>
          <li>Dispatch nearest available technician</li>
          <li>Provide ETA to customer</li>
          <li>Follow up within 1 hour of service completion</li>
        </ol>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error("Resend emergency email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send emergency email"
    };
  }
}
