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
    LayoutGrid,
} from "lucide-react";

const EVENT_TYPES = [
    { id: "wedding", label: "Nikoh to'yi", emoji: "💍", desc: "Aloha nikoh marosimi" },
    { id: "osh", label: "Osh marosimi", emoji: "🍲", desc: "Milliy osh ziyofati" },
    { id: "birthday", label: "Tug'ilgan kun", emoji: "🎂", desc: "Bayram tadbiri" },
    { id: "sunnat", label: "Sunnat to'yi", emoji: "✨", desc: "Sunnati rasmi" },
    { id: "engagement", label: "Unashtiruv", emoji: "💞", desc: "Unashtiruv marosimi" },
    { id: "anniversary", label: "Yubiley", emoji: "🥂", desc: "Nikoh yubileyi" },
];

// Canva-style static templates using Unsplash curated images
const CANVAS_TEMPLATES = [
    {
        id: "uzbek-gold",
        name: "O'zbek Oltin",
        mood: "An'anaviy va hashamatli",
        imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=576&h=1024&fit=crop&q=80",
        gradient: "from-yellow-900 to-amber-700",
        tags: ["wedding", "osh", "sunnat", "anniversary"],
    },
    {
        id: "floral-white",
        name: "Oq Gullar",
        mood: "Romantik va nafis",
        imageUrl: "https://images.unsplash.com/photo-1487530811015-780f2f5e3f87?w=576&h=1024&fit=crop&q=80",
        gradient: "from-pink-200 to-rose-100",
        tags: ["wedding", "engagement", "birthday", "anniversary"],
    },
    {
        id: "luxury-dark",
        name: "Qoʻngʻir Hashamat",
        mood: "Tantanali va ulug'vor",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=576&h=1024&fit=crop&q=80",
        gradient: "from-stone-900 to-stone-700",
        tags: ["wedding", "osh", "anniversary"],
    },
    {
        id: "blue-elegant",
        name: "Ko'k Zafarlik",
        mood: "Milliy va nafis",
        imageUrl: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=576&h=1024&fit=crop&q=80",
        gradient: "from-blue-900 to-indigo-700",
        tags: ["wedding", "osh", "sunnat"],
    },
    {
        id: "rose-gold",
        name: "Atirgul Oltin",
        mood: "Romantik va zamonaviy",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=576&h=1024&fit=crop&q=80",
        gradient: "from-rose-300 to-pink-400",
        tags: ["wedding", "engagement", "birthday"],
    },
    {
        id: "green-botanical",
        name: "Yashil Botanika",
        mood: "Tabiiy va fresh",
        imageUrl: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=576&h=1024&fit=crop&q=80",
        gradient: "from-green-800 to-emerald-600",
        tags: ["wedding", "birthday", "anniversary"],
    },
    {
        id: "purple-luxury",
        name: "Binafsha Hashamat",
        mood: "Qirolona va nafis",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=576&h=1024&fit=crop&q=80",
        gradient: "from-purple-900 to-violet-700",
        tags: ["wedding", "birthday", "anniversary"],
    },
    {
        id: "minimal-cream",
        name: "Krem Minimal",
        mood: "Sodda va zamonaviy",
        imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=576&h=1024&fit=crop&q=80",
        gradient: "from-amber-50 to-stone-100",
        tags: ["wedding", "engagement", "birthday"],
    },
];

interface DesignOption {
    prompt: string;
    style: string;
    mood: string;
    imageUrl?: string;
    loading?: boolean;
}

type Step = "event-type" | "choose-method" | "description" | "generating" | "select-design" | "canvas-templates";

