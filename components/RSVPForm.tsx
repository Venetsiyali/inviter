"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";

interface RSVPFormProps {
    eventId: string;
    eventTitle: string;
}

export default function RSVPForm({ eventId, eventTitle }: RSVPFormProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [rsvpChoice, setRsvpChoice] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const handleRSVP = async (choice: "confirmed" | "declined" | "maybe") => {
        setRsvpChoice(choice);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rsvpChoice) return;

        setStatus("submitting");

        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId,
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.message,
                    rsvpStatus: rsvpChoice,
                }),
            });

            if (!response.ok) throw new Error("RSVP failed");

            setStatus("success");
        } catch (error) {
            console.error("RSVP error:", error);
            setStatus("idle");
            alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Rahmat!
                </h3>
                <p className="text-green-700">
                    Javobingiz qabul qilindi. Ko'rishguncha!
                </p>
            </div>
        );
    }

    if (!rsvpChoice) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    Tadbirda qatnashasizmi?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button
                        size="lg"
                        onClick={() => handleRSVP("confirmed")}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        ✓ Kelaman
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleRSVP("maybe")}
                        className="border-2"
                    >
                        ? Bilmayman
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleRSVP("declined")}
                        className="border-2"
                    >
                        ✗ Kelmayman
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ma'lumotlaringizni kiriting
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Ismingiz *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ismingizni kiriting"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="phone">Telefon raqam (ixtiyoriy)</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998 90 123 45 67"
                    />
                </div>

                <div>
                    <Label htmlFor="message">Xabar (ixtiyoriy)</Label>
                    <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Muddao tashkilotchiga..."
                        rows={3}
                    />
                </div>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setRsvpChoice(null)}
                        className="flex-1"
                    >
                        Orqaga
                    </Button>
                    <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                        {status === "submitting" ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Yuborilmoqda...
                            </>
                        ) : (
                            "Yuborish"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
