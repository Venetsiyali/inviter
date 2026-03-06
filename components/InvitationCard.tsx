"use client";

import { DesignConfig } from "@/lib/ai/design-generator";

interface InvitationCardProps {
    event: {
        title: string;
        type: string;
        date: Date;
        location: string | null;
        description: string | null;
    };
    design: DesignConfig;
}

export default function InvitationCard({ event, design }: InvitationCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const eventTypeNames: Record<string, string> = {
        wedding: "To'y",
        birthday: "Tug'ilgan kun",
        engagement: "Fotiha to'yi",
        osh: "Osh",
        lutf: "Lutf",
        circumcision: "Sunnat to'yi",
        anniversary: "Yubiley",
        corporate: "Korporativ",
        other: "Tadbir",
    };

    // Handle new Pollinations Image-based AI designs
    if ("imageUrl" in design && (design as any).imageUrl) {
        return (
            <div className="max-w-2xl text-white mx-auto rounded-3xl shadow-2xl overflow-hidden relative" style={{ aspectRatio: '9/16' }}>
                <img src={(design as any).imageUrl} alt="Invitation Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-medium uppercase tracking-wider mb-3 text-white/80" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>{eventTypeNames[event.type] || "Tadbir"}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)", fontFamily: "serif" }}>
                        {event.title}
                    </h1>
                    <div className="w-12 h-1 bg-white/50 mb-6 rounded-full" />
                    <p className="text-lg font-semibold mb-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>Sana va vaqt</p>
                    <p className="text-xl font-bold mb-6 text-yellow-300" style={{ textShadow: "0 2px 6px rgba(0,0,0,1)" }}>{formattedDate}</p>

                    {event.location && (
                        <>
                            <p className="text-lg font-semibold mb-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>Manzil</p>
                            <p className="text-lg mb-6" style={{ textShadow: "0 1px 6px rgba(0,0,0,1)" }}>{event.location}</p>
                        </>
                    )}

                    {event.description && (
                        <p className="text-sm italic opacity-90 leading-relaxed mt-4 max-w-sm" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{event.description}</p>
                    )}
                </div>
            </div>
        );
    }

    const safeDesign = {
        colorPalette: {
            background: design?.colorPalette?.background || "#ffffff",
            text: design?.colorPalette?.text || "#1a1a1a",
            primary: design?.colorPalette?.primary || "#4F46E5",
            secondary: design?.colorPalette?.secondary || "#818CF8",
            accent: design?.colorPalette?.accent || "#FBBF24"
        },
        typography: {
            primaryFont: design?.typography?.primaryFont || "serif",
            secondaryFont: design?.typography?.secondaryFont || "sans-serif",
            fontWeights: {
                heading: design?.typography?.fontWeights?.heading || 700,
                body: design?.typography?.fontWeights?.body || 400
            }
        },
        patterns: {
            style: design?.patterns?.style || "minimal"
        }
    };

    return (
        <div
            className="max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
            style={{
                backgroundColor: safeDesign.colorPalette.background,
                color: safeDesign.colorPalette.text,
            }}
        >
            {/* Header Pattern */}
            <div
                className="h-32 relative"
                style={{
                    background: `linear-gradient(135deg, ${design.colorPalette.primary} 0%, ${design.colorPalette.secondary} 100%)`,
                }}
            >
                <div className="absolute inset-0 opacity-20">
                    <UzbekPattern style={design.patterns.style} />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-8">
                {/* Event Type */}
                <div className="text-center">
                    <p
                        className="text-sm font-medium uppercase tracking-wider mb-2"
                        style={{
                            color: design.colorPalette.secondary,
                            fontFamily: design.typography.secondaryFont,
                        }}
                    >
                        {eventTypeNames[event.type] || "Tadbir"}
                    </p>

                    {/* Title */}
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{
                            fontFamily: design.typography.primaryFont,
                            fontWeight: design.typography.fontWeights.heading,
                            color: design.colorPalette.primary,
                        }}
                    >
                        {event.title}
                    </h1>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center gap-4">
                    <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: design.colorPalette.accent }}
                    />
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: design.colorPalette.accent }}
                    />
                    <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: design.colorPalette.accent }}
                    />
                </div>

                {/* Details */}
                <div
                    className="space-y-6 text-center"
                    style={{
                        fontFamily: design.typography.secondaryFont,
                        fontWeight: design.typography.fontWeights.body,
                    }}
                >
                    {/* Date */}
                    <div className="space-y-2">
                        <p className="text-sm opacity-70">Sana va vaqt</p>
                        <p className="text-xl font-semibold">{formattedDate}</p>
                    </div>

                    {/* Location */}
                    {event.location && (
                        <div className="space-y-2">
                            <p className="text-sm opacity-70">Joylashuv</p>
                            <p className="text-xl font-semibold">{event.location}</p>
                        </div>
                    )}

                    {/* Description */}
                    {event.description && (
                        <div className="space-y-2 pt-4">
                            <p className="text-base leading-relaxed opacity-90">
                                {event.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Pattern */}
                <div className="pt-8">
                    <div
                        className="h-2 rounded-full mx-auto w-32"
                        style={{
                            background: `linear-gradient(90deg, ${design.colorPalette.primary}, ${design.colorPalette.accent}, ${design.colorPalette.secondary})`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Simple Uzbek pattern component
function UzbekPattern({ style }: { style: string }) {
    if (style === "minimal") {
        return (
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle cx="50" cy="20" r="2" fill="currentColor" />
                <circle cx="80" cy="20" r="2" fill="currentColor" />
                <circle cx="20" cy="50" r="2" fill="currentColor" />
                <circle cx="50" cy="50" r="2" fill="currentColor" />
                <circle cx="80" cy="50" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
                <circle cx="50" cy="80" r="2" fill="currentColor" />
                <circle cx="80" cy="80" r="2" fill="currentColor" />
            </svg>
        );
    }

    // Uzbek adras/atlas style
    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
                <pattern id="uzbekPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                        d="M20 0 L30 10 L20 20 L10 10 Z"
                        fill="currentColor"
                        opacity="0.3"
                    />
                    <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5" />
                </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#uzbekPattern)" />
        </svg>
    );
}
