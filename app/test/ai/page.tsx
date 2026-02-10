"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvitationRenderer } from "@/components/InvitationRenderer";
import { GeneratedInvitation, InvitationInput } from "@/lib/ai/gemini";
import { Wand2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { uz } from "@/locales/uz";

export default function AITestPage() {
    const [loading, setLoading] = useState(false);
    const [invitation, setInvitation] = useState<GeneratedInvitation | null>(null);
    const [error, setError] = useState("");

    // Form state
    const [eventType, setEventType] = useState<InvitationInput["eventType"]>("wedding");
    const [hosts, setHosts] = useState("Ali vaLaylo");
    const [date, setDate] = useState("2024-05-20");
    const [time, setTime] = useState("18:00");
    const [location, setLocation] = useState("Navruz restaurant, Toshkent");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");

        try {
            const input: InvitationInput = {
                eventType,
                locale: "UZ_LAT",
                basicInfo: {
                    hosts: hosts.split(" va "),
                    date,
                    time,
                    location,
                },
                preferences: {
                    tone: "formal",
                    culturalStyle: "traditional",
                },
            };

            const res = await fetch("/api/ai/generate-invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });

            if (!res.ok) {
                throw new Error("Generatsiya xatoligi");
            }

            const data = await res.json();
            setInvitation(data.invitation);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        AI Taklifnoma Generator
                    </h1>
                    <p className="text-gray-600">
                        Gemini 1.5 Pro yordamida professional taklifnomalar yarating
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Ma'lumotlar
                        </h2>

                        {/* Event Type */}
                        <div className="space-y-2">
                            <Label>Tadbir turi</Label>
                            <select
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value as any)}
                                className="w-full h-11 px-4 rounded-lg border border-input bg-background"
                            >
                                <option value="wedding">To'y (Nikoh)</option>
                                <option value="osh">Osh</option>
                                <option value="birthday">Tug'ilgan kun</option>
                                <option value="lutf">Lutf</option>
                                <option value="engagement">Fotiha (Unashish)</option>
                                <option value="circumcision">Sunnat to'yi</option>
                                <option value="anniversary">Yubiley</option>
                            </select>
                        </div>

                        {/* Hosts */}
                        <div className="space-y-2">
                            <Label>Uy egalari</Label>
                            <Input
                                value={hosts}
                                onChange={(e) => setHosts(e.target.value)}
                                placeholder="Ali va Laylo"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <Label>Sana</Label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* Time */}
                        <div className="space-y-2">
                            <Label>Vaqt</Label>
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label>Manzil</Label>
                            <Input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Navruz restaurant, Toshkent"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="w-full"
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generatsiya qilinmoqda...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" />
                                    AI bilan yaratish
                                </>
                            )}
                        </Button>

                        {/* Info */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <p className="text-sm text-blue-900">
                                <strong>💡 Maslahat:</strong> AI minimal ma'lumotlardan to'liq va
                                chiroyli taklifnoma yaratadi. O'zbekona lutf va zamonaviy dizayn
                                birlashtiriladi.
                            </p>
                        </div>
                    </motion.div>

                    {/* Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview</h2>

                        {invitation ? (
                            <div className="space-y-4">
                                <InvitationRenderer invitation={invitation} />

                                {/* Metadata */}
                                <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
                                    <h3 className="font-bold text-gray-900">AI Ma'lumotlari</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-600">Madaniy stil</div>
                                            <div className="font-medium">
                                                {invitation.metadata.culturalStyle}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600">Ishonch darajasi</div>
                                            <div className="font-medium">
                                                {invitation.metadata.aiConfidence}%
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600">Rang palitrasi</div>
                                            <div className="font-medium">
                                                {invitation.design.colorPalette.style}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600">Naqsh</div>
                                            <div className="font-medium">
                                                {invitation.design.pattern.style}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Wand2 className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-gray-600">
                                    Ma'lumotlarni kiriting va "AI bilan yaratish" tugmasini bosing
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
