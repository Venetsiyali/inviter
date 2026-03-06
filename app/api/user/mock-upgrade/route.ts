import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/auth/get-user";

export async function POST() {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Mock upgrading the user to Premium
        await prisma.user.update({
            where: { id: user.id },
            data: {
                plan: "PREMIUM",
                // Set premium expiry to 1 year from now
                premiumValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }
        });

        return NextResponse.json({ success: true, message: "Tarifingiz PREMIUM ga muvaffaqiyatli o'zgartirildi!" });
    } catch (error) {
        console.error("Upgrade error:", error);
        return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
    }
}
