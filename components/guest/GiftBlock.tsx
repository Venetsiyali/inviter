"use client";

import { useState } from "react";
import { Gift, X, Copy, Check, CreditCard } from "lucide-react";

interface GiftBlockProps {
    hostName: string;
    cardNumber?: string;
    cardHolder?: string;
}

export default function GiftBlock({ hostName, cardNumber, cardHolder }: GiftBlockProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyCardNumber = async () => {
        if (!cardNumber) return;

        try {
            await navigator.clipboard.writeText(cardNumber);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const formatCardNumber = (number: string) => {
        return number.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    return (
        <>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">To&apos;yana</h2>
                        <p className="text-gray-600">Moliyaviy yordam</p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                    Agar siz bizning baxtimizga hissa qo&apos;shmoqchi bo&apos;lsangiz, quyidagi karta raqamidan
                    foydalanishingiz mumkin.
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                    <CreditCard className="w-5 h-5" />
                    Karta Raqamini Ko&apos;rish
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                To&apos;yana Uchun
                            </h3>
                            <p className="text-gray-600">
                                Quyidagi karta raqamiga o&apos;tkazishingiz mumkin
                            </p>
                        </div>

                        {cardNumber ? (
                            <div className="space-y-4">
                                {/* Card Mockup */}
                                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-xl">
                                    <div className="mb-8">
                                        <div className="text-xs opacity-75 mb-1">Karta egasi</div>
                                        <div className="font-semibold text-lg">
                                            {cardHolder || hostName}
                                        </div>
                                    </div>
                                    <div className="font-mono text-2xl tracking-wider">
                                        {formatCardNumber(cardNumber)}
                                    </div>
                                </div>

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopyCardNumber}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    {isCopied ? (
                                        <>
                                            <Check className="w-5 h-5 text-green-600" />
                                            Nusxalandi!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            Raqamni Nusxalash
                                        </>
                                    )}
                                </button>

                                <p className="text-sm text-gray-600 text-center">
                                    Sizning hissangiz biz uchun katta quvonchdir! 💝
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    Karta raqami hali qo&apos;shilmagan
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
