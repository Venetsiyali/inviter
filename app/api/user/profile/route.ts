import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth/get-user";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Tizimga kirish talab qilinadi" },
                { status: 401 }
            );
        }

        const { name, currentPassword, newPassword } = await request.json();

        const updateData: Record<string, any> = {};

        // Update name if provided
        if (name !== undefined && name !== null) {
            updateData.name = name.trim();
        }

        // Update password if provided
        if (newPassword) {
            if (newPassword.length < 6) {
                return NextResponse.json(
                    { error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" },
                    { status: 400 }
                );
            }

            // If user already has a password, verify the current one
            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: { passwordHash: true, googleId: true },
            });

            if (dbUser?.passwordHash) {
                // User has an existing password — must verify current one
                if (!currentPassword) {
                    return NextResponse.json(
                        { error: "Joriy parolni kiriting" },
                        { status: 400 }
                    );
                }
                const valid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
                if (!valid) {
                    return NextResponse.json(
                        { error: "Joriy parol noto'g'ri" },
                        { status: 400 }
                    );
                }
            }
            // If user signed up via Google and has no password, allow setting one without current password

            updateData.passwordHash = await bcrypt.hash(newPassword, 10);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "Hech narsa o'zgartirilmadi" },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            message: "Profil muvaffaqiyatli yangilandi!",
        });
    } catch (error: any) {
        console.error("❌ Profile update error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}

// GET user profile data
export async function GET() {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Tizimga kirish talab qilinadi" },
                { status: 401 }
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                name: true,
                plan: true,
                role: true,
                googleId: true,
                passwordHash: true,
                createdAt: true,
                _count: { select: { events: true } },
            },
        });

        return NextResponse.json({
            user: {
                id: dbUser?.id,
                email: dbUser?.email,
                name: dbUser?.name,
                plan: dbUser?.plan,
                role: dbUser?.role,
                hasGoogle: !!dbUser?.googleId,
                hasPassword: !!dbUser?.passwordHash,
                createdAt: dbUser?.createdAt,
                eventCount: dbUser?._count?.events || 0,
            },
        });
    } catch (error: any) {
        console.error("❌ Profile fetch error:", error);
        return NextResponse.json(
            { error: "Xatolik yuz berdi" },
            { status: 500 }
        );
    }
}
