"use client";

import { motion } from "framer-motion";
import { CheckCircle, Crown, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function PricingSuccessPage() {
    useEffect(() => {
        // Upgrade the user to PREMIUM in the database
        fetch("/api/user/mock-upgrade", { method: "POST" })
            .then(res => res.json())
            .then(data => console.log("Upgrade status:", data))
            .catch(err => console.error("Failed to mock upgrade:", err));

        // Fire confetti animation on load
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#8B5CF6', '#EC4899', '#FBBF24']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#8B5CF6', '#EC4899', '#FBBF24']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header Gradient */}
                <div className="h-32 bg-gradient-to-r from-violet-600 to-fuchsia-600 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 pattern-grid-lg"></div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl absolute -bottom-10 border-4 border-white"
                    >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="pt-16 pb-8 px-8 text-center">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">
                        To'lovingiz Muvaffaqiyatli!
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-6 text-violet-600 font-semibold bg-violet-50 py-2 px-4 rounded-full inline-flex mx-auto">
                        <Crown className="w-5 h-5" />
                        <span>Premium Statusi</span>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Tabriklaymiz, siz platformamizning barcha imkoniyatlaridan cheksiz foydalanish huquqiga ega bo'ldingiz! Ajoyib taklifnomalar yaratishda davom eting.
                    </p>

                    <div className="space-y-4">
                        <a href="/dashboard" className="block">
                            <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                                Boshqaruv paneliga qaytish
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>

                        <a href="/dashboard/ai-create" className="block text-gray-500 hover:text-gray-900 font-medium py-2 transition-colors">
                            Yangi taklifnoma yaratish
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
