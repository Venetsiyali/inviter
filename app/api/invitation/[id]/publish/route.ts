import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Tizimga kiring" }, { status: 401 });
        }

        const invitation = await prisma.invitation.findUnique({
            where: { id: params.id },
        });

        if (!invitation || invitation.userId !== session.user.id) {
            return NextResponse.json({ error: "Topilmadi" }, { status: 404 });
        }

        await prisma.invitation.update({
            where: { id: params.id },
            data: { isPublished: !invitation.isPublished },
        });

        return NextResponse.redirect(
            new URL(`/dashboard/invitations/${params.id}`, request.url)
        );
    } catch {
        return NextResponse.json({ error: "Xatolik" }, { status: 500 });
    }
}
