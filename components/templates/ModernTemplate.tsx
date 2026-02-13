import { ReactNode } from "react";

interface ModernTemplateProps {
    children: ReactNode;
    eventTitle: string;
    eventDate: string;
    eventTime?: string;
}

export default function ModernTemplate({
    children,
    eventTitle,
    eventDate,
    eventTime,
}: ModernTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Floating Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            <div className="relative container mx-auto px-4 py-16">
                {/* Modern Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                        </div>
                        <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 leading-tight">
                        {eventTitle}
                    </h1>

                    <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full shadow-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full" />
                            <span className="text-lg font-semibold text-gray-800">{eventDate}</span>
                        </div>
                        {eventTime && (
                            <>
                                <div className="w-px h-6 bg-gray-300" />
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span className="text-lg font-semibold text-gray-800">{eventTime}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Content Area with Modern Glass Effect */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
                        {children}
                    </div>
                </div>

                {/* Modern Footer */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col items-center gap-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                            Created with ❤️ using AI
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
