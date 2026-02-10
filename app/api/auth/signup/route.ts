import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateEmailVerificationCode } from "@/lib/auth/email-verification";
import { sendVerificationEmail } from "@/lib/email/send";

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Barcha maydonlar talab qilinadi" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" },
                { status: 400 }
            );
        }

        // Check database connection
        try {
            await prisma.$connect();
        } catch (dbError: any) {
            console.error("Database connection error:", dbError);
            return NextResponse.json(
                { error: "Ma'lumotlar bazasiga ulanishda xatolik. .env faylini tekshiring." },
                { status: 500 }
            );
        }

        // Check if user already exists
        let existingUser;
        try {
            existingUser = await prisma.user.findUnique({
                where: { email: email.toLowerCase() },
            });
        } catch (dbError: any) {
            console.error("Database query error:", dbError);
            return NextResponse.json(
                { error: "Ma'lumotlar bazasi so'rovi xatosi" },
                { status: 500 }
            );
        }

        if (existingUser) {
            return NextResponse.json(
                { error: "Bu email allaqachon ro'yxatdan o'tgan" },
                { status: 400 }
            );
        }

        // Hash password with error handling
        let passwordHash;
        try {
            passwordHash = await bcrypt.hash(password, 10);
        } catch (hashError: any) {
            console.error("Password hashing error:", hashError);
            return NextResponse.json(
                { error: "Parolni shifrlashda xatolik" },
                { status: 500 }
            );
        }

        // Create user
        let user;
        try {
            user = await prisma.user.create({
                data: {
                    email: email.toLowerCase(),
                    name,
                    passwordHash,
                    emailVerified: false,
                },
            });
        } catch (createError: any) {
            console.error("User creation error:", createError);
            return NextResponse.json(
                { error: "Foydalanuvchi yaratishda xatolik" },
                { status: 500 }
            );
        }

        // Generate verification code
        let code;
        try {
            code = await generateEmailVerificationCode(user.id, user.email);
        } catch (codeError: any) {
            console.error("Code generation error:", codeError);
            // User created but code failed - still allow
            return NextResponse.json(
                {
                    success: true,
                    warning: "Kod yaratishda xatolik. Qayta urinib ko'ring.",
                    message: "Ro'yxatdan o'tdingiz. Iltimos login qiling."
                },
                { status: 201 }
            );
        }

        // Send verification email (non-blocking)
        try {
            await sendVerificationEmail(user.email, code, name);
        } catch (emailError: any) {
            console.error("Email send error:", emailError);
            // Email failed but user exists - return success with warning
            return NextResponse.json(
                {
                    success: true,
                    warning: "Email yuborishda xatolik",
                    message: "Ro'yxatdan o'tdingiz. Tasdiqlash kodi: " + code,
                    verificationCode: code // For development only
                },
                { status: 201 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Tasdiqlash kodi elektron pochtangizga yuborildi"
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup error:", error);
        // Always return JSON, never let it crash
        return NextResponse.json(
            {
                error: "Server xatoligi: " + (error.message || "Noma'lum xatolik"),
                details: process.env.NODE_ENV === "development" ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
