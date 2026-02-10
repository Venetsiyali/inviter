"use client";

import { GeneratedInvitation } from "@/lib/ai/gemini";
import { getPatternSVG } from "@/lib/design/patterns";
import { useEffect } from "react";

interface InvitationRendererProps {
    invitation: GeneratedInvitation;
    className?: string;
}

/**
 * Mukammal taklifnoma renderer - Mobile-first
 * AI generatsiya qilgan dizayn va matnni ko'rsatadi
 */
export function InvitationRenderer({
    invitation,
    className = "",
}: InvitationRendererProps) {
    const { content, design } = invitation;

    // Google Fonts yuklash
    useEffect(() => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${design.typography.primaryFont.replace(/ /g, "+")}:wght@${design.typography.fontWeights.heading}&family=${design.typography.secondaryFont.replace(/ /g, "+")}:wght@${design.typography.fontWeights.body}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [design.typography]);

    // CSS Variables for dynamic theming
    const cssVariables = {
        "--color-primary": design.colorPalette.primary,
        "--color-secondary": design.colorPalette.secondary,
        "--color-accent": design.colorPalette.accent,
        "--color-bg": design.colorPalette.background,
        "--color-text": design.colorPalette.text,
        "--color-text-secondary": design.colorPalette.textSecondary,
        "--font-primary": design.typography.primaryFont,
        "--font-secondary": design.typography.secondaryFont,
        "--pattern-opacity": design.pattern.opacity,
        "--pattern-color": design.pattern.color,
    } as React.CSSProperties;

    return (
        <div
            className={`invitation-container ${className}`}
            style={cssVariables}
        >
            {/* SVG Pattern Definition */}
            <svg width="0" height="0" className="absolute">
                <defs dangerouslySetInnerHTML={{ __html: getPatternSVG(design.pattern.style) }} />
            </svg>

            {/* Main Invitation Card */}
            <div
                className={`relative mx-auto ${design.effects.borderRadius} overflow-hidden`}
                style={{
                    maxWidth: design.layout.containerMaxWidth,
                    backgroundColor: design.colorPalette.background,
                    boxShadow: getShadow(design.effects.shadow),
                }}
            >
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E${encodeURIComponent(getPatternSVG(design.pattern.style))}%3C/svg%3E")`,
                        opacity: design.pattern.opacity,
                        color: design.pattern.color,
                    }}
                />

                {/* Gradient Overlay */}
                {design.effects.gradientOverlay && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `linear-gradient(135deg, ${design.colorPalette.primary}08 0%, ${design.colorPalette.secondary}08 100%)`,
                        }}
                    />
                )}

                {/* Content */}
                <div
                    className={`relative z-10 p-6 md:p-10 lg:p-12 ${getSpacingClass(design.layout.spacing)}`}
                >
                    {/* Layout: Centered */}
                    {design.layout.type === "centered" && (
                        <div className="text-center space-y-6">
                            <Header content={content} design={design} />
                            <MainContent content={content} design={design} />
                            <EventDetails content={content} design={design} />
                            <Footer content={content} design={design} />
                        </div>
                    )}

                    {/* Layout: Elegant Left */}
                    {design.layout.type === "elegant-left" && (
                        <div className="text-left space-y-6 max-w-2xl">
                            <Header content={content} design={design} />
                            <MainContent content={content} design={design} />
                            <EventDetails content={content} design={design} />
                            <Footer content={content} design={design} />
                        </div>
                    )}

                    {/* Layout: Modern Grid */}
                    {design.layout.type === "modern-grid" && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <Header content={content} design={design} />
                                <MainContent content={content} design={design} />
                            </div>
                            <div className="space-y-6">
                                <EventDetails content={content} design={design} />
                                <Footer content={content} design={design} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile-First Responsive Styles */}
            <style jsx>{`
        .invitation-container {
          font-family: var(--font-secondary), sans-serif;
          color: var(--color-text);
        }
      `}</style>
        </div>
    );
}

/**
 * Header Component
 */
