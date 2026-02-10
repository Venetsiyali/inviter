import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Invite.uz - AI bilan Professional Taklifnomalar",
    description: "O'zbekiston uchun AI-powered taklifnoma platformasi. To'y, Osh, Tug'ilgan kun va boshqa tadbirlar uchun professional taklifnomalar yarating.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" className="scroll-smooth">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
