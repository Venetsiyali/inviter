"use client";

import { motion } from "framer-motion";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
            >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Xatolik yuz berdi</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    Sahifani yuklab bo&apos;lmadi. Iltimos sahifani yangilang yoki keyinroq urinib ko&apos;ring.
                </p>
                <button
                    onClick={reset}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-amber-500/20"
                >
                    Qayta Urinish
                </button>
            </motion.div>
        </div>
    );
}
