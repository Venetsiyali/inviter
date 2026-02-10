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

    return (
        <div
            className="max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
            style={{
                backgroundColor: design.colorPalette.background,
                color: design.colorPalette.text,
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
