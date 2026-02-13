"use client";

import { MapPin, Navigation } from "lucide-react";

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

    const openYandexMaps = () => {
        if (!hasCoordinates) return;
        const url = `https://yandex.uz/maps/?pt=${longitude},${latitude}&z=16&l=map`;
        window.open(url, "_blank");
    };

    const openGoogleMaps = () => {
        if (!hasCoordinates) return;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, "_blank");
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Manzil</h2>
                    <p className="text-gray-600">To&apos;yxona joylashuvi</p>
                </div>
            </div>

            {venueName && (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{venueName}</h3>
                </div>
            )}

            {address && (
                <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">{address}</p>
                </div>
            )}

            {hasCoordinates ? (
                <div className="space-y-3">
                    <button
                        onClick={openYandexMaps}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Navigation className="w-5 h-5" />
                        Yandex Xaritada Ko&apos;rish
                    </button>
                    <button
                        onClick={openGoogleMaps}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Navigation className="w-5 h-5" />
                        Google Xaritada Ko&apos;rish
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
    );
}
