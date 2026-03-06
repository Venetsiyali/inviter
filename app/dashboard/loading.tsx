import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="font-medium animate-pulse">Yuklanmoqda...</p>
            </div>
        </div>
    );
}
