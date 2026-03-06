"use client";

import { useState, useEffect } from "react";
import { User, Lock, Loader2, Save, ShieldCheck, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [profile, setProfile] = useState<{
        email: string;
        name: string;
        hasGoogle: boolean;
        hasPassword: boolean;
    } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/user/profile");
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.user);
                    setFormData(prev => ({ ...prev, name: data.user.name || "" }));
                } else if (res.status === 401) {
                    router.push("/auth/login");
                }
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError("Yangi parollar mos kelmadi");
            return;
        }

        if (formData.newPassword && formData.newPassword.length < 6) {
            setError("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak");
            return;
        }

        setSaving(true);
        try {
            const payload: any = {};
            if (formData.name !== profile?.name) payload.name = formData.name;
            if (formData.newPassword) {
                payload.newPassword = formData.newPassword;
                if (profile?.hasPassword) {
                    payload.currentPassword = formData.currentPassword;
                }
            }

            if (Object.keys(payload).length === 0) {
                setSaving(false);
                return;
            }

            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Yangilashda xatolik yuz berdi");

            setSuccess("Profilingiz muvaffaqiyatli yangilandi");

            // Clear password fields on success
            setFormData(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));

            // Update local profile state
            if (payload.name) {
                setProfile(prev => prev ? { ...prev, name: payload.name } : null);
            }
            if (payload.newPassword) {
                setProfile(prev => prev ? { ...prev, hasPassword: true } : null);
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Profil Sozlamalari</h1>
                <p className="text-gray-500 mt-1">Shaxsiy ma'lumotlaringizni va xavfsizlik parollarini shu yerdan boshqaring.</p>
            </div>

            <Card className="border-0 shadow-xl shadow-purple-900/5 ring-1 ring-purple-100 overflow-hidden rounded-3xl">
                <form onSubmit={handleSubmit}>
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100/50 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg shadow-purple-500/30">
                                {profile?.name?.[0] || profile?.email[0] || "U"}
                            </div>
                            <div>
                                <CardTitle className="text-xl">Shaxsiy ma'lumotlar</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1 font-medium text-slate-500">
                                    <Mail className="w-4 h-4" />
                                    {profile?.email}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 sm:p-8 space-y-8">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 text-green-600 border border-green-100 rounded-2xl flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{success}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
                                    Ism-sharifingiz
                                </label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="max-w-md bg-slate-50 border-slate-200 focus-visible:ring-purple-500 rounded-xl h-12"
                                    placeholder="Ismingizni kiriting"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-purple-600" />
                                    Xavfsizlik & Parol
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {profile?.hasGoogle && !profile?.hasPassword
                                        ? "Siz tizimga Google orqali kirgansiz. Saytimiz uchun alohida parol o'rnatishingiz mumkin."
                                        : "Tizimga kirish parolini yangilash."}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
                                {profile?.hasPassword && (
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-medium text-slate-700">Joriy parol</label>
                                        <Input
                                            type="password"
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                            className="bg-white border-slate-200 focus-visible:ring-purple-500 rounded-xl h-11"
                                            placeholder="Hozirgi parolingizni kiriting"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Yangi parol</label>
                                    <Input
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        className="bg-white border-slate-200 focus-visible:ring-purple-500 rounded-xl h-11"
                                        placeholder="Kamida 6 ta belgi"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Parolni tasdiqlash</label>
                                    <Input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="bg-white border-slate-200 focus-visible:ring-purple-500 rounded-xl h-11"
                                        placeholder="Yangi parolni takrorlang"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-xl disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                O'zgarishlarni saqlash
                            </button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
