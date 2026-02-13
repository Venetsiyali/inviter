import { ReactNode } from "react";

interface MinimalistTemplateProps {
    children: ReactNode;
    eventTitle: string;
    eventDate: string;
    eventTime?: string;
}

export default function MinimalistTemplate({
    children,
    eventTitle,
    eventDate,
    eventTime,
}: MinimalistTemplateProps) {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-24 max-w-4xl">
                {/* Minimalist Header */}
                <div className="text-center mb-20">
                    {/* Simple Line Accent */}
                    <div className="w-16 h-px bg-gray-900 mx-auto mb-12" />

                    <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
                        {eventTitle}
                    </h1>

                    <div className="flex items-center justify-center gap-8 text-gray-600">
                        <time className="text-lg tracking-wide" dateTime={eventDate}>
                            {eventDate}
                        </time>
                        {eventTime && (
                            <>
                                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                                <span className="text-lg tracking-wide">{eventTime}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content Area - Pure Simplicity */}
                <div className="space-y-16">
                    {children}
                </div>

                {/* Minimalist Footer */}
                <div className="mt-24 text-center">
                    <div className="w-16 h-px bg-gray-300 mx-auto mb-8" />
                    <p className="text-sm text-gray-500 tracking-widest uppercase">
                        Invite.uz
                    </p>
                </div>
            </div>
        </div>
    );
}
