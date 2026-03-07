"use client";

export default function CopyButton({ text }: { text: string }) {
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(text);
                setTimeout(() => {
                    // Optional: could add toast here
                }, 200);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
            Nusxa
        </button>
    );
}
