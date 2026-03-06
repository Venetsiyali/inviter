"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, Image as ImageIcon, Check } from "lucide-react";

interface EventCreateFormProps {
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        plan: string;
    };
}

export default function EventCreateForm({ user }: EventCreateFormProps) {
    const router = useRouter();
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

    // New AI styling options
    const [selectedAiStyle, setSelectedAiStyle] = useState<string | null>(null);
    const [instantPreviewUrl, setInstantPreviewUrl] = useState<string | null>(null);

    const AI_STYLES = [
        { id: "luxury", label: "Hashamatli", icon: "👑", prompt: "luxury premium upscale with gold accents" },
        { id: "minimal", label: "Minimalist", icon: "⚪", prompt: "clean minimal ultra modern empty space" },
        { id: "floral", label: "Romantik", icon: "🌸", prompt: "romantic beautiful watercolor floral pastel" },
        { id: "traditional", label: "O'zbekona", icon: "🇺🇿", prompt: "traditional uzbek adras atlas national patterns" },
    ];

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

    // Update preview if event type changes while a style is selected
    useEffect(() => {
        if (selectedAiStyle) generatePreview(selectedAiStyle, formData.eventType);
    }, [formData.eventType]);

    useEffect(() => {
        // Load the AI design that the user selected in the previous step
        const savedDesign = sessionStorage.getItem("ai_selected_design");
        if (savedDesign) {
            try {
                const parsed = JSON.parse(savedDesign);
                setAiDesign(parsed);
                if (parsed.eventType) {
                    setFormData((prev) => ({ ...prev, eventType: parsed.eventType }));
                }
                if (parsed.description) {
                    setFormData((prev) => ({ ...prev, description: parsed.description }));
                }
            } catch (e) {
                console.error("Failed to parse saved design");
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Pre-fill description with requested AI style so Gemini picks it up
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
                throw new Error(data.error || "Xatolik yuz berdi");
            }

            // Clear session storage properly
            sessionStorage.removeItem("ai_selected_design");

            // Redirect to event editor/preview
            router.push(`/events/${data.eventId}/edit`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">

                {/* AI Design Preview Block */}
                {aiDesign?.imageUrl && (
                    <div className="mb-8 p-4 bg-black/20 rounded-2xl flex flex-col sm:flex-row items-center gap-6 border border-white/10">
                        <div className="w-24 h-32 shrink-0 rounded-xl overflow-hidden relative shadow-lg">
                            <img src={aiDesign.imageUrl} alt="Selected design" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-2 border border-green-500/30">
                                <Check className="w-3.5 h-3.5" /> Tanlangan {aiDesign.fromCanvas ? 'shablon' : 'AI Dizayn'}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">{aiDesign.style}</h3>
                            {aiDesign.prompt && (
                                <p className="text-white/60 text-sm line-clamp-2 italic">"{aiDesign.prompt}"</p>
                            )}
                        </div>
                    </div>
                )}

                {/* 1-Click AI Styling Preferences (Shown only if no template is pre-selected) */}
                {!aiDesign && (
                    <div className="mb-8 p-6 bg-purple-900/20 border border-purple-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-white font-semibold flex-1">Sun'iy Intellekt dizayni (1 marta bosish)</h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">Taklifnomangiz qanday uslubda bo'lishini hohlaysiz? Tanlang va natijani darhol ko'ring!</p>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {AI_STYLES.map(style => (
                                <button
                                    key={style.id}
                                    type="button"
                                    onClick={() => handleStyleSelect(style.id)}
                                    className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${selectedAiStyle === style.id
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 border border-transparent"
                                        : "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <span>{style.icon}</span>
                                    {style.label}
                                </button>
                            ))}
                        </div>

                        {instantPreviewUrl && (
                            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/5 flex gap-6 items-center">
                                <div className="w-24 h-36 bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl flex-shrink-0 animate-pulse bg-cover"
                                    style={{ backgroundImage: `url(${instantPreviewUrl})` }} />
                                <div>
                                    <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-400" /> Ajoyib tanlov!
                                    </h4>
                                    <p className="text-white/60 text-sm">
                                        Yuqoridagi rasm sizning taklifnomangizning taxminiy ko'rinishidir. "Taklifnomani yaratish" tugmasini bossangiz AI uni aynan shu uslubda tayyorlaydi.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Event Type */}
                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="eventType" className="text-sm font-medium text-white/80">
                            Tadbir turi
                        </label>
                        <select
                            id="eventType"
                            value={formData.eventType}
                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 appearance-none cursor-pointer transition-all"
                        >
                            <option className="bg-slate-900 text-white" value="wedding">💍 Nikoh to'yi</option>
                            <option className="bg-slate-900 text-white" value="osh">🍲 Osh marosimi</option>
                            <option className="bg-slate-900 text-white" value="birthday">🎂 Tug'ilgan kun</option>
                            <option className="bg-slate-900 text-white" value="sunnat">✨ Sunnat to'yi</option>
                            <option className="bg-slate-900 text-white" value="engagement">💞 Unashtiruv (Fotiha)</option>
                            <option className="bg-slate-900 text-white" value="anniversary">🥂 Yubiley</option>
                            <option className="bg-slate-900 text-white" value="corporate">🏢 Korporativ</option>
                            <option className="bg-slate-900 text-white" value="other">Boshqa</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <label htmlFor="title" className="text-sm font-medium text-white/80">
                            Sarlavha
                        </label>
                        <input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Masalan: Aziza va Bobur to'yi"
                            required
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                        />
                    </div>

                    {/* Date */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <label htmlFor="date" className="text-sm font-medium text-white/80">
                            Sana va vaqt
                        </label>
                        <input
                            id="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            max="2030-12-31T23:59"
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            style={{ colorScheme: "dark" }}
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <label htmlFor="location" className="text-sm font-medium text-white/80">
                            To'yxona nomi
                        </label>
                        <input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Masalan: Yakkasaroy to'yxonasi"
                            required
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                        />
                    </div>

                    {/* Venue Address */}
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <label htmlFor="venueAddress" className="text-sm font-medium text-white/80">
                            To'liq manzil
                        </label>
                        <input
                            id="venueAddress"
                            value={formData.venueAddress}
                            onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                            placeholder="Masalan: Toshkent sh., Yakkasaroy tumani, Bobur ko'chasi 5"
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="description" className="text-sm font-medium text-white/80">
                            Qo'shimcha ma'lumot qoldiring (ixtiyoriy)
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Mehmonlar uchun qisqacha xabar yoki izoh..."
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-6 bg-red-500/20 text-red-200 border border-red-500/50 p-4 rounded-xl text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:opacity-50 text-black font-bold text-lg rounded-xl transition-all shadow-xl hover:shadow-yellow-500/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            {aiDesign ? "Taklifnoma yig'ilmoqda..." : "AI dizayn yaratilmoqda..."}
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            Taklifnomani yaratish
                        </>
                    )}
                </button>
                <p className="text-center text-white/50 text-xs mt-4">
                    Taklifnoma haqida SMS yoki xabarlar orqali do'stlaringizga ulasha olasiz.
                </p>
            </div>
        </form >
    );
}
