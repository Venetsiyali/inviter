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
        description: "",
    });

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
            const payload = { ...formData, aiDesign };

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
                            className="w-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                            style={{ colorScheme: "dark" }}
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2 sm:col-span-2">
                        <label htmlFor="location" className="text-sm font-medium text-white/80">
                            Manzil
                        </label>
                        <input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Masalan: Toshkent, Yakkasaroy to'yxonasi"
                            required
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
        </form>
    );
}
