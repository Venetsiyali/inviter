"use client";

import { useState } from "react";
import { Check, X, Users, Send } from "lucide-react";

interface RSVPBlockProps {
    eventId: string;
    eventTitle: string;
}

export default function RSVPBlock({ eventId, eventTitle }: RSVPBlockProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "confirmed" as "confirmed" | "declined",
        guestCount: 1,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/events/${eventId}/rsvp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    rsvpStatus: formData.status,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("RSVP submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Rahmat!
                </h3>
                <p className="text-gray-600">
                    Javobingiz qabul qilindi. Ko&apos;rishguncha!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Tashrifni Tasdiqlash
            </h2>
            <p className="text-gray-600 text-center mb-6">
                Iltimos, ishtirok etishingizni tasdiqlang
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ismingiz *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="To'liq ismingiz"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+998 90 123 45 67"
                    />
                </div>

                {/* RSVP Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Ishtirok etasizmi? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: "confirmed" })}
                            className={`p-4 rounded-xl border-2 transition-all ${formData.status === "confirmed"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300 hover:border-green-300"
                                }`}
                        >
                            <Check className="w-6 h-6 mx-auto mb-2 text-green-600" />
                            <span className="font-semibold text-gray-900">Ha, kelaman</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: "declined" })}
                            className={`p-4 rounded-xl border-2 transition-all ${formData.status === "declined"
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300 hover:border-red-300"
                                }`}
                        >
                            <X className="w-6 h-6 mx-auto mb-2 text-red-600" />
                            <span className="font-semibold text-gray-900">Yo&apos;q, kelolmayman</span>
                        </button>
                    </div>
                </div>

                {/* Guest Count - only if coming */}
                {formData.status === "confirmed" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Users className="w-4 h-4 inline mr-2" />
                            Kishi soni
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={formData.guestCount}
                            onChange={(e) =>
                                setFormData({ ...formData, guestCount: parseInt(e.target.value) })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xabar (ixtiyoriy)
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tilak yoki izohingizni yozing..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        "Yuborilmoqda..."
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Javobni Yuborish
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