function Header({ content, design }: { content: any; design: any }) {
    return (
        <div className="space-y-3">
            <h1
                style={{
                    fontFamily: `var(--font-primary), serif`,
                    fontSize: design.typography.fontSizes.title,
                    fontWeight: design.typography.fontWeights.heading,
                    color: design.colorPalette.primary,
                    lineHeight: 1.2,
                }}
            >
                {content.title}
            </h1>
            {content.subtitle && (
                <h2
                    style={{
                        fontFamily: `var(--font-primary), serif`,
                        fontSize: design.typography.fontSizes.subtitle,
                        fontWeight: design.typography.fontWeights.body,
                        color: design.colorPalette.secondary,
                        lineHeight: 1.4,
                    }}
                >
                    {content.subtitle}
                </h2>
            )}
        </div>
    );
}

/**
 * Main Content Component
 */
function MainContent({ content, design }: { content: any; design: any }) {
    return (
        <div className="space-y-4">
            <p
                style={{
                    fontSize: design.typography.fontSizes.body,
                    fontWeight: design.typography.fontWeights.heading,
                    color: design.colorPalette.text,
                }}
            >
                {content.greeting}
            </p>
            <p
                style={{
                    fontSize: design.typography.fontSizes.body,
                    lineHeight: 1.8,
                    color: design.colorPalette.textSecondary,
                }}
            >
                {content.mainText}
            </p>
        </div>
    );
}

/**
 * Event Details Component
 */
function EventDetails({ content, design }: { content: any; design: any }) {
    return (
        <div
            className="p-6 rounded-xl border-2"
            style={{
                borderColor: `${design.colorPalette.primary}40`,
                backgroundColor: `${design.colorPalette.primary}05`,
            }}
        >
            <div className="space-y-3">
                <DetailRow
                    icon="📅"
                    label="Sana"
                    value={content.eventDetails.date}
                    design={design}
                />
                <DetailRow
                    icon="🕐"
                    label="Vaqt"
                    value={content.eventDetails.time}
                    design={design}
                />
                <DetailRow
                    icon="📍"
                    label="Manzil"
                    value={content.eventDetails.location}
                    design={design}
                />
                {content.eventDetails.dresscode && (
                    <DetailRow
                        icon="👔"
                        label="Kiyim kodi"
                        value={content.eventDetails.dresscode}
                        design={design}
                    />
                )}
            </div>
        </div>
    );
}

/**
 * Detail Row Component
 */
function DetailRow({
    icon,
    label,
    value,
    design,
}: {
    icon: string;
    label: string;
    value: string;
    design: any;
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
                <div
                    className="text-sm font-medium mb-1"
                    style={{ color: design.colorPalette.textSecondary }}
                >
                    {label}
                </div>
                <div
                    className="font-medium break-words"
                    style={{ color: design.colorPalette.text }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}

/**
 * Footer Component
 */
function Footer({ content, design }: { content: any; design: any }) {
    return (
        <div className="space-y-4 pt-6 border-t" style={{ borderColor: `${design.colorPalette.primary}20` }}>
            <p
                style={{
                    fontSize: design.typography.fontSizes.body,
                    color: design.colorPalette.text,
                    fontWeight: design.typography.fontWeights.heading,
                }}
            >
                {content.closingText}
            </p>

            {content.hosts && (
                <div className="text-center">
                    <p style={{ color: design.colorPalette.textSecondary }} className="text-sm mb-2">
                        Hurmat bilan:
                    </p>
                    <p
                        style={{
                            fontFamily: `var(--font-primary), serif`,
                            color: design.colorPalette.primary,
                            fontSize: "1.125rem",
                            fontWeight: design.typography.fontWeights.heading,
                        }}
                    >
                        {content.hosts.names.join(" va ")}
                    </p>
                    {content.hosts.contactInfo && (
                        <p style={{ color: design.colorPalette.textSecondary }} className="text-sm mt-2">
                            {content.hosts.contactInfo}
                        </p>
                    )}
                </div>
            )}

            {content.footerText && (
                <p
                    className="text-sm text-center"
                    style={{ color: design.colorPalette.textSecondary }}
                >
                    {content.footerText}
                </p>
            )}
        </div>
    );
}

/**
 * Helper Functions
 */
function getShadow(level: string): string {
    const shadows = {
        soft: "0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        medium: "0 4px 16px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        strong: "0 8px 32px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.12)",
    };
    return shadows[level as keyof typeof shadows] || shadows.medium;
}

function getSpacingClass(spacing: string): string {
    const spacings = {
        compact: "space-y-4",
        comfortable: "space-y-6",
        spacious: "space-y-8",
    };
    return spacings[spacing as keyof typeof spacings] || spacings.comfortable;
}
