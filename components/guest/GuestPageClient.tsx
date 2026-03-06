"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, ChevronDown, MapPin, Share2, Navigation } from "lucide-react";
import RSVPBlock from "@/components/guest/RSVPBlock";
import LocationBlock from "@/components/guest/LocationBlock";
import GiftBlock from "@/components/guest/GiftBlock";
import MediaGallery from "@/components/guest/MediaGallery";
import { fadeUp, staggerContainer, fadeUpItem } from "@/lib/animations";

interface GuestPageClientProps {
    event: any;
    formattedDate: string;
    venueName?: string;
    venueAddress?: string;
    latitude?: number;
    longitude?: number;
    hostName: string;
    cardNumber?: string;
    cardHolder?: string;
    content: any;
    design: any;
}

export default function GuestPageClient({
    event,
    formattedDate,
    venueName,
    venueAddress,
    latitude,
    longitude,
    hostName,
    cardNumber,
    cardHolder,
    content,
    design,
}: GuestPageClientProps) {
    const primaryColor = design?.primaryColor || "#F59E0B";
    const secondaryColor = design?.secondaryColor || "#0F1B2D";
    const fontFamily = design?.fontFamily || "var(--font-serif)";

    // Countdown logic
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        if (!event.date) return;
        const targetDate = new Date(event.date).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft(null);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [event.date]);

    // Handle scroll to details
    const scrollToDetails = () => {
        document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className="min-h-screen font-sans selection:bg-amber-500/30"
            style={{ backgroundColor: secondaryColor, color: "#ffffff" }}
        >
            {/* Desktop wrapper to restrict width to mobile size (max-w-md) */}
            <div className="max-w-[480px] mx-auto min-h-screen bg-black/40 shadow-2xl relative overflow-x-hidden">

                {/* ═══ 1. HERO SECTION ═══ */}
                <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                    {/* Animated geometric background pattern */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l1.373 1.373v57.254l-1.373 1.373h-49.254l-1.373-1.373v-57.254l1.373-1.373h49.254zm-49.254 2.746v54.508h49.254v-54.508h-49.254zm24.627 10.655l20.449 20.449-20.449 20.449-20.449-20.449 20.449-20.449z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: "60px 60px"
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 w-full"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/70 italic mb-6 text-sm tracking-widest"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Siz hurmat bilan taklif etilasiz
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-6xl font-black mb-6 leading-[1.1]"
                            style={{ fontFamily, color: primaryColor }}
                        >
                            {event.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center justify-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/50" />
                            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: primaryColor }} />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/50" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-10"
                        >
                            {content?.eventType || event.type}
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.button
                        onClick={scrollToDetails}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors z-20"
                    >
                        <ChevronDown className="w-5 h-5 text-white/50" />
                    </motion.button>
                </section>

                <div id="details" className="px-5 pb-20 space-y-6">
                    {/* ═══ 2. DATE & DETAILS CARD ═══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[24px] p-6 shadow-2xl shadow-black/20 text-slate-800 relative overflow-hidden"
                    >
                        {/* Decorative top border */}
                        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: primaryColor }} />

                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                <Calendar className="w-6 h-6" style={{ color: primaryColor }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{formattedDate}</h3>
                                {event.time && <p className="text-slate-500 font-medium">{event.time} da boshlanadi</p>}

                                {/* Countdown */}
                                {timeLeft && (
                                    <div className="mt-4 flex gap-2">
                                        {[
                                            { v: timeLeft.d, l: 'Kun' },
                                            { v: timeLeft.h, l: 'Soat' },
                                            { v: timeLeft.m, l: 'Daq' },
                                            { v: timeLeft.s, l: 'Son' }
                                        ].map((t, idx) => (
                                            <div key={idx} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
                                                <div className="text-xl font-black font-mono leading-none mb-1" style={{ color: primaryColor }}>
                                                    {t.v.toString().padStart(2, '0')}
                                                </div>
                                                <div className="text-[9px] uppercase font-bold text-slate-400">{t.l}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {event.description && (
                            <div className="pt-5 border-t border-slate-100">
                                <p className="text-sm text-slate-600 leading-relaxed text-center italic font-serif">
                                    "{event.description}"
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* ═══ 3. LOCATION & MAP ═══ */}
                    {(venueName || venueAddress) && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[24px] p-2 shadow-2xl shadow-black/20 text-slate-800"
                        >
                            {/* We wrap LocationBlock so we keep its map logic but styling matches inside this wrapper */}
                            <LocationBlock
                                venueName={venueName}
                                address={venueAddress}
                                latitude={latitude}
                                longitude={longitude}
                            />
                        </motion.div>
                    )}

                    {/* ═══ 4. RSVP FORM ═══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[24px] p-2 shadow-2xl shadow-black/20 text-slate-800"
                    >
                        <RSVPBlock eventId={event.id} eventTitle={event.title} />
                    </motion.div>

                    {/* ═══ 5. GIFT SECTION ═══ */}
                    {event.giftEnabled && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[24px] p-2 shadow-2xl shadow-black/20 text-slate-800"
                        >
                            <GiftBlock
                                hostName={hostName}
                                cardNumber={cardNumber}
                                cardHolder={cardHolder}
                                primaryColor={primaryColor}
                            />
                        </motion.div>
                    )}

                    {/* ═══ 6. PHOTO GALLERY ═══ */}
                    {event.photoEnabled && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[24px] p-2 shadow-2xl shadow-black/20 text-slate-800"
                        >
                            <MediaGallery
                                eventId={event.id}
                                initialPhotos={event.mediaUploads.map((m: any) => ({
                                    id: m.id,
                                    imageUrl: m.imageUrl,
                                    uploaderName: m.uploaderName,
                                    caption: m.caption || undefined,
                                }))}
                                primaryColor={primaryColor}
                            />
                        </motion.div>
                    )}
                </div>

                {/* ═══ FOOTER ═══ */}
                <div className="py-8 text-center text-white/40 text-xs">
                    <p>inviter.uz orqali yaratildi</p>
                    <a href="/" target="_blank" className="mt-2 inline-block font-semibold text-white/60 hover:text-white">
                        Siz ham taklifnoma yarating →
                    </a>
                </div>
            </div>
        </div>
    );
}
