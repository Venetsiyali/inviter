"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { uz } from "@/locales/uz";
import { Sparkles, Smartphone, Globe, Share2, ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Mobile-First Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        Invite.uz
                    </motion.div>
                    <Link
                        href="/auth/login"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all active:scale-95"
                    >
                        {uz.nav.login}
                    </Link>
                </div>
            </header>

            {/* Hero Section - Mobile Optimized */}
            <section className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Sun'iy intellekt yordamida
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        {uz.landing.hero.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {uz.landing.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/auth/signup"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {uz.landing.hero.cta}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Preview Cards - Mobile Swipeable */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {[
                        { title: "To'y", gradient: "from-pink-400 to-rose-600" },
                        { title: "Osh", gradient: "from-emerald-400 to-teal-600" },
                        { title: "Tug'ilgan kun", gradient: "from-blue-400 to-indigo-600" },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="relative h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`} />
                            <div className="relative z-10 h-full flex items-center justify-center">
                                <h3 className="text-3xl font-bold text-white">{card.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {uz.landing.features.title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            icon: Sparkles,
                            title: uz.landing.features.ai.title,
                            description: uz.landing.features.ai.description,
                            color: "blue",
                        },
                        {
                            icon: Smartphone,
                            title: uz.landing.features.mobile.title,
                            description: uz.landing.features.mobile.description,
                            color: "purple",
                        },
                        {
                            icon: Globe,
                            title: uz.landing.features.uzbek.title,
                            description: uz.landing.features.uzbek.description,
                            color: "emerald",
                        },
                        {
                            icon: Share2,
                            title: uz.landing.features.share.title,
                            description: uz.landing.features.share.description,
                            color: "rose",
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works - Mobile-First Steps */}
            <section className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {uz.landing.howItWorks.title}
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {[
                        uz.landing.howItWorks.step1,
                        uz.landing.howItWorks.step2,
                        uz.landing.howItWorks.step3,
                        uz.landing.howItWorks.step4,
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {i + 1}
                            </div>
                            <p className="text-lg font-medium text-gray-900">{step}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center p-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {uz.landing.cta.title}
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        {uz.landing.cta.subtitle}
                    </p>
                    <Link
                        href="/auth/signup"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all active:scale-95 shadow-xl"
                    >
                        {uz.landing.cta.button}
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
                <div className="text-center text-gray-600">
                    <p>© 2026 Invite.uz. Barcha huquqlar himoyalangan.</p>
                </div>
            </footer>
        </div>
    );
}
