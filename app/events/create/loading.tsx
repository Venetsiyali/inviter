import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[100dvh] bg-slate-950 flex flex-col relative overflow-hidden items-center justify-center">
            {/* Ambient background glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-4 text-white/50">
                <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
                <p className="font-bold tracking-widest uppercase text-sm animate-pulse">Sahifa ochilmoqda...</p>
            </div>
        </div>
    );
}