export default function AICreatePage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("event-type");
    const [eventType, setEventType] = useState("");
    const [description, setDescription] = useState("");
    const [designs, setDesigns] = useState<DesignOption[]>([]);
    const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
    const [selectedCanvas, setSelectedCanvas] = useState<string | null>(null);
    const [error, setError] = useState("");

    const selectedEvent = EVENT_TYPES.find((e) => e.id === eventType);

    const filteredTemplates = CANVAS_TEMPLATES.filter(
        (t) => !eventType || t.tags.includes(eventType)
    );

    const handleGenerateDesigns = async () => {
        if (!description.trim() || description.length < 5) {
            setError("Iltimos, taklifnomangiz haqida kamida 5 ta belgi yozing");
            return;
        }
        setError("");
        setStep("generating");
        setDesigns([]);

        try {
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

            const initialDesigns: DesignOption[] = prompts.map((p: any) => ({
                ...p,
                loading: true,
            }));
            setDesigns(initialDesigns);
            setStep("select-design");

            // Generate images in parallel
            const imagePromises = prompts.map(async (p: any, i: number) => {
                try {
                    const imgRes = await fetch("/api/ai/generate-image", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ prompt: p.prompt, index: i }),
                    });
                    if (imgRes.ok) {
                        const { imageUrl } = await imgRes.json();
                        return { ...p, imageUrl, loading: false };
                    }
                } catch { }
                return { ...p, loading: false };
            });

            const results = await Promise.all(imagePromises);
            setDesigns(results);
        } catch (err: any) {
            // On error, go to canvas templates as fallback
            setError("");
            setStep("canvas-templates");
        }
    };

    const handleSelectAIDesign = () => {
        if (selectedDesign === null) return;
        const design = designs[selectedDesign];
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

    const handleSelectCanvas = () => {
        if (!selectedCanvas) return;
        const template = CANVAS_TEMPLATES.find((t) => t.id === selectedCanvas);
        sessionStorage.setItem(
            "ai_selected_design",
            JSON.stringify({
                imageUrl: template?.imageUrl,
                style: template?.name,
                eventType,
                fromCanvas: true,
            })
        );
        router.push(`/dashboard/create?ai=true&type=${eventType}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Stars */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(40)].map((_, i) => (
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
                    <span className="hidden sm:block">Dashboard</span>
                </Link>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    AI Taklifnoma
                </div>
                <div className="w-16" />
            </header>

            <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
                <AnimatePresence mode="wait">

                    {/* Step 1: Event Type */}
                    {step === "event-type" && (
                        <motion.div key="event-type" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">Marosim turini tanlang</h1>
                                <p className="text-white/60">AI siz uchun maxsus dizayn yaratadi</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {EVENT_TYPES.map((type) => (
                                    <motion.button key={type.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        onClick={() => { setEventType(type.id); setStep("choose-method"); }}
                                        className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-yellow-400/50 rounded-2xl p-5 text-left transition-all group"
                                    >
                                        <div className="text-4xl mb-3">{type.emoji}</div>
                                        <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">{type.label}</div>
                                        <div className="text-sm text-white/50 mt-1">{type.desc}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Choose method */}
                    {step === "choose-method" && (
                        <motion.div key="choose-method" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                            <button onClick={() => setStep("event-type")} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                                <ChevronLeft className="w-5 h-5" /> Orqaga
                            </button>
                            <div className="text-center mb-8">
                                <div className="text-5xl mb-3">{selectedEvent?.emoji}</div>
                                <h1 className="text-3xl font-bold text-white mb-2">{selectedEvent?.label}</h1>
                                <p className="text-white/60">Usulni tanlang</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    onClick={() => setStep("description")}
                                    className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 border border-yellow-400/40 rounded-3xl p-8 text-left transition-all"
                                >
                                    <Wand2 className="w-10 h-10 text-yellow-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">AI bilan yaratish</h3>
                                    <p className="text-white/60 text-sm">O'z so'zlaringiz bilan tasavvuringizni yozing — AI dizayn yaratadi</p>
                                    <div className="mt-4 inline-flex items-center gap-1 text-yellow-400 text-sm font-medium">
                                        Tanlash <ChevronRight className="w-4 h-4" />
                                    </div>
                                </motion.button>

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    onClick={() => setStep("canvas-templates")}
                                    className="bg-gradient-to-br from-purple-400/20 to-blue-500/20 hover:from-purple-400/30 hover:to-blue-500/30 border border-purple-400/40 rounded-3xl p-8 text-left transition-all"
                                >
                                    <LayoutGrid className="w-10 h-10 text-purple-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Tayyor shablonlar</h3>
                                    <p className="text-white/60 text-sm">Canva uslubida professional tayyor dizaynlardan birini tanlang</p>
                                    <div className="mt-4 inline-flex items-center gap-1 text-purple-400 text-sm font-medium">
                                        {filteredTemplates.length} ta shablon <ChevronRight className="w-4 h-4" />
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: AI Description */}
                    {step === "description" && (
                        <motion.div key="description" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                            <button onClick={() => setStep("choose-method")} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                                <ChevronLeft className="w-5 h-5" /> Orqaga
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">Taklifnomangizni tasvirlab bering</h1>
                                <p className="text-white/60">O'zbek tilida xohlagan rang, uslub va kayfiyat haqida yozing</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                                <textarea
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); setError(""); }}
                                    placeholder="Masalan: Ko'k va oltin rangda zamonaviy uslubda nikoh taklifnomasi. Gulsalar bilan bezatilgan, nafis va hashamatli ko'rinishda bo'lsin..."
                                    rows={5}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                />
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {["Ko'k va oltin", "Milliy naqshlar", "Zamonaviy minimal", "Gul bezaklari", "Qirolona uslub"].map((hint) => (
                                        <button key={hint}
                                            onClick={() => setDescription((p) => p ? `${p}, ${hint.toLowerCase()}` : hint)}
                                            className="px-3 py-1 bg-white/10 hover:bg-yellow-400/20 border border-white/20 hover:border-yellow-400/50 rounded-full text-xs text-white/70 hover:text-yellow-400 transition-all"
                                        >+ {hint}</button>
                                    ))}
                                </div>
                                {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    onClick={handleGenerateDesigns}
                                    disabled={!description.trim()}
                                    className="mt-6 w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50 text-black font-bold text-lg rounded-2xl transition-all shadow-xl"
                                >
                                    <Wand2 className="w-5 h-5" /> AI bilan dizayn yarat <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Generating loading */}
                    {step === "generating" && (
                        <motion.div key="generating" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                            <div className="relative inline-flex mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-yellow-400/30 border-t-yellow-400 animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">AI dizaynlarni yaratyapti...</h2>
                            <p className="text-white/60">4 ta noyob variant tayyorlanmoqda</p>
                        </motion.div>
                    )}

                    {/* AI Design Selection */}
                    {step === "select-design" && (
                        <motion.div key="select-design" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">Dizaynni tanlang</h1>
                                <p className="text-white/60">4 ta noyob AI variantidan birini tanlang</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {designs.map((design, i) => (
                                    <motion.button key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedDesign(i)}
                                        className={`relative rounded-2xl overflow-hidden border-2 transition-all ${selectedDesign === i ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "border-white/20 hover:border-white/50"}`}
                                    >
                                        <div className="relative" style={{ paddingBottom: "177.78%" }}>
                                            {design.loading ? (
                                                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center gap-3">
                                                    <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
                                                    <span className="text-white/40 text-xs">Yuklanmoqda...</span>
                                                </div>
                                            ) : design.imageUrl ? (
                                                <img src={design.imageUrl} alt={design.style} className="absolute inset-0 w-full h-full object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center">
                                                    <ImageIcon className="w-10 h-10 text-white/30" />
                                                </div>
                                            )}
                                            {selectedDesign === i && (
                                                <div className="absolute inset-0 bg-yellow-400/10 flex items-center justify-center">
                                                    <div className="bg-yellow-400 rounded-full p-2"><Check className="w-6 h-6 text-black" /></div>
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                <p className="text-white font-semibold text-sm">{design.style}</p>
                                                <p className="text-white/60 text-xs">{design.mood}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => { setStep("description"); setSelectedDesign(null); setDesigns([]); }}
                                    className="flex-1 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:border-white/40 transition-all">
                                    Qayta yozish
                                </button>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    onClick={handleSelectAIDesign}
                                    disabled={selectedDesign === null}
                                    className="flex-grow flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-40 text-black font-bold rounded-2xl"
                                >
                                    Tanlash <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Canvas Templates */}
                    {step === "canvas-templates" && (
                        <motion.div key="canvas-templates" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <button onClick={() => setStep("choose-method")} className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                                <ChevronLeft className="w-5 h-5" /> Orqaga
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">Tayyor shablonlar</h1>
                                <p className="text-white/60">Professional dizayndan birini tanlang</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {filteredTemplates.map((template, i) => (
                                    <motion.button key={template.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedCanvas(template.id)}
                                        className={`relative rounded-2xl overflow-hidden border-2 transition-all ${selectedCanvas === template.id ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "border-white/20 hover:border-white/50"}`}
                                    >
                                        <div className="relative" style={{ paddingBottom: "150%" }}>
                                            <img
                                                src={template.imageUrl}
                                                alt={template.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            {selectedCanvas === template.id && (
                                                <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                                                    <div className="bg-yellow-400 rounded-full p-2 shadow-lg"><Check className="w-5 h-5 text-black" /></div>
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                                                <p className="text-white font-semibold text-xs">{template.name}</p>
                                                <p className="text-white/60 text-xs">{template.mood}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={handleSelectCanvas}
                                disabled={!selectedCanvas}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-40 text-black font-bold text-lg rounded-2xl shadow-xl"
                            >
                                Bu shablonni tanlash <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}
