"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, Check, ChevronRight, ChevronLeft, MapPin, CalendarDays, Type } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

interface EventCreateFormProps {
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        plan: string;
    };
}

const AI_STYLES = [
    { id: "luxury", label: "Hashamatli", icon: "👑", prompt: "luxury premium upscale with gold accents" },
    { id: "minimal", label: "Minimalist", icon: "⚪", prompt: "clean minimal ultra modern empty space" },
    { id: "floral", label: "Romantik", icon: "🌸", prompt: "romantic beautiful watercolor floral pastel" },
    { id: "traditional", label: "O'zbekona", icon: "🇺🇿", prompt: "traditional uzbek adras atlas national patterns" },
];

export default function EventCreateForm({ user }: EventCreateFormProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [aiDesign, setAiDesign] = useState<any>(null);

    const [formData, setFormData] = useState({
        eventType: "wedding",
        title: "",
        date: "",
        location: "",
        venueAddress: "",
        description: "",
    });

    const [selectedAiStyle, setSelectedAiStyle] = useState<string | null>(null);
    const [instantPreviewUrl, setInstantPreviewUrl] = useState<string | null>(null);

    const generatePreview = (styleId: string, eventType: string) => {
        const style = AI_STYLES.find(s => s.id === styleId);
        if (!style) return;

        const typeDesc = eventType === 'wedding' ? 'wedding' :
            eventType === 'birthday' ? 'birthday party' :
                eventType === 'sunnat' ? 'circumcision traditional' : 'event';

        const encodedPrompt = encodeURIComponent(`${style.prompt} ${typeDesc} invitation card portrait`);
        setInstantPreviewUrl(`https://image.pollinations.ai/prompt/${encodedPrompt}?width=576&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000)}`);
    };

    const handleStyleSelect = (styleId: string) => {
        if (selectedAiStyle === styleId) {
            setSelectedAiStyle(null);
            setInstantPreviewUrl(null);
        } else {
            setSelectedAiStyle(styleId);
            generatePreview(styleId, formData.eventType);
        }
    };

    useEffect(() => {
        if (selectedAiStyle) generatePreview(selectedAiStyle, formData.eventType);
    }, [formData.eventType]);

    useEffect(() => {
        const savedDesign = sessionStorage.getItem("ai_selected_design");
        if (savedDesign) {
            try {
                const parsed = JSON.parse(savedDesign);
                setAiDesign(parsed);
                if (parsed.eventType) setFormData(prev => ({ ...prev, eventType: parsed.eventType }));
                if (parsed.description) setFormData(prev => ({ ...prev, description: parsed.description }));
            } catch (e) {
                console.error("Failed to parse saved design");
            }
        }
    }, []);

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const finalDescription = selectedAiStyle
                ? `[Tarjixon Dizayn Uslubi: ${AI_STYLES.find(s => s.id === selectedAiStyle)?.label}] ${formData.description}`
                : formData.description;

            const payload = { ...formData, description: finalDescription, aiDesign };

            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) throw new Error("Sessiya tugagan. Iltimos qayta kiring.");
                if (response.status === 403) throw new Error(data.error || "Bepul rejada faqat 3 ta tadbir mumkin. Premium sotib oling!");
                throw new Error(data.error || "Xatolik yuz berdi. Qayta urinib ko'ring.");
            }

            if (!data.eventId) throw new Error("Server javobida eventId topilmadi. Qayta urinib ko'ring.");

            sessionStorage.removeItem("ai_selected_design");
            window.location.href = `/events/${data.eventId}/edit`;
        } catch (err: any) {
            setError(err.message || "Noma'lum xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className="w-full">
            {/* Progress Bar */}
            <div className="mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
                <div className="absolute top-1/2 left-0 h-1 bg-amber-400 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                <div className="relative flex justify-between">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= num ? 'bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-slate-800 text-white/50 border border-white/10'}`}>
                            {step > num ? <Check className="w-5 h-5" /> : num}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-3 text-xs font-semibold text-white/60">
                    <span className={step >= 1 ? 'text-amber-400' : ''}>Asosiy</span>
                    <span className={step >= 2 ? 'text-amber-400' : ''}>Manzil & Vaqt</span>
                    <span className={step >= 3 ? 'text-amber-400' : ''}>Tasdiqlash</span>
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (step === 3) handleSubmit(e); }} className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[450px] flex flex-col">
                <AnimatePresence mode="wait">
                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                        <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="flex-1 space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Asosiy ma'lumotlar</h2>
                                <p className="text-white/60 text-sm">Taklifnoma turi va sarlavhasini kiriting</p>
                            </div>

                            {/* Pre-selected Template/AI Design Info */}
                            {aiDesign?.imageUrl && (
                                <div className="p-4 bg-black/30 rounded-2xl flex items-center gap-4 border border-white/5">
                                    <div className="w-16 h-20 relative rounded-lg overflow-hidden shrink-0">
                                        {/* @ts-ignore */}
                                        <NextImage src={aiDesign.imageUrl} alt="Design" fill className="object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <div className="text-xs text-green-400 font-bold mb-1 flex items-center gap-1"><Check className="w-3 h-3" /> Tanlangan dizayn</div>
                                        <div className="text-white text-sm font-medium">{aiDesign.style}</div>
                                    </div>
                                </div>
                            )}

                            {/* AI Styling Choices (if no design selected yet) */}
                            {!aiDesign && (
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-white/80 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> AI Uslubni tanlang (Ixtiyoriy)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {AI_STYLES.map(style => (
                                            <button
                                                key={style.id} type="button" onClick={() => handleStyleSelect(style.id)}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${selectedAiStyle === style.id ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
                                            >
                                                <span className="mr-2">{style.icon}</span>{style.label}
                                            </button>
                                        ))}
                                    </div>
                                    {instantPreviewUrl && (
                                        <div className="mt-2 p-3 bg-black/30 rounded-lg flex items-center gap-4 border border-amber-500/20">
                                            <div className="w-12 h-16 rounded overflow-hidden bg-slate-800 shrink-0 shadow-lg bg-cover bg-center" style={{ backgroundImage: `url(${instantPreviewUrl})` }} />
                                            <div className="text-xs text-amber-200/80">Bu uslubning taxminiy ko'rinishi. AI shunga o'xshash qilib yaratadi.</div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-white/80">Tadbir turi</label>
                                    <select value={formData.eventType} onChange={e => setFormData({ ...formData, eventType: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none">
                                        <option className="bg-slate-900" value="wedding">💍 Nikoh to'yi</option>
                                        <option className="bg-slate-900" value="osh">🍲 Osh marosimi</option>
                                        <option className="bg-slate-900" value="birthday">🎂 Tug'ilgan kun</option>
                                        <option className="bg-slate-900" value="sunnat">✨ Sunnat to'yi</option>
                                        <option className="bg-slate-900" value="engagement">💞 Unashtiruv</option>
                                        <option className="bg-slate-900" value="anniversary">🥂 Yubiley</option>
                                        <option className="bg-slate-900" value="other">Boshqa</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-white/80 flex items-center gap-2"><Type className="w-4 h-4" /> Sarlavha *</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Aziza va Bobur" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Location & Time */}
                    {step === 2 && (
                        <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="flex-1 space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Qachon va Qayerda?</h2>
                                <p className="text-white/60 text-sm">Tadbir o'tkazilish waqti va manzilini belgilang</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Sana va Vaqt *</label>
                                <input required type="datetime-local" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50" style={{ colorScheme: "dark" }} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80 flex items-center gap-2"><MapPin className="w-4 h-4" /> To'yxona nomi *</label>
                                <input required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Yakkasaroy to'yxonasi" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">To'liq manzil (Orientir)</label>
                                <input value={formData.venueAddress} onChange={e => setFormData({ ...formData, venueAddress: e.target.value })} placeholder="Bobur ko'chasi 5, Mo'ljal: Aeroport" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Description & Submit */}
                    {step === 3 && (
                        <motion.div key="step3" variants={variants} initial="hidden" animate="visible" exit="exit" className="flex-1 space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Deyarli tayyor</h2>
                                <p className="text-white/60 text-sm">Mehmonlar uchun xabar qoldiring</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/80">Qo'shimcha izoh yoki taklif matni (Ixtiyoriy)</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Barchangizni kutib qolamiz!" rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
                            </div>

                            {/* Summary Card */}
                            <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                <h3 className="text-amber-300 font-bold mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Yakuniy ma'lumotlar</h3>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li><strong>Sarlavha:</strong> {formData.title || "Kiritilmagan"}</li>
                                    <li><strong>Sana:</strong> {formData.date ? new Date(formData.date).toLocaleString('uz-UZ') : "Kiritilmagan"}</li>
                                    <li><strong>Joy:</strong> {formData.location || "Kiritilmagan"}</li>
                                </ul>
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                                    {error}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-auto pt-8 flex gap-3">
                    {step > 1 && (
                        <button type="button" onClick={handlePrev} className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={() => {
                                // Basic validation before next
                                if (step === 1 && !formData.title) { setError("Sarlavha kiritish majburiy!"); return; }
                                if (step === 2 && (!formData.date || !formData.location)) { setError("Sana va To'yxona nomi majburiy!"); return; }
                                setError("");
                                handleNext();
                            }}
                            className="flex-1 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                        >
                            Keyingisi <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Yaratilmoqda...</>
                            ) : (
                                <><Sparkles className="w-5 h-5" /> Taklifnomani Yaratish</>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
