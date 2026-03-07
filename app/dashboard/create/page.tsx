"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { TEMPLATE_LIST } from "@/lib/templates";
import { COLOR_THEMES, ColorThemeId } from "@/lib/generate-invitation";

const EVENT_TYPES = [
    { value: "WEDDING", label: "To'y", emoji: "💒" },
    { value: "OSH", label: "Osh", emoji: "🍽️" },
    { value: "BIRTHDAY", label: "Tug'ilgan kun", emoji: "🎂" },
    { value: "ENGAGEMENT", label: "Unashtiruv", emoji: "💍" },
    { value: "SUNNAT", label: "Sunnat to'yi", emoji: "👶" },
    { value: "OTHER", label: "Boshqa", emoji: "🎉" },
];

export default function CreateInvitationPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form state
    const [eventType, setEventType] = useState("");
    const [brideGroom, setBrideGroom] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [venue, setVenue] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [colorTheme, setColorTheme] = useState<ColorThemeId>("klassik-kok");
    const [giftEnabled, setGiftEnabled] = useState(false);
    const [photoEnabled, setPhotoEnabled] = useState(false);

    const selectedTheme = COLOR_THEMES[colorTheme];

    const filteredTemplates = TEMPLATE_LIST.filter(
        (t) => !eventType || t.eventTypes.includes(eventType)
    );

    const handleSubmit = async () => {
        if (!eventType || !brideGroom || !eventDate) {
            toast.error("Marosim turi, ism va sana kiriting");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventType,
                    brideGroom,
                    eventDate,
                    eventTime,
                    venue,
                    venueAddress,
                    phone,
                    templateId: templateId || undefined,
                    primaryColor: selectedTheme.primary,
                    secondaryColor: selectedTheme.secondary,
                    giftEnabled,
                    photoEnabled,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Xatolik yuz berdi");
                return;
            }

            toast.success("Taklifnoma yaratildi! 🎉");
            router.push(`/dashboard/invitations/${data.invitationId}`);
        } catch {
            toast.error("Tarmoq xatosi. Qayta urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-white/40 hover:text-white/60 transition-colors mb-2 block">
                    ← Bosh sahifa
                </Link>
                <h1 className="text-2xl font-bold text-white">Yangi taklifnoma</h1>
                <p className="text-white/40 text-sm mt-1">Ma'lumotlarni kiriting — tayyor taklifnoma 2 daqiqada</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s
                                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
                                : "bg-white/5 text-white/30"
                            }`}>
                            {s}
                        </div>
                        {s < 3 && <div className={`flex-1 h-0.5 rounded ${step > s ? "bg-amber-500/50" : "bg-white/5"}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Event Type + Names */}
            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">Marosim turi</label>
                        <div className="grid grid-cols-3 gap-2">
                            {EVENT_TYPES.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setEventType(t.value)}
                                    className={`rounded-xl p-4 text-center transition-all ${eventType === t.value
                                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/40 border-2 scale-[1.02]"
                                            : "glass hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{t.emoji}</div>
                                    <div className="text-xs font-medium text-white/80">{t.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            {eventType === "WEDDING" || eventType === "ENGAGEMENT"
                                ? "Kuyov va kelin ismi"
                                : eventType === "BIRTHDAY"
                                    ? "Kim uchun?"
                                    : "Marosim nomi"}
                        </label>
                        <input
                            type="text"
                            value={brideGroom}
                            onChange={(e) => setBrideGroom(e.target.value)}
                            placeholder={eventType === "WEDDING" ? "Alisher & Madina" : eventType === "BIRTHDAY" ? "Azizaning tug'ilgan kuni" : "Marosim nomi"}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => {
                            if (!eventType) { toast.error("Marosim turini tanlang"); return; }
                            if (!brideGroom.trim()) { toast.error("Ism kiriting"); return; }
                            setStep(2);
                        }}
                        className="gradient-btn w-full justify-center !py-3.5"
                    >
                        Davom etish →
                    </button>
                </div>
            )}

            {/* Step 2: Date, Venue, Phone */}
            {step === 2 && (
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Sana *</label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1.5">Vaqt</label>
                            <input
                                type="time"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">To'yxona nomi</label>
                        <input
                            type="text"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="Navruz to'yxonasi"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">Manzil</label>
                        <input
                            type="text"
                            value={venueAddress}
                            onChange={(e) => setVenueAddress(e.target.value)}
                            placeholder="Toshkent sh., Chilonzor tumani, 7-mavze"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">Telefon raqam</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+998 90 123 45 67"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500/50 focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-colors">
                            ← Orqaga
                        </button>
                        <button
                            onClick={() => {
                                if (!eventDate) { toast.error("Sanani kiriting"); return; }
                                setStep(3);
                            }}
                            className="flex-1 gradient-btn justify-center !py-3"
                        >
                            Davom etish →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Template + Color + Options */}
            {step === 3 && (
                <div className="space-y-6">
                    {/* Template Selection */}
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">Shablon</label>
                        <div className="grid grid-cols-2 gap-3">
                            {filteredTemplates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTemplateId(t.id)}
                                    className={`rounded-xl p-4 text-left transition-all ${templateId === t.id
                                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/40 border-2"
                                            : "glass hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <h4 className="text-sm font-semibold text-white mb-1">{t.name}</h4>
                                    <p className="text-[11px] text-white/40 leading-relaxed">{t.preview}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Theme */}
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">Rang</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(Object.entries(COLOR_THEMES) as [ColorThemeId, typeof COLOR_THEMES[ColorThemeId]][]).map(([id, theme]) => (
                                <button
                                    key={id}
                                    onClick={() => setColorTheme(id)}
                                    className={`rounded-xl p-3 flex items-center gap-3 transition-all ${colorTheme === id
                                            ? "bg-white/10 border-2 border-amber-500/40"
                                            : "glass hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <div className="flex gap-1">
                                        <div className="w-6 h-6 rounded-full" style={{ background: theme.primary }} />
                                        <div className="w-6 h-6 rounded-full" style={{ background: theme.secondary }} />
                                    </div>
                                    <span className="text-xs font-medium text-white/70">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feature Toggles */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-white/70 mb-1">Qo'shimcha imkoniyatlar</label>
                        <label className="flex items-center gap-3 glass rounded-xl p-3.5 cursor-pointer hover:bg-white/[0.06] transition-colors">
                            <input
                                type="checkbox"
                                checked={giftEnabled}
                                onChange={(e) => setGiftEnabled(e.target.checked)}
                                className="w-5 h-5 rounded accent-amber-500"
                            />
                            <div>
                                <span className="text-sm text-white/80">💰 Hadya tizimi</span>
                                <p className="text-[11px] text-white/30">Mehmonlar Click/Payme orqali hadya yuborsin</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 glass rounded-xl p-3.5 cursor-pointer hover:bg-white/[0.06] transition-colors">
                            <input
                                type="checkbox"
                                checked={photoEnabled}
                                onChange={(e) => setPhotoEnabled(e.target.checked)}
                                className="w-5 h-5 rounded accent-amber-500"
                            />
                            <div>
                                <span className="text-sm text-white/80">📸 Rasm galereyasi</span>
                                <p className="text-[11px] text-white/30">Mehmonlar rasm yuklasin</p>
                            </div>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-colors">
                            ← Orqaga
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 gradient-btn justify-center !py-3.5 disabled:opacity-50"
                        >
                            {loading ? "Yaratilmoqda..." : "✨ Yaratish"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
