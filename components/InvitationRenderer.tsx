"use client";

import { useEffect, useRef, useState } from "react";
import GiftForm from "./GiftForm";
import PhotoGallery from "./PhotoGallery";

interface Props {
    htmlContent: string;
    invitationId: string;
    primaryColor: string;
    secondaryColor: string;
}

export default function InvitationRenderer({
    htmlContent,
    invitationId,
    primaryColor,
    secondaryColor,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showGift, setShowGift] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const giftBtn = containerRef.current.querySelector('#trigger-gift');
        const photoBtn = containerRef.current.querySelector('#trigger-photo');

        const onGift = (e: Event) => { e.preventDefault(); setShowGift(true); };
        const onPhoto = (e: Event) => { e.preventDefault(); setShowPhoto(true); };

        if (giftBtn) giftBtn.addEventListener('click', onGift);
        if (photoBtn) photoBtn.addEventListener('click', onPhoto);

        return () => {
            if (giftBtn) giftBtn.removeEventListener('click', onGift);
            if (photoBtn) photoBtn.removeEventListener('click', onPhoto);
        };
    }, [htmlContent]);

    return (
        <div className="w-full relative">
            <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* Modal for Gift */}
            {showGift && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-sm bg-[#1B0033] rounded-2xl p-6 shadow-2xl border" style={{ borderColor: secondaryColor }}>
                        <button
                            onClick={() => setShowGift(false)}
                            className="absolute top-2 right-4 text-white/50 hover:text-white text-xl p-2 z-50">
                            ✕
                        </button>
                        <div className="mt-4">
                            <GiftForm
                                invitationId={invitationId}
                                primaryColor={primaryColor}
                                secondaryColor={secondaryColor}
                                isModal={true}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Photo */}
            {showPhoto && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-[#1B0033] rounded-2xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto" style={{ borderColor: secondaryColor }}>
                        <button
                            onClick={() => setShowPhoto(false)}
                            className="absolute top-2 right-4 text-white/50 hover:text-white text-xl p-2 z-50">
                            ✕
                        </button>
                        <div className="mt-4">
                            <PhotoGallery
                                invitationId={invitationId}
                                photoEnabled={true}
                                primaryColor={primaryColor}
                                secondaryColor={secondaryColor}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
