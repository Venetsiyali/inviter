import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { uploadToR2, generateFileKey } from "@/lib/r2";

// POST: Upload photo to invitation gallery
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const invitationId = formData.get("invitationId") as string;
        const uploaderName = formData.get("uploaderName") as string;

        if (!file || !invitationId || !uploaderName) {
            return NextResponse.json(
                { error: "Rasm, taklifnoma ID va ism kerak" },
                { status: 400 }
            );
        }

        // Validate invitation exists and has photos enabled
        const invitation = await prisma.invitation.findUnique({
            where: { id: invitationId },
            select: { id: true, photoEnabled: true, isPublished: true },
        });

        if (!invitation || !invitation.isPublished) {
            return NextResponse.json({ error: "Taklifnoma topilmadi" }, { status: 404 });
        }

        if (!invitation.photoEnabled) {
            return NextResponse.json({ error: "Bu taklifnomada rasm yuklash yoqilmagan" }, { status: 403 });
        }

        // Validate file
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: "Rasm hajmi 10MB dan oshmasligi kerak" }, { status: 400 });
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Faqat JPG, PNG, WebP formatlar qo'llab-quvvatlanadi" }, { status: 400 });
        }

        // Upload to R2
        const buffer = Buffer.from(await file.arrayBuffer());
        const key = generateFileKey(`photos/${invitationId}`, file.name);
        const url = await uploadToR2({
            key,
            body: buffer,
            contentType: file.type,
        });

        // Save to DB
        const photo = await prisma.photo.create({
            data: {
                invitationId,
                uploaderName,
                url,
                fileSize: file.size,
            },
        });

        return NextResponse.json({
            success: true,
            photo: {
                id: photo.id,
                url: photo.url,
                uploaderName: photo.uploaderName,
            },
        });
    } catch (error: any) {
        console.error("Photo upload error:", error);
        return NextResponse.json({ error: "Rasm yuklab bo'lmadi" }, { status: 500 });
    }
}

// GET: Get photos for an invitation
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const invitationId = searchParams.get("invitationId");

    if (!invitationId) {
        return NextResponse.json({ error: "invitationId kerak" }, { status: 400 });
    }

    const photos = await prisma.photo.findMany({
        where: { invitationId, approved: true },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            url: true,
            thumbnailUrl: true,
            uploaderName: true,
            createdAt: true,
        },
    });

    return NextResponse.json({ photos });
}
