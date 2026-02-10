import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * Admin API - Get all users
 */
export async function GET(request: NextRequest) {
    try {
        // Admin check
        await requireAdmin();

        // Fetch all users with event count
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                plan: true,
                emailVerified: true,
                createdAt: true,
                _count: {
                    select: {
                        events: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ users });
    } catch (error: any) {
        console.error("Get users error:", error);
        return NextResponse.json(
            { error: "Server xatoligi" },
            { status: 500 }
        );
    }
}
