import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { lucia } from "@/lib/auth/lucia";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        console.log('🔐 Login attempt:', email);

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email va parol talab qilinadi" },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            console.log('❌ User not found:', email);
            return NextResponse.json(
                { error: "Email yoki parol noto'g'ri" },
                { status: 401 }
            );
        }

        console.log('✅ User found:', user.email, 'Role:', user.role);

        // Verify password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            console.log('❌ Invalid password for:', email);
            return NextResponse.json(
                { error: "Email yoki parol noto'g'ri" },
                { status: 401 }
            );
        }

        console.log('✅ Password valid');

        // Check if email is verified
        if (!user.emailVerified) {
            console.log('⚠️ Email not verified:', email);
            return NextResponse.json(
                { error: "Iltimos, elektron pochtangizni tasdiqlang" },
                { status: 403 }
            );
        }

        // Create session
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        console.log('✅ Session created for:', user.email);

        // Determine redirect URL based on role
        const redirectUrl = user.role === 'ADMIN' ? '/admin' : '/dashboard';

        return NextResponse.json(
            {
                success: true,
                redirectUrl,
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    plan: user.plan
                }
            },
            {
                status: 200,
                headers: {
                    "Set-Cookie": sessionCookie.serialize(),
                },
            }
        );
    } catch (error: any) {
        console.error("❌ Login error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}
