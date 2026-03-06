"use client";

import { MapPin, Navigation, ExternalLink, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface LocationBlockProps {
    venueName?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
}

export default function LocationBlock({
    venueName,
    address,
    latitude,
    longitude,
}: LocationBlockProps) {
    const hasCoordinates = latitude && longitude;

    const googleMapsUrl = hasCoordinates
        ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
        : null;

    const yandexMapsUrl = hasCoordinates
        ? `https://yandex.uz/maps/?ll=${longitude},${latitude}&z=16&pt=${longitude},${latitude}`
        : null;

    const handleShare = async () => {
        const shareData = {
            title: venueName || "To'yxona manzili",
            text: `${venueName || "Manzil"} — ${address || ""}`,
            url: googleMapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(address || venueName || "")}`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled share
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(shareData.url);
            toast.success("Manzil havolasi nusxalandi!", {
                style: {
                    background: '#1e293b',
                    color: '#fff',
                    borderRadius: '12px',
                },
                iconTheme: {
                    primary: '#f59e0b',
                    secondary: '#1e293b',
                },
            });
        }
    };

    return (
        <div className="rounded-[20px] overflow-hidden">
            {/* Embedded Google Maps */}
            {hasCoordinates && (
                <div className="w-full h-[220px] relative">
                    <iframe
                        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="To'yxona xaritasi"
                        className="w-full h-full"
                    />
                    {/* Gradient overlay at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                </div>
            )}

            <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Manzil</h2>
                        <p className="text-gray-500 text-sm">To&apos;yxona joylashuvi</p>
                    </div>
                </div>

                {/* Venue Name */}
                {venueName && (
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{venueName}</h3>
                )}

                {/* Address */}
                {address && (
                    <p className="text-gray-600 leading-relaxed mb-6">{address}</p>
                )}

                {/* Navigation Buttons */}
                {hasCoordinates ? (
                    <div className="space-y-3">
                        {/* Google Maps - Direction link */}
                        <a
                            href={googleMapsUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <Navigation className="w-5 h-5" />
                            Google Maps — Yo&apos;l ko&apos;rsatish
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                        </a>

                        {/* Yandex Maps */}
                        <a
                            href={yandexMapsUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                        >
                            <Navigation className="w-5 h-5" />
                            Yandex Maps — Yo&apos;l ko&apos;rsatish
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                        </a>

                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Manzilni ulashish
                        </button>
                    </div>
                ) : address ? (
                    <div className="space-y-3">
                        {/* Fallback: search by address name */}
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <Navigation className="w-5 h-5" />
                            Google Maps da qidirish
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                        </a>

                        <a
                            href={`https://yandex.uz/maps/?text=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                        >
                            <Navigation className="w-5 h-5" />
                            Yandex Maps da qidirish
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                        </a>

                        <button
                            onClick={handleShare}
                            className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Manzilni ulashish
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                            Koordinatalar hali qo&apos;shilmagan
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
