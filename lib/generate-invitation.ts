// ============================================================
// inviter.uz — Invitation Generate Engine
// Algorithm-based HTML template generation (NO AI)
// ============================================================

import { TEMPLATES, TemplateFunction } from "./templates";

export interface InvitationData {
    brideGroom: string;
    eventType: string;
    eventDate: string; // ISO date string
    eventTime?: string;
    venue?: string;
    venueAddress?: string;
    venueLat?: number;
    venueLng?: number;
    phone?: string;
    primaryColor: string;
    secondaryColor: string;
    coverImageUrl?: string;
    giftEnabled?: boolean;
    photoEnabled?: boolean;
    slug: string;
}

export interface GenerationResult {
    htmlContent: string;
    templateId: string;
}

// ─── Color Themes ───────────────────────────────────────────
export const COLOR_THEMES = {
    "klassik-kok": {
        name: "Klassik Ko'k",
        primary: "#1E3A5F",
        secondary: "#C9A96E",
    },
    "romantik-qizil": {
        name: "Romantik Qizil",
        primary: "#8B1A1A",
        secondary: "#F5DEB3",
    },
    "zangori-kumush": {
        name: "Zangori-Kumush",
        primary: "#2C3E50",
        secondary: "#BDC3C7",
    },
    "yashil-oltin": {
        name: "Yashil-Oltin",
        primary: "#1A4A2E",
        secondary: "#D4AF37",
    },
} as const;

export type ColorThemeId = keyof typeof COLOR_THEMES;

// ─── Template selection algorithm ───────────────────────────
function selectTemplate(eventType: string, templateId?: string): string {
    // If explicit templateId, use it
    if (templateId && TEMPLATES[templateId]) {
        return templateId;
    }

    // Auto-select best template for event type
    const typeMap: Record<string, string> = {
        WEDDING: "wedding-classic",
        OSH: "osh-traditional",
        BIRTHDAY: "birthday-fun",
        ENGAGEMENT: "wedding-modern",
        SUNNAT: "osh-traditional",
        OTHER: "wedding-classic",
    };

    return typeMap[eventType] || "wedding-classic";
}

// ─── Date formatter (Uzbek) ─────────────────────────────────
function formatDateUzbek(isoDate: string): string {
    const months = [
        "yanvar", "fevral", "mart", "aprel", "may", "iyun",
        "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
    ];
    const days = [
        "Yakshanba", "Dushanba", "Seshanba", "Chorshanba",
        "Payshanba", "Juma", "Shanba",
    ];

    const d = new Date(isoDate);
    const dayName = days[d.getDay()];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${dayName}, ${day}-${month}, ${year}`;
}

// ─── Main generation function ───────────────────────────────
export function generateInvitationHTML(
    data: InvitationData,
    templateId?: string
): GenerationResult {
    const selectedTemplateId = selectTemplate(data.eventType, templateId);
    const templateFn: TemplateFunction = TEMPLATES[selectedTemplateId] || TEMPLATES["wedding-classic"];

    const formattedDate = formatDateUzbek(data.eventDate);

    const htmlContent = templateFn({
        ...data,
        formattedDate,
    });

    return {
        htmlContent,
        templateId: selectedTemplateId,
    };
}
