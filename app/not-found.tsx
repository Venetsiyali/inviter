import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-7xl mb-6">😔</div>
                <h1 className="text-4xl font-bold text-white mb-3">404</h1>
                <p className="text-white/50 mb-8 max-w-sm mx-auto">
                    Kechirasiz, bu sahifa topilmadi yoki taklifnoma olib tashlangan
                </p>
                <Link href="/" className="gradient-btn !py-3 !px-8 !text-sm">
                    Bosh sahifaga →
                </Link>
            </div>
        </div>
    );
}
