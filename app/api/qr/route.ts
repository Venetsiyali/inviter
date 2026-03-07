import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const size = parseInt(searchParams.get("size") || "300");

    if (!url) {
        return NextResponse.json({ error: "URL kerak" }, { status: 400 });
    }

    try {
        const qrDataUrl = await QRCode.toDataURL(url, {
            width: size,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
            errorCorrectionLevel: "M",
        });

        return NextResponse.json({ qrCode: qrDataUrl });
    } catch {
        return NextResponse.json({ error: "QR kod yaratib bo'lmadi" }, { status: 500 });
    }
}
