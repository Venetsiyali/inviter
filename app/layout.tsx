import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Invite.uz - Onlayn Taklifnomalar va Tadbirlarni Boshqarish | AI Yordamida",
    description: "O'zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi. To'y, tug'ilgan kun va marosimlar uchun raqamli taklifnomalarni onlayn yarating.",
    keywords: [
        "taklifnoma",
        "online taklifnoma",
        "invite uz",
        "to'y taklifnomasi",
        "raqamli taklifnoma",
        "o'zbekcha taklifnomalar",
        "onlayn taklifnoma yaratish",
        "AI taklifnoma",
        "tug'ilgan kun taklifnomasi",
        "nikoh taklifnomasi",
        "sunnat to'yi",
        "digital invitation",
        "uzbekistan invitation",
    ],
    authors: [{ name: "Invite.uz Team" }],
    creator: "Invite.uz",
    publisher: "Invite.uz",
    metadataBase: new URL("https://inviter.uz"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Invite.uz - Onlayn Taklifnomalar | AI Yordamida",
        description: "O'zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi. Professional raqamli taklifnomalar bir necha daqiqada.",
        url: "https://inviter.uz",
        siteName: "Invite.uz",
        locale: "uz_UZ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Invite.uz - AI Yordamida Taklifnomalar",
        description: "Professional raqamli taklifnomalar bir necha daqiqada yarating",
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
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" className="scroll-smooth">
            <body className={inter.className}>
                <StructuredData />
                {children}
            </body>
        </html>
    );
}
