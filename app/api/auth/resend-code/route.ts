import { NextRequest, NextResponse } from "next/server";
import { generateEmailVerificationCode } from "@/lib/auth/email-verification";
import { sendVerificationEmail } from "@/lib/email/send";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email talab qilinadi" },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Foydalanuvchi topilmadi" },
                { status: 404 }
            );
        }

        // Generate new code
        const code = await generateEmailVerificationCode(user.id, user.email);

        // Send email
        await sendVerificationEmail(user.email, code, user.name || "");

        return NextResponse.json(
            {
                success: true,
                message: "Yangi kod yuborildi",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Resend code error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}
