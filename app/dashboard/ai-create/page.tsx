"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Sparkles,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Check,
    Wand2,
    Image as ImageIcon,
    ArrowLeft,
} from "lucide-react";

const EVENT_TYPES = [
    { id: "wedding", label: "Nikoh to'yi", emoji: "💍", desc: "Aloha nikoh marosimi" },
    { id: "osh", label: "Osh marosimi", emoji: "🍲", desc: "Milliy osh ziyofati" },
    { id: "birthday", label: "Tug'ilgan kun", emoji: "🎂", desc: "Bayram tadbiri" },
    { id: "sunnat", label: "Sunnat to'yi", emoji: "✨", desc: "Sunnati rasmi" },
    { id: "engagement", label: "Unashtiruv", emoji: "💞", desc: "Unashtiruv marosimi" },
    { id: "anniversary", label: "Yubiley", emoji: "🥂", desc: "Nikoh yubileyi" },
];

interface DesignOption {
    prompt: string;
    style: string;
    mood: string;
    imageUrl?: string;
    loading?: boolean;
}

type Step = "event-type" | "description" | "generating" | "select-design";

export default function AICreatePage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("event-type");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [designs, setDesigns] = useState<DesignOption[]>([]);
    const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const selectedEvent = EVENT_TYPES.find((e) => e.id === eventType);

    const handleGenerateDesigns = async () => {
        if (!description.trim() || description.length < 5) {
            setError("Iltimos, taklifnomangiz haqida kamida 5 ta belgi yozing");
            return;
        }
        setError("");
        setStep("generating");
        setIsGenerating(true);
        setDesigns([]);

        try {
            // Step 1: Get prompts from Groq
            const promptRes = await fetch("/api/ai/generate-prompts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userDescription: description, eventType }),
            });

            if (!promptRes.ok) {
                const err = await promptRes.json();
                throw new Error(err.error || "Prompt yaratishda xatolik");
            }

            const { prompts } = await promptRes.json();

            // Initialize designs with loading state
            const initialDesigns: DesignOption[] = prompts.map((p: any) => ({
                ...p,
                loading: true,
            }));
            setDesigns(initialDesigns);
            setStep("select-design");

            // Step 2: Generate images in parallel
            const imagePromises = prompts.map(async (p: any, i: number) => {
                const imgRes = await fetch("/api/ai/generate-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: p.prompt, index: i }),
                });
                if (imgRes.ok) {
                    const { imageUrl } = await imgRes.json();
                    return { ...p, imageUrl, loading: false };
                }
                return { ...p, loading: false };
            });

            // Update designs as images load
            const results = await Promise.all(imagePromises);
            setDesigns(results);
        } catch (err: any) {
            setError(err.message || "Xatolik yuz berdi");
            setStep("description");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSelectDesign = () => {
        if (selectedDesign === null) return;
        const design = designs[selectedDesign];
        // Store selected design and redirect to event creation with prefilled data
        sessionStorage.setItem(
            "ai_selected_design",
            JSON.stringify({
                imageUrl: design.imageUrl,
                prompt: design.prompt,
                style: design.style,
                eventType,
                description,
            })
        );
        router.push(`/dashboard/create?ai=true&type=${eventType}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Stars background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-20"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-4 flex items-center justify-between backdrop-blur-sm border-b border-white/10">
                <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    AI Taklifnoma Yaratish
                </div>
                <div className="w-20" />
            </header>

            {/* Progress indicator */}
            <div className="relative z-10 flex justify-center pt-6 pb-2">
                <div className="flex items-center gap-2">
                    {["event-type", "description", "select-design"].map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === s ? "bg-yellow-400 text-black" :
                                    (["event-type", "description", "generating", "select-design"].indexOf(step) > i)
                                        ? "bg-green-400 text-white" : "bg-white/20 text-white/50"
                                }`}>
                                {(["event-type", "description", "generating", "select-design"].indexOf(step) > i) ? (
                                    <Check className="w-4 h-4" />
                                ) : i + 1}
                            </div>
                            {i < 2 && <div className="w-12 h-0.5 bg-white/20" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
                <AnimatePresence mode="wait">

                    {/* Step 1: Event Type */}
                    {step === "event-type" && (
                        <motion.div
                            key="event-type"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Marosim turini tanlang
                                </h1>
                                <p className="text-white/60">AI siz uchun maxsus dizayn yaratadi</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {EVENT_TYPES.map((type) => (
                                    <motion.button
                                        key={type.id}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setEventType(type.id);
                                            setStep("description");
                                        }}
                                        className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-yellow-400/50 rounded-2xl p-5 text-left transition-all group"
                                    >
                                        <div className="text-4xl mb-3">{type.emoji}</div>
                                        <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                            {type.label}
                                        </div>
                                        <div className="text-sm text-white/50 mt-1">{type.desc}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Description */}
                    {step === "description" && (
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                        >
                            <button
                                onClick={() => setStep("event-type")}
                                className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Orqaga
                            </button>

                            <div className="text-center mb-8">
                                <div className="text-5xl mb-3">{selectedEvent?.emoji}</div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {selectedEvent?.label} uchun
                                </h1>
                                <p className="text-white/60">
                                    Xohlagan dizayn, rang, uslub haqida o'zbek tilida yozing
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                                <label className="block text-white/80 text-sm font-medium mb-3">
                                    Taklifnomangiz haqida yozing
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="Masalan: Ko'k va oltin rangda zamonaviy uslubda nikoh taklifnomasi. Gulsalar bilan bezatilgan, nafis va hashamatli ko'rinishda bo'lsin..."
                                    rows={5}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
                                />

                                {/* Quick suggestions */}
                                <div className="mt-4">
                                    <p className="text-white/40 text-xs mb-2">Tezkor g'oyalar:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Ko'k va oltin ranglar",
                                            "Milliy naqshlar",
                                            "Zamonaviy minimal",
                                            "Gul bezaklari",
                                            "Hashamatli va qirolona",
                                        ].map((hint) => (
                                            <button
                                                key={hint}
                                                onClick={() =>
                                                    setDescription((prev) =>
                                                        prev ? `${prev}, ${hint.toLowerCase()}` : hint
                                                    )
                                                }
                                                className="px-3 py-1 bg-white/10 hover:bg-yellow-400/20 border border-white/20 hover:border-yellow-400/50 rounded-full text-xs text-white/70 hover:text-yellow-400 transition-all"
                                            >
                                                + {hint}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {error && (
                                    <p className="mt-3 text-red-400 text-sm">{error}</p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleGenerateDesigns}
                                    disabled={!description.trim()}
                                    className="mt-6 w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg rounded-2xl transition-all shadow-xl"
                                >
                                    <Wand2 className="w-5 h-5" />
                                    AI bilan dizayn yarat
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Generating (loading screen) */}
                    {step === "generating" && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-20"
                        >
                            <div className="relative inline-flex mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-yellow-400/30 border-t-yellow-400 animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                AI dizaynlarni yaratyapti...
                            </h2>
                            <p className="text-white/60 mb-2">Groq AI matn tahlil qilyapti</p>
                            <p className="text-white/40 text-sm">
                                4 ta noyob dizayn variantini tayyorlamoqda
                            </p>
                        </motion.div>
                    )}

                    {/* Step 4: Select Design */}
                    {step === "select-design" && (
                        <motion.div
                            key="select-design"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Dizaynni tanlang
                                </h1>
                                <p className="text-white/60">
                                    AI yaratgan 4 ta noyob variant — birini tanlang
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {designs.map((design, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedDesign(i)}
                                        className={`relative rounded-2xl overflow-hidden border-2 transition-all ${selectedDesign === i
                                                ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                                                : "border-white/20 hover:border-white/50"
                                            }`}
                                    >
                                        {/* 9:16 aspect ratio container */}
                                        <div className="relative" style={{ paddingBottom: "177.78%" }}>
                                            {design.loading ? (
                                                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center gap-3">
                                                    <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
                                                    <span className="text-white/40 text-xs">Yuklanmoqda...</span>
                                                </div>
                                            ) : design.imageUrl ? (
                                                <img
                                                    src={design.imageUrl}
                                                    alt={design.style}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center">
                                                    <ImageIcon className="w-10 h-10 text-white/30" />
                                                </div>
                                            )}

                                            {/* Selection overlay */}
                                            {selectedDesign === i && (
                                                <div className="absolute inset-0 bg-yellow-400/10 flex items-center justify-center">
                                                    <div className="bg-yellow-400 rounded-full p-2">
                                                        <Check className="w-6 h-6 text-black" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Style label */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                <p className="text-white font-semibold text-sm">
                                                    {design.style}
                                                </p>
                                                <p className="text-white/60 text-xs">{design.mood}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setStep("description");
                                        setSelectedDesign(null);
                                        setDesigns([]);
                                    }}
                                    className="flex-1 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:border-white/40 transition-all"
                                >
                                    Qayta yozish
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSelectDesign}
                                    disabled={selectedDesign === null}
                                    className="flex-2 flex-grow flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-2xl transition-all shadow-xl"
                                >
                                    Bu dizaynni tanlash
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
