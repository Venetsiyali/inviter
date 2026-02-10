import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * Admin API - Update user plan
 * ADMIN role kerak
 */
export async function POST(request: NextRequest) {
    try {
        // Admin check
        await requireAdmin();

        const { userId, plan } = await request.json();

        // Validation
        if (!userId || !plan) {
            return NextResponse.json(
                { error: "userId va plan kerak" },
                { status: 400 }
            );
        }

        if (plan !== "FREE" && plan !== "PREMIUM") {
            return NextResponse.json(
                { error: "Plan faqat FREE yoki PREMIUM bo'lishi mumkin" },
                { status: 400 }
            );
        }

        // Update user plan
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { plan },
            select: {
                id: true,
                email: true,
                name: true,
                plan: true,
                role: true,
            },
        });

        return NextResponse.json({
            success: true,
            user: updatedUser,
        });
    } catch (error: any) {
        console.error("Update plan error:", error);

        // Permission error
        if (error.message === "ADMIN role kerak") {
            return NextResponse.json(
                { error: "Ruxsat rad etildi" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: "Server xatoligi" },
            { status: 500 }
        );
    }
}
