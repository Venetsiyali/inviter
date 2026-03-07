// ============================================================
// Template Registry — All HTML templates
// ============================================================

import { InvitationData } from "../generate-invitation";
import { weddingClassic } from "./wedding-classic";
import { weddingModern } from "./wedding-modern";
import { oshTraditional } from "./osh-traditional";
import { birthdayFun } from "./birthday-fun";
import { engagementElegant } from "./engagement-elegant";
import { sunnatCelebration } from "./sunnat-celebration";

export type TemplateData = InvitationData & {
    formattedDate: string;
};

export type TemplateFunction = (data: TemplateData) => string;

export const TEMPLATES: Record<string, TemplateFunction> = {
    "wedding-classic": weddingClassic,
    "wedding-modern": weddingModern,
    "osh-traditional": oshTraditional,
    "birthday-fun": birthdayFun,
    "engagement-elegant": engagementElegant,
    "sunnat-celebration": sunnatCelebration,
};

export const TEMPLATE_LIST = [
    {
        id: "wedding-classic",
        name: "Klassik To'y",
        eventTypes: ["WEDDING", "ENGAGEMENT"],
        preview: "Hashamatli, an'anaviy uslubda to'y taklifnomasi",
    },
    {
        id: "wedding-modern",
        name: "Zamonaviy To'y",
        eventTypes: ["WEDDING", "ENGAGEMENT"],
        preview: "Minimal, zamonaviy uslubda to'y taklifnomasi",
    },
    {
        id: "osh-traditional",
        name: "An'anaviy Osh",
        eventTypes: ["OSH", "SUNNAT", "OTHER"],
        preview: "O'zbek an'anaviy uslubida osh/marosim taklifnomasi",
    },
    {
        id: "birthday-fun",
        name: "Tug'ilgan Kun",
        eventTypes: ["BIRTHDAY", "OTHER"],
        preview: "Quvnoq, yorqin tug'ilgan kun taklifnomasi",
    },
    {
        id: "engagement-elegant",
        name: "Nafis Unashtiruv",
        eventTypes: ["ENGAGEMENT", "WEDDING"],
        preview: "Nafis va zamonaviy unashtiruv taklifnomasi",
    },
    {
        id: "sunnat-celebration",
        name: "Sunnat To'yi",
        eventTypes: ["SUNNAT", "OTHER"],
        preview: "Bayramona sunnat to'yi taklifnomasi",
    },
];

