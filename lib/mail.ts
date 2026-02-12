import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send verification email with 6-digit code
 */
export async function sendVerificationEmail(email: string, code: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Invite.uz <info@inviter.uz>',
            to: email,
            subject: 'Elektron pochtangizni tasdiqlang - Invite.uz',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                        <!-- Header -->
                        <div style="text-align: center; margin-bottom: 40px;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                Invite.uz
                            </h1>
                        </div>

                        <!-- Main Card -->
                        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 40px; margin-bottom: 20px;">
                            <h2 style="margin: 0 0 16px 0; font-size: 24px; color: #111827;">
                                Elektron pochtangizni tasdiqlang
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.5;">
                                Salom! Invite.uz'da ro'yxatdan o'tganingiz uchun rahmat. Tasdiqlash kodingiz:
                            </p>

                            <!-- Verification Code -->
                            <div style="background: linear-gradient(to right, #eff6ff, #faf5ff); border-radius: 12px; padding: 32px; text-align: center; margin: 32px 0;">
                                <div style="font-size: 48px; font-weight: bold; letter-spacing: 8px; color: #2563eb; font-family: 'Courier New', monospace;">
                                    ${code}
                                </div>
                                <p style="margin: 12px 0 0 0; color: #6b7280; font-size: 14px;">
                                    Tasdiqlash kodi 10 daqiqa amal qiladi
                                </p>
                            </div>

                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                Agar siz bu koddan so'ramagan bo'lsangiz, ushbu xabarni e'tiborsiz qoldiring.
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style="text-align: center; color: #9ca3af; font-size: 12px;">
                            <p style="margin: 0;">
                                © 2026 Invite.uz. Barcha huquqlar himoyalangan.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend email error:', error);
            throw new Error('Email yuborishda xatolik');
        }

        console.log('Verification email sent:', data);
        return { success: true, messageId: data?.id };
    } catch (error: any) {
        console.error('Send verification email error:', error);
        throw error;
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Invite.uz <info@inviter.uz>',
            to: email,
            subject: 'Parolni tiklash - Invite.uz',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                        <div style="text-align: center; margin-bottom: 40px;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                Invite.uz
                            </h1>
                        </div>

                        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 40px;">
                            <h2 style="margin: 0 0 16px 0; font-size: 24px; color: #111827;">
                                Parolni tiklash
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.5;">
                                Parolni tiklash so'rovi oldik. Yangi parol yaratish uchun quyidagi tugmani bosing:
                            </p>

                            <div style="text-align: center; margin: 32px 0;">
                                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(to right, #2563eb, #9333ea); color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                    Parolni tiklash
                                </a>
                            </div>

                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                Havola 1 soat amal qiladi. Agar siz bu so'rovni yubormagan bo'lsangiz, ushbu xabarni e'tiborsiz qoldiring.
                            </p>
                        </div>

                        <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
                            <p style="margin: 0;">© 2026 Invite.uz. Barcha huquqlar himoyalangan.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend email error:', error);
            throw new Error('Email yuborishda xatolik');
        }

        return { success: true, messageId: data?.id };
    } catch (error: any) {
        console.error('Send password reset email error:', error);
        throw error;
    }
}
