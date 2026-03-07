import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Validate
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email va parol kiritish shart" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Parol kamida 6 belgidan iborat bo'lishi kerak" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Bu email allaqachon ro'yxatdan o'tgan" },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: name || null,
                email,
                passwordHash,
                plan: "FREE",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Akkaunt yaratildi!",
            userId: user.id,
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}
