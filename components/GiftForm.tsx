"use client";

import { useState } from "react";

export default function GiftForm({
    invitationId,
    primaryColor,
    secondaryColor,
}: {
    invitationId: string;
    primaryColor: string;
    secondaryColor: string;
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const presetAmounts = [50000, 100000, 200000, 500000];

    const handleSubmit = async () => {
        if (!name.trim() || !amount) return;

        setLoading(true);
        try {
            const res = await fetch("/api/gift", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invitationId,
                    guestName: name,
                    guestPhone: phone || undefined,
                    message: message || undefined,
                    amount: parseFloat(amount),
                }),
            });

            if (res.ok) {
                setSuccess(true);
            }
        } catch {
            // silent fail
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-2xl p-6 text-center"
                style={{ background: `${secondaryColor}15`, border: `1px solid ${secondaryColor}25` }}
            >
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-lg font-semibold text-white mb-1">Rahmat!</p>
                <p className="text-sm" style={{ color: `${secondaryColor}cc` }}>
                    Hadyangiz muvaffaqiyatli qabul qilindi
                </p>
            </div>
        );
    }

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="w-full py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: `${secondaryColor}20`, color: secondaryColor, border: `1px solid ${secondaryColor}30` }}
            >
                💰 Hadya yuborish
            </button>
        );
    }

    return (
        <div className="rounded-2xl p-5 space-y-4"
            style={{ background: `${secondaryColor}08`, border: `1px solid ${secondaryColor}20` }}
        >
            <h3 className="text-base font-semibold text-white text-center">💰 Hadya yuborish</h3>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                style={{ background: `${secondaryColor}10`, border: `1px solid ${secondaryColor}20` }}
            />

            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon (ixtiyoriy)"
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                style={{ background: `${secondaryColor}10`, border: `1px solid ${secondaryColor}20` }}
            />

            {/* Preset amounts */}
            <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((a) => (
                    <button
                        key={a}
                        onClick={() => setAmount(a.toString())}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                        style={{
                            background: amount === a.toString() ? secondaryColor : `${secondaryColor}15`,
                            color: amount === a.toString() ? primaryColor : `${secondaryColor}cc`,
                            border: `1px solid ${secondaryColor}30`,
                        }}
                    >
                        {(a / 1000).toFixed(0)}K
                    </button>
                ))}
            </div>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Boshqa summa (so'm)"
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                style={{ background: `${secondaryColor}10`, border: `1px solid ${secondaryColor}20` }}
            />

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tabrik xabar (ixtiyoriy)"
                rows={2}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none resize-none"
                style={{ background: `${secondaryColor}10`, border: `1px solid ${secondaryColor}20` }}
            />

            <div className="flex gap-2">
                <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium"
                    style={{ color: `${secondaryColor}88`, border: `1px solid ${secondaryColor}20` }}
                >
                    Bekor
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !name.trim() || !amount}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                    style={{ background: secondaryColor, color: primaryColor }}
                >
                    {loading ? "Yuborilmoqda..." : "Yuborish 🎁"}
                </button>
            </div>
        </div>
    );
}
