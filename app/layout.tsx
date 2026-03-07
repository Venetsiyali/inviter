import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
    title: {
        default: "inviter.uz — Raqamli taklifnomalar platformasi",
        template: "%s | inviter.uz",
    },
    description:
        "To'y, osh, tug'ilgan kun va barcha marosimlar uchun chiroyli raqamli taklifnomalar yarating. QR kod, xarita, hadya va rasm galereyasi — barchasi bir joyda.",
    keywords: [
        "taklifnoma", "online taklifnoma", "raqamli taklifnoma",
        "to'y taklifnomasi", "osh taklifnomasi", "QR kod taklifnoma",
        "inviter.uz", "O'zbekiston",
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://inviter.uz"),
    openGraph: {
        title: "inviter.uz — Raqamli taklifnomalar platformasi",
        description: "To'y, osh, tug'ilgan kun uchun chiroyli online taklifnomalar yarating. Bepul boshlang!",
        url: "https://inviter.uz",
        siteName: "inviter.uz",
        locale: "uz_UZ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "inviter.uz — Raqamli taklifnomalar",
        description: "Marosimlar uchun zamonaviy online taklifnomalar platformasi",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#1a1a2e",
                            color: "#fff",
                            borderRadius: "12px",
                            fontSize: "14px",
                            padding: "12px 20px",
                        },
                    }}
                />
            </body>
        </html>
    );
}
