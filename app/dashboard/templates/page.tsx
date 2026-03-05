"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Filter, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CANVAS_TEMPLATES, GALLERY_CATEGORIES, AppTemplate } from "@/lib/design/templates";

export default function TemplateGalleryPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Barchasi");
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    // Filter templates
    const filteredTemplates = CANVAS_TEMPLATES.filter((template) => {
        const matchesCategory = selectedCategory === "Barchasi" || template.tags.includes(selectedCategory);
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.mood.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSelectTemplate = (template: AppTemplate) => {
        // Save to session storage so EventCreateForm can pick it up
        sessionStorage.setItem("ai_selected_design", JSON.stringify({
            imageUrl: template.imageUrl,
            style: template.name,
            prompt: template.mood, // We use mood as a short representation
            fromCanvas: true,
        }));

        // Redirect to create page with pre-filled category
        const typeMatch = template.tags[1] === "To'y" ? "wedding" :
            template.tags[1] === "Tug'ilgan kun" ? "birthday" :
                template.tags[1] === "Sunnat to'yi" ? "sunnat" : "other";

        router.push(`/events/create?ai=true&type=${typeMatch}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 pb-20">
            {/* Stars Background */}
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

            {/* Header Section */}
            <div className="relative z-10 pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                            Ajoyib shablonlar
                        </h1>
                        <p className="text-white/70 text-lg">
                            Dizaynerlar darajasidagi tayyor taklifnomalar galereyasi
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-shrink-0 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-white/40" />
                        </div>
                        <input
                            type="text"
                            placeholder="Shablon izlash..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-[300px] bg-white/10 border border-white/20 hover:border-white/40 text-white placeholder-white/40 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all shadow-xl"
                        />
                    </div>
                </div>

                {/* Category Filters (Scrollable on mobile) */}
                <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-2 sm:gap-3 mb-8">
                    {GALLERY_CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? "bg-white text-purple-900 shadow-lg shadow-white/20"
                                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    <AnimatePresence>
                        {filteredTemplates.map((template, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                key={template.id}
                                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 aspect-[9/16]"
                                onMouseEnter={() => setHoveredTemplate(template.id)}
                                onMouseLeave={() => setHoveredTemplate(null)}
                                onClick={() => handleSelectTemplate(template)}
                            >
                                {/* Image */}
                                <img
                                    src={template.imageUrl}
                                    alt={template.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Dark overlay gradient at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                {/* Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                                        {template.name}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-4">
                                        {template.mood}
                                    </p>

                                    <button className="w-full bg-white text-purple-900 font-bold py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Tanlash
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 mt-8">
                        <Filter className="w-12 h-12 text-white/30 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Shablon topilmadi</h3>
                        <p className="text-white/60">
                            Siz izlagan meyoz bo'yicha shablon hozircha yo'q. Ehtiyot bo'ling, "Sun'iy Intellekt" orqali o'zingiz yaratishingiz mumkin!
                        </p>
                        <Link href="/dashboard/ai-create">
                            <button className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                                AI orqali yaratish
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
