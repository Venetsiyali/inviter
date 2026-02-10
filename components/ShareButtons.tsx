"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
    url: string;
    title: string;
    date: string;
    location: string;
}

export default function ShareButtons({ url, title, date, location }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareText = `Sizni ${title} tadbiriga taklif qilamiz!\n📅 Sana: ${date}\n📍 Joylashuv: ${location}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const shareToTelegram = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
        window.open(telegramUrl, "_blank");
    };

    const shareToWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + url)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, "_blank");
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Share2 className="w-4 h-4" />
                <span>Ulashish:</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button
                    variant="outline"
                    onClick={shareToTelegram}
                    className="w-full bg-[#0088cc] text-white hover:bg-[#0077b3] border-0"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                    </svg>
                    Telegram
                </Button>

                <Button
                    variant="outline"
                    onClick={shareToWhatsApp}
                    className="w-full bg-[#25D366] text-white hover:bg-[#1da851] border-0"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                </Button>

                <Button
                    variant="outline"
                    onClick={shareToFacebook}
                    className="w-full bg-[#1877F2] text-white hover:bg-[#0c63d4] border-0"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                </Button>

                <Button
                    variant="outline"
                    onClick={copyLink}
                    className="w-full"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 mr-2 text-green-600" />
                            Nusxa olindi!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4 mr-2" />
                            Havola nusxalash
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
