import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: {
        default: "inviter.uz — To'yingiz uchun eng chiroyli taklifnoma | AI Yordamida",
        template: "%s | inviter.uz",
    },
    description:
        "O'zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi. To'y, osh, tug'ilgan kun uchun professional raqamli taklifnomalar. QR kod, GPS manzil, online hadya va rasm galereyasi — hammasi bir joyda.",
    keywords: [
        "taklifnoma", "online taklifnoma", "inviter uz", "to'y taklifnomasi",
        "raqamli taklifnoma", "o'zbekcha taklifnomalar", "onlayn taklifnoma yaratish",
        "AI taklifnoma", "tug'ilgan kun taklifnomasi", "nikoh taklifnomasi",
        "sunnat to'yi", "osh marosimi", "digital invitation", "uzbekistan invitation",
    ],
    authors: [{ name: "Inviter.uz Team" }],
    creator: "Inviter.uz",
    publisher: "Inviter.uz",
    metadataBase: new URL("https://inviter.uz"),
    alternates: { canonical: "/" },
    openGraph: {
        title: "inviter.uz — Professional To'y Taklifnomalari",
        description: "AI yordamida 1 daqiqada mukammal taklifnoma. QR kod + GPS + Online hadya + Rasm galereyasi.",
        url: "https://inviter.uz",
        siteName: "inviter.uz",
        locale: "uz_UZ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "inviter.uz — AI Yordamida Taklifnomalar",
        description: "Professional raqamli taklifnomalar 60 soniyada yarating",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" className={`scroll-smooth ${inter.variable} ${cormorant.variable}`}>
            <body className={inter.className}>
                <StructuredData />
                {children}
            </body>
        </html>
    );
}
