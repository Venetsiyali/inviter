import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const eventId = params.id;
        const formData = await request.formData();

        const file = formData.get("file") as File;
        const uploaderName = formData.get("uploaderName") as string;
        const caption = formData.get("caption") as string | null;

        if (!file || !uploaderName) {
            return NextResponse.json(
                { error: "File and uploader name are required" },
                { status: 400 }
            );
        }

        // Check if event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Convert file to base64 for Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Upload to Cloudinary
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

        const cloudinaryResponse = await fetch(cloudinaryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                file: base64Image,
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "inviter_gallery",
                folder: `inviter/${eventId}`,
            }),
        });

        if (!cloudinaryResponse.ok) {
            throw new Error("Cloudinary upload failed");
        }

        const cloudinaryData = await cloudinaryResponse.json();
        const imageUrl = cloudinaryData.secure_url;

        // Save to database
        const mediaUpload = await prisma.mediaUpload.create({
            data: {
                eventId,
                uploaderName,
                imageUrl,
                caption: caption || null,
            },
        });

        return NextResponse.json(mediaUpload);
    } catch (error) {
        console.error("Media upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload media" },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch media for an event
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const eventId = params.id;

        const media = await prisma.mediaUpload.findMany({
            where: { eventId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ media });
    } catch (error) {
        console.error("Media fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch media" },
            { status: 500 }
        );
    }
}
