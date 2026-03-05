import { prisma } from "@/lib/db";

export type UserPlan = "FREE" | "PRO" | "ADMIN";

/**
 * Check if user has an active premium subscription
 */
export function isPremiumActive(premiumValidUntil: Date | null): boolean {
    if (!premiumValidUntil) return false;
    return premiumValidUntil > new Date();
}

/**
 * Get the effective plan of a user
 */
export function getEffectivePlan(plan: string, premiumValidUntil: Date | null): UserPlan {
    if (plan === "ADMIN") return "ADMIN";
    if (plan === "PRO" && isPremiumActive(premiumValidUntil)) return "PRO";
    return "FREE";
}

/**
 * Check if the user can access premium features
 */
export function canAccessPremium(plan: string, premiumValidUntil: Date | null): boolean {
    const effectivePlan = getEffectivePlan(plan, premiumValidUntil);
    return effectivePlan === "PRO" || effectivePlan === "ADMIN";
}

/**
 * Premium features list
 */
export const PREMIUM_FEATURES = {
    UNLIMITED_RSVP: "unlimited_rsvp",
    PREMIUM_TEMPLATES: "premium_templates",
    CUSTOM_DOMAIN: "custom_domain",
    NO_BRANDING: "no_branding",
    HD_DOWNLOAD: "hd_download",
    ANALYTICS: "analytics",
};

export const FREE_LIMITS = {
    MAX_EVENTS: 3,
    MAX_GUESTS_PER_EVENT: 50,
    templates: ["minimal"],
};

export const PRO_LIMITS = {
    MAX_EVENTS: Infinity,
    MAX_GUESTS_PER_EVENT: Infinity,
    templates: ["minimal", "modern", "milliy", "elegant", "luxury"],
};
