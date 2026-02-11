"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uz } from "@/locales/uz";
import { Mail, Loader2, CheckCircle2 } from "lucide-react"; // Keep these imports if they are still used in the new structure, though the provided new code doesn't use them. I'll remove them as the new code doesn't use them.

// Based on the provided "Code Edit", the new structure does not use motion, useEffect, Label, Loader2, CheckCircle2.
// The new code also renames the main component and introduces a Suspense wrapper.

function VerificationForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // The original code had `resending` state and `handleResend` function, which are removed in the provided "Code Edit".

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify", { // Endpoint changed from /api/auth/verify-email to /api/auth/verify
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Verification failed"); // Error message changed
            }

            // Redirect to login
            router.push("/auth/login?verified=true"); // Redirect target changed from /dashboard to /auth/login?verified=true
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {uz.auth.verifyEmail}
                        </h1>
                        <p className="text-gray-600 mb-1">{uz.auth.checkYourEmail}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div >

        { error && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
                {error}
            </motion.div>
        )
}

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

{/* Resend Code */ }
<div className="mt-6 text-center">
    <button
        onClick={handleResend}
        disabled={resending}
        className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
    >
        {resending ? uz.common.loading : "Kodni qayta yuborish"}
    </button>
</div>
                </motion.div >
            </motion.div >
        </div >
    );
}
