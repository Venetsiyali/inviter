"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { uz } from "@/locales/uz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

function VerificationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resending, setResending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || uz.auth.invalidCode);
            }

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError("");

        try {
            const res = await fetch("/api/auth/resend-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                throw new Error(uz.common.error);
            }

            // Show success message
            alert(uz.auth.verificationCodeSent);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {uz.auth.verifyEmail}
                        </h1>
                        <p className="text-gray-600 mb-1">{uz.auth.checkYourEmail}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Verification Code */}
                        <div className="space-y-2">
                            <Label htmlFor="code">{uz.auth.enterCode}</Label>
                            <Input
                                id="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                className="text-center text-2xl tracking-widest font-mono"
                                placeholder="000000"
                                required
                                maxLength={6}
                                autoFocus
                            />
                            <p className="text-xs text-gray-500 text-center">
                                6 raqamli tasdiqlash kodi
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loading || code.length !== 6}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {uz.common.loading}
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    {uz.auth.verify}
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Resend Code */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                        >
                            {resending ? uz.common.loading : "Kodni qayta yuborish"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <VerificationForm />
        </Suspense>
    );
}
