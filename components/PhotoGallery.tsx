"use client";

import { useState, useEffect } from "react";

interface Photo {
    id: string;
    url: string;
    uploaderName: string;
    createdAt: string;
}

export default function PhotoGallery({
    invitationId,
    photoEnabled,
    primaryColor,
    secondaryColor,
}: {
    invitationId: string;
    photoEnabled: boolean;
    primaryColor: string;
    secondaryColor: string;
}) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [uploaderName, setUploaderName] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/photo?invitationId=${invitationId}`)
            .then((r) => r.json())
            .then((data) => setPhotos(data.photos || []))
            .catch(() => { });
    }, [invitationId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uploaderName.trim()) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("invitationId", invitationId);
            formData.append("uploaderName", uploaderName);

            const res = await fetch("/api/photo", { method: "POST", body: formData });
            if (res.ok) {
                const data = await res.json();
                setPhotos((prev) => [data.photo, ...prev]);
                setShowUpload(false);
                setUploaderName("");
            }
        } catch {
            // silent
        } finally {
            setUploading(false);
        }
    };

    if (!photoEnabled) return null;

    return (
        <div className="space-y-3">
            {/* Upload button */}
            {!showUpload ? (
                <button
                    onClick={() => setShowUpload(true)}
                    className="w-full py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                    style={{ background: `${secondaryColor}20`, color: secondaryColor, border: `1px solid ${secondaryColor}30` }}
                >
                    📸 Rasm yuklash
                </button>
            ) : (
                <div className="rounded-2xl p-4 space-y-3"
                    style={{ background: `${secondaryColor}08`, border: `1px solid ${secondaryColor}20` }}
                >
                    <input
                        type="text"
                        value={uploaderName}
                        onChange={(e) => setUploaderName(e.target.value)}
                        placeholder="Ismingiz"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                        style={{ background: `${secondaryColor}10`, border: `1px solid ${secondaryColor}20` }}
                    />
                    <label className={`block w-full py-3 rounded-xl text-center text-sm font-semibold cursor-pointer transition-all ${uploaderName.trim() ? "opacity-100" : "opacity-40 pointer-events-none"
                        }`}
                        style={{ background: secondaryColor, color: primaryColor }}
                    >
                        {uploading ? "Yuklanmoqda..." : "📷 Rasmni tanlang"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="hidden"
                            disabled={uploading || !uploaderName.trim()}
                        />
                    </label>
                    <button
                        onClick={() => setShowUpload(false)}
                        className="w-full py-2 text-xs"
                        style={{ color: `${secondaryColor}66` }}
                    >
                        Bekor qilish
                    </button>
                </div>
            )}

            {/* Gallery grid */}
            {photos.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-white mb-3 px-1">
                        📸 Rasmlar ({photos.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden">
                        {photos.map((photo) => (
                            <button
                                key={photo.id}
                                onClick={() => setSelectedPhoto(photo.url)}
                                className="aspect-square relative group overflow-hidden"
                            >
                                <img
                                    src={photo.url}
                                    alt={`${photo.uploaderName} rasm`}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        ✕
                    </button>
                    <img
                        src={selectedPhoto}
                        alt="Kattalashtirish"
                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
