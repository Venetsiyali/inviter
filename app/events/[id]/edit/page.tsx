import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import ShareButtons from "@/components/ShareButtons";
import InvitationCard from "@/components/InvitationCard";
import { DesignConfig } from "@/lib/ai/design-generator";
import { ArrowLeft, ExternalLink, Users } from "lucide-react";

export default async function EventEditPage({
    params,
}: {
    params: { id: string };
}) {
    const user = await getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Fetch event with guest count
    const event = await prisma.event.findUnique({
        where: { id: params.id },
        include: {
            _count: {
                select: { guests: true },
            },
        },
    });

    if (!event) {
        notFound();
    }

    // Check ownership
    if (event.userId !== user.id && user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const design: DesignConfig = JSON.parse(event.designConfig as string);
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${event.slug}`;

    const formattedDate = new Date(event.date).toLocaleDateString("uz-UZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    // Get RSVP stats
    const guests = await prisma.guest.findMany({
        where: { eventId: event.id },
    });

    const rsvpStats = {
        total: guests.length,
        confirmed: guests.filter((g) => g.rsvpStatus === "confirmed").length,
        declined: guests.filter((g) => g.rsvpStatus === "declined").length,
        maybe: guests.filter((g) => g.rsvpStatus === "maybe").length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Dashboard'ga qaytish
                        </Button>
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {event.title}
                    </h1>
                    <p className="text-gray-600">{formattedDate}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Invitation Preview */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Taklifnoma ko'rinishi
                            </h2>
                            <InvitationCard event={event} design={design} />
                        </div>
                    </div>

                    {/* Right: QR & Sharing */}
                    <div className="space-y-6">
                        {/* QR Code */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">QR Kod</h2>
                            <div className="flex flex-col items-center">
                                <QRCodeGenerator url={inviteUrl} size={250} />
                                <p className="text-sm text-gray-600 mt-4 text-center">
                                    Telefoningiz bilan scan qiling yoki havola orqali ulashing
                                </p>
                            </div>
                        </div>

                        {/* Public Link */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Ommaviy havola</h2>
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <code className="text-sm text-blue-600 break-all">
                                    {inviteUrl}
                                </code>
                            </div>
                            <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Taklifnomani ochish
                                </Button>
                            </a>
                        </div>

                        {/* Share Buttons */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Ulashish</h2>
                            <ShareButtons
                                url={inviteUrl}
                                title={event.title}
                                date={formattedDate}
                                location={event.location || ""}
                            />
                        </div>

                        {/* RSVP Stats */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">RSVP Statistikasi</h2>
                                <Users className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600">
                                        {rsvpStats.confirmed}
                                    </div>
                                    <div className="text-sm text-green-700">Keladi</div>
                                </div>

                                <div className="bg-red-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-red-600">
                                        {rsvpStats.declined}
                                    </div>
                                    <div className="text-sm text-red-700">Kelmaydi</div>
                                </div>

                                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-yellow-600">
                                        {rsvpStats.maybe}
                                    </div>
                                    <div className="text-sm text-yellow-700">Bilmaydi</div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {rsvpStats.total}
                                    </div>
                                    <div className="text-sm text-blue-700">Jami</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
