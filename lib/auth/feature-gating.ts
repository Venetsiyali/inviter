import { getUser } from "./get-user";
import { prisma } from "@/lib/db";

/**
 * Feature Gating - Plan-based restrictions
 */

export interface PlanLimits {
    maxEvents: number;
    canUseAI: boolean;
    canUsePremiumPatterns: boolean;
    canUseCustomFonts: boolean;
    maxGuests: number;
}

export const PLAN_LIMITS: Record<"FREE" | "PREMIUM", PlanLimits> = {
    FREE: {
        maxEvents: 1,
        canUseAI: true, // Basic AI
        canUsePremiumPatterns: false,
        canUseCustomFonts: false,
        maxGuests: 50,
    },
    PREMIUM: {
        maxEvents: 999,
        canUseAI: true,
        canUsePremiumPatterns: true,
        canUseCustomFonts: true,
        maxGuests: 9999,
    },
};

/**
 * Check if user can create new event
 */
export async function canCreateEvent(): Promise<{
    allowed: boolean;
    reason?: string;
    currentCount?: number;
    limit?: number;
}> {
    const user = await getUser();

    if (!user) {
        return { allowed: false, reason: "Login talab qilinadi" };
    }

    // Get user's event count
    const eventCount = await prisma.event.count({
        where: { userId: user.id },
    });

    const limits = PLAN_LIMITS[user.plan];

    if (eventCount >= limits.maxEvents) {
        return {
            allowed: false,
            reason: `${user.plan} plan uchun maksimal tadbirlar soni: ${limits.maxEvents}`,
            currentCount: eventCount,
            limit: limits.maxEvents,
        };
    }

    return {
        allowed: true,
        currentCount: eventCount,
        limit: limits.maxEvents,
    };
}

/**
 * Get user's plan limits
 */
export async function getUserPlanLimits(): Promise<PlanLimits | null> {
    const user = await getUser();
    if (!user) return null;
    return PLAN_LIMITS[user.plan];
}

/**
 * Check if user can use premium feature
 */
export async function checkFeatureAccess(feature: keyof PlanLimits): Promise<boolean> {
    const user = await getUser();
    if (!user) return false;

    const limits = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.FREE;
    // This function assumes features like maxEvents, maxGuests are checked for > 0
    // and boolean features are checked for truthiness.
    // For boolean features, limits[feature] > 0 would evaluate to false if true, and true if false.
    // A more robust check might be:
    // return typeof limits[feature] === 'boolean' ? limits[feature] : limits[feature] > 0;
    // However, following the provided code edit:
    return limits[feature] > 0;
}

/**
 * Check if user can use premium feature
 */
export async function canUsePremiumFeature(
    feature: keyof PlanLimits
): Promise<boolean> {
    const limits = await getUserPlanLimits();
    if (!limits) return false;

    const value = limits[feature];
    return typeof value === "boolean" ? value : true;
}
