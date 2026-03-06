import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-navy text-white flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
                <div className="space-y-3 max-w-xs mx-auto">
                    <div className="h-4 bg-white/10 rounded-full w-24 mx-auto animate-shimmer" />
                    <div className="h-8 bg-white/10 rounded-full w-48 mx-auto animate-shimmer" />
                    <div className="h-4 bg-white/10 rounded-full w-32 mx-auto animate-shimmer" />
                </div>
            </div>
        </div>
    );
}
