"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Parol kamida 6 belgidan iborat bo'lishi kerak");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Xatolik yuz berdi");
                return;
            }

            // Auto-login after signup
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.success("Akkaunt yaratildi! Endi kiring.");
                window.location.href = "/login";
            } else {
                toast.success("Xush kelibsiz! 🎉");
                window.location.href = "/dashboard";
            }
        } catch {
            setError("Xatolik yuz berdi. Qayta urinib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-bg)]">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="text-2xl font-bold">
                        <span className="gradient-text">inviter</span>
                        <span className="text-white/40">.uz</span>
                    </Link>
                    <p className="text-white/40 text-sm mt-2">Bepul akkaunt yarating</p>
                </div>

                {/* Google */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 transition-colors text-sm font-medium mb-6"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google bilan ro'yxatdan o'tish
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-xs text-white/30">yoki</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-medium">Ism</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
                            placeholder="Ismingiz"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-white/50 mb-1.5 font-medium">Parol</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
                            placeholder="Kamida 6 belgi"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="gradient-btn w-full justify-center !py-3.5 !text-sm disabled:opacity-50"
                    >
                        {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
                    </button>
                </form>

                <p className="text-center text-sm text-white/40 mt-6">
                    Akkauntingiz bormi?{" "}
                    <Link href="/login" className="text-[var(--color-secondary)] hover:underline">
                        Kirish
                    </Link>
                </p>
            </div>
        </div>
    );
}
