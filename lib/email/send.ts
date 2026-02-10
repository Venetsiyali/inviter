import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  code: string,
  name: string
) {
  // Check if email is configured
  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER) {
    console.warn("Email not configured, skipping send. Code:", code);
    // Don't throw error, just log warning
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@invite.uz",
    to: email,
    subject: "Invite.uz - Elektron pochtani tasdiqlang",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Invite.uz</h1>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1a202c; margin-top: 0;">Salom, ${name}!</h2>
          
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
            Invite.uz platformasidan foydalanishni boshlash uchun quyidagi tasdiqlash kodini kiriting:
          </p>
          
          <div style="background: #f7fafc; border: 2px solid #667eea; border-radius: 12px; padding: 24px; text-align: center; margin: 30px 0;">
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #667eea; font-family: 'Courier New', monospace;">
              ${code}
            </div>
          </div>
          
          <p style="color: #718096; font-size: 14px; line-height: 1.6;">
            Bu kod 15 daqiqa davomida amal qiladi. Agar siz bu so'rovni amalga oshirmagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin: 0;">
              © 2026 Invite.uz. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Email send error:", error);
    // Don't throw - let signup continue
    console.warn("Email failed but continuing signup. Code:", code);
  }
}
