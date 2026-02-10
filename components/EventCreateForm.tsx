"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { uz } from "@/locales/uz";

interface EventCreateFormProps {
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        plan: string;
    };
}

export default function EventCreateForm({ user }: EventCreateFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        eventType: "wedding",
        title: "",
        date: "",
        location: "",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Xatolik yuz berdi");
            }

            // Redirect to event editor/preview
            router.push(`/events/${data.eventId}/edit`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Type */}
                    <div className="space-y-2">
                        <Label htmlFor="eventType">Tadbir turi</Label>
                        <Select
                            value={formData.eventType}
                            onValueChange={(value) =>
                                setFormData({ ...formData, eventType: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wedding">To'y</SelectItem>
                                <SelectItem value="birthday">
                                    Tug'ilgan kun
                                </SelectItem>
                                <SelectItem value="engagement">
                                    Fotiha / Nikoh
                                </SelectItem>
                                <SelectItem value="anniversary">
                                    Yubiley
                                </SelectItem>
                                <SelectItem value="corporate">
                                    Korporativ
                                </SelectItem>
                                <SelectItem value="other">Boshqa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Sarlavha</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="Masalan: Aziza va Bobur to'yi"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Sana</Label>
                        <Input
                            id="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Joylashuv</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                            placeholder="Masalan: Toshkent, Milliy bog'"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Qo'shimcha ma'lumot</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Tadbir haqida batafsil ma'lumot..."
                            rows={4}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                AI dizayn yaratilmoqda...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                AI bilan yaratish
                            </>
                        )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                        AI 30 soniyada professional dizayn yaratadi
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
