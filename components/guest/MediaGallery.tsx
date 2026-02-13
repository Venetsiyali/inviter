"use client";

import { useState } from "react";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface MediaGalleryProps {
    eventId: string;
    initialPhotos?: Array<{ id: string; imageUrl: string; uploaderName: string; caption?: string }>;
}

export default function MediaGallery({ eventId, initialPhotos = [] }: MediaGalleryProps) {
    const [photos, setPhotos] = useState(initialPhotos);
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadForm, setUploadForm] = useState({
        uploaderName: "",
        caption: "",
    });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("file", file);
            formData.append("uploaderName", uploadForm.uploaderName);
            if (uploadForm.caption) {
                formData.append("caption", uploadForm.caption);
            }

            const response = await fetch(`/api/events/${eventId}/media`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newPhoto = await response.json();
                setPhotos([newPhoto, ...photos]);
                setShowUploadForm(false);
                setUploadForm({ uploaderName: "", caption: "" });
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Fotogalereya</h2>
                        <p className="text-gray-600">Xotiralarni ulashing</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2"
                >
                    <Upload className="w-5 h-5" />
                    Yuklash
                </button>
            </div>

            {/* Upload Form */}
            {showUploadForm && (
                <div className="mb-6 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Rasm Yuklash</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ismingiz *
                            </label>
                            <input
                                type="text"
                                required
                                value={uploadForm.uploaderName}
                                onChange={(e) =>
                                    setUploadForm({ ...uploadForm, uploaderName: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Sizning ismingiz"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Izoh (ixtiyoriy)
                            </label>
                            <input
                                type="text"
                                value={uploadForm.caption}
                                onChange={(e) =>
                                    setUploadForm({ ...uploadForm, caption: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Rasm haqida qisqacha"
                            />
                        </div>
                        <div>
                            <label className="block w-full cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition-colors">
                                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600 font-medium">
                                        {isUploading ? "Yuklanmoqda..." : "Rasm tanlang"}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        PNG, JPG, WEBP (max 5MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    disabled={isUploading || !uploadForm.uploaderName}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Photo Grid */}
            {photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            onClick={() => setSelectedImage(photo.imageUrl)}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        >
                            <Image
                                src={photo.imageUrl}
                                alt={photo.caption || "Gallery photo"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                    <p className="text-sm font-semibold">{photo.uploaderName}</p>
                                    {photo.caption && (
                                        <p className="text-xs opacity-90">{photo.caption}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Hali hech qanday rasm yuklanmagan</p>
                    <p className="text-sm text-gray-500">
                        Birinchi bo&apos;lib rasm ulashing!
                    </p>
                </div>
            )}

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
                        <Image
                            src={selectedImage}
                            alt="Full size"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
