import { ReactNode } from "react";

interface MilliyTemplateProps {
    children: ReactNode;
    eventTitle: string;
    eventDate: string;
    eventTime?: string;
}

export default function MilliyTemplate({
    children,
    eventTitle,
    eventDate,
    eventTime,
}: MilliyTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50">
            {/* Traditional Uzbek Pattern Border */}
            <div className="w-full h-4 bg-gradient-to-r from-yellow-600 via-green-600 to-yellow-600" />

            <div className="container mx-auto px-4 py-12">
                {/* Header with Traditional Ornament */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        {/* Ornamental SVG Pattern */}
                        <svg className="w-32 h-32 mx-auto mb-6 text-yellow-600" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M 50 10 L 55 45 L 50 50 L 45 45 Z" />
                            <path d="M 90 50 L 55 55 L 50 50 L 55 45 Z" />
                            <path d="M 50 90 L 45 55 L 50 50 L 55 55 Z" />
                            <path d="M 10 50 L 45 45 L 50 50 L 45 55 Z" />
                            <circle cx="50" cy="50" r="8" />
                        </svg>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-green-700 to-yellow-700">
                        {eventTitle}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-xl text-gray-700">
                        <span className="font-semibold">{eventDate}</span>
                        {eventTime && (
                            <>
                                <span className="text-yellow-600">•</span>
                                <span className="font-semibold">{eventTime}</span>
                            </>
                        )}
                    </div>

                    {/* Traditional Quote */}
                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="border-t-2 border-b-2 border-yellow-600/30 py-4">
                            <p className="text-lg italic text-gray-700 font-serif">
                                "Baxt — bu birgalikda bo&apos;lgan daqiqalar"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Area with Traditional Frame */}
                <div className="max-w-6xl mx-auto">
                    <div className="border-4 border-yellow-600/20 rounded-3xl bg-white/80 backdrop-blur-sm p-2">
                        <div className="border-2 border-green-600/20 rounded-2xl p-8 space-y-8">
                            {children}
                        </div>
                    </div>
                </div>

                {/* Footer Ornament */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-yellow-600" />
                        <svg className="w-8 h-8 text-yellow-600" viewBox="0 0 40 40" fill="currentColor">
                            <circle cx="20" cy="20" r="3" />
                            <circle cx="10" cy="20" r="2" opacity="0.6" />
                            <circle cx="30" cy="20" r="2" opacity="0.6" />
                        </svg>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-yellow-600" />
                    </div>
                </div>
            </div>

            <div className="w-full h-4 bg-gradient-to-r from-yellow-600 via-green-600 to-yellow-600" />
        </div>
    );
}
