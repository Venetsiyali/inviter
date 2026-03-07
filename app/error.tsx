"use client";

import Link from "next/link";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-7xl mb-6">⚠️</div>
                <h1 className="text-2xl font-bold text-white mb-3">Xatolik yuz berdi</h1>
                <p className="text-white/50 mb-8 max-w-sm mx-auto">
                    Nimadir noto'g'ri ketdi. Iltimos, qayta urinib ko'ring.
                </p>
                <div className="flex gap-3 justify-center">
                    <button onClick={reset} className="gradient-btn !py-3 !px-6 !text-sm">
                        Qayta urinish
                    </button>
                    <Link href="/" className="py-3 px-6 rounded-full border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors">
                        Bosh sahifa
                    </Link>
                </div>
            </div>
        </div>
    );
}
