"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
    url: string;
    size?: number;
}

export default function QRCodeGenerator({ url, size = 200 }: QRCodeGeneratorProps) {
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    useEffect(() => {
        QRCode.toDataURL(url, {
            width: size,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        })
            .then(setQrDataUrl)
            .catch((err) => console.error("QR generation error:", err));
    }, [url, size]);

    const downloadQR = () => {
        const link = document.createElement("a");
        link.download = "invitation-qr.png";
        link.href = qrDataUrl;
        link.click();
    };

    if (!qrDataUrl) {
        return (
            <div className="flex items-center justify-center" style={{ width: size, height: size }}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR Code" className="rounded-lg shadow-md" unoptimized />
            <button
                onClick={downloadQR}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
                QR kodni yuklab olish
            </button>
        </div>
    );
}
