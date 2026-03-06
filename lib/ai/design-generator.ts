import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    },
});

export interface DesignConfig {
    typography: {
        primaryFont: string;
        secondaryFont: string;
        fontWeights: {
            heading: number;
            body: number;
        };
    };
    colorPalette: {
        style: "us-minimalist" | "uk-royal" | "euro-botanical" | "uzbek-modern";
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    layout: {
        type: "centered" | "left-aligned" | "grid";
        spacing: "compact" | "comfortable" | "spacious";
    };
    patterns: {
        primary: string;
        secondary?: string;
        style: "uzbek-adras" | "uzbek-atlas" | "geometric-western" | "minimal";
    };
}

/**
 * Generate invitation design for a specific event
 */
export async function generateInvitationDesign(params: {
    eventType: string;
    title: string;
    date: Date;
    location: string;
    description: string;
}): Promise<DesignConfig> {
    console.log("🎨 Generating invitation design for:", params.eventType, params.title);

    try {
        const design = await generateDesignConfig(params.eventType, "UZ_LAT");
        console.log("✅ Design generated successfully");
        return design;
    } catch (error) {
        console.error("❌ Design generation failed:", error);
        // Return default design on error
        return getDefaultDesignConfig(params.eventType);
    }
}

/**
 * Generate AI-powered design configuration for an event
 */
export async function generateDesignConfig(
    eventType: string,
    locale: "UZ_LAT" | "UZ_CYR" | "RU" = "UZ_LAT",
    userPreferences?: Partial<DesignConfig>
): Promise<DesignConfig> {
    const prompt = buildDesignPrompt(eventType, locale, userPreferences);

    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    try {
        const config = JSON.parse(text) as DesignConfig;
        return config;
    } catch (error) {
        console.error("Failed to parse Gemini response:", error);
        return getDefaultDesignConfig(eventType);
    }
}

function buildDesignPrompt(
    eventType: string,
    locale: string,
    userPreferences?: Partial<DesignConfig>
): string {
    const culturalContext = {
        UZ_LAT: "Uzbek culture with traditional patterns like Adras and Atlas silk, warm hospitality",
        UZ_CYR: "Uzbek culture in Cyrillic script with traditional aesthetics",
        RU: "Russian formal style with elegant typography",
    };

    const eventDescriptions = {
        wedding: "Hashamatli O'zbek to'yi (Wedding) - Premium, elegant, romantic, with rich cultural heritage. High-end modern aesthetic with traditional touches.",
        osh: "Osh marosimi - Traditional, warm, family-oriented morning plov gathering. Use rich, warm colors inspired by Uzbek national cuisine and textiles.",
        lutf: "Lutf/Ma'raka - Respectful, deeply cultural, gracious gathering. Muted, sophisticated tones.",
        birthday: "Tug'ilgan kun - Joyful, dynamic, modern birthday celebration. Fun but elegant and premium.",
        engagement: "Unashtiruv (Engagement) - Romantic, fresh, intimate. Soft pastels combined with rich gold or rose gold accents.",
        circumcision: "Sunnat to'yi - Joyful, culturally significant milestone for a boy. Royal blue, gold, and vibrant colors.",
    };

    return `Siz professionallik darajasida "Premium" web-dizaynersiz. Quyidagi tadbir uchun mukammal va hayratlanarli elektron taklifnoma dizaynini yarating. Qaytarilgan javob FAqat JSON formatida bo'lsin:

Tadbir: ${eventType} (${eventDescriptions[eventType as keyof typeof eventDescriptions] || "Elegant celebration"})
Til Context: ${culturalContext[locale as keyof typeof culturalContext] || culturalContext.UZ_LAT}

Dizayn talablari:
1. Juda hashamatli va mukammal (Premium) ranglar palitrasini tanlang. Hech qachon oddiy qizil yoki oddiy ko'k ranglarni tanlamang.
2. O'zbekona ruhni (Adras, Atlas naqshlari) yoki Zamonaviy Geometrik naqshlarni to'g'ri integratsiya qiling.
3. Tipografiya mukammal o'qilishi va chiroyli serif/sans-serif uyg'unligiga ega bo'lishi kerak.

${userPreferences ? `User Preferences: ${JSON.stringify(userPreferences)}` : ""}

Generate a strict JSON object exactly following this structure:
{
  "typography": {
    "primaryFont": "Choose exclusively from: Playfair Display, Cormorant Garamond, Crimson Text, Lora",
    "secondaryFont": "Choose exclusively from: Montserrat, Inter, Open Sans, Raleway",
    "fontWeights": { "heading": 700, "body": 400 }
  },
  "colorPalette": {
    "style": "One of: us-minimalist, uk-royal, euro-botanical, uzbek-modern",
    "primary": "#hex color (Rich, Deep, Elegant)",
    "secondary": "#hex color (Complementary to primary)",
    "accent": "#hex color (Used for buttons/highlights, often Gold #D4AF37 or Silver #C0C0C0)",
    "background": "#hex color (Very light, elegant, easy on eyes)",
    "text": "#hex color (Very dark, high contrast to background)"
  },
  "layout": {
    "type": "One of: centered, left-aligned, grid",
    "spacing": "One of: compact, comfortable, spacious"
  },
  "patterns": {
    "primary": "Must be exactly one of: 'adras-1', 'atlas-1', 'geometric-1', 'floral-1', 'minimal-1'",
    "secondary": "Optional secondary pattern identifier from the list above",
    "style": "One of: uzbek-adras, uzbek-atlas, geometric-western, minimal"
  }
}

CRITICAL INSTRUCTIONS:
- You must output VALID JSON only. Do not wrap in markdown \`\`\`json blocks.
- The 'patterns.primary' field MUST exactly match the IDs provided.
- Choose 'adras-1' or 'atlas-1' for traditional Uzbek events like 'osh' or 'sunnat'.
- Choose 'floral-1' for 'wedding' or 'engagement'.`;
}

function getDefaultDesignConfig(eventType: string): DesignConfig {
    // Fallback configurations for each event type
    const defaults: Record<string, DesignConfig> = {
        wedding: {
            typography: {
                primaryFont: "Playfair Display",
                secondaryFont: "Montserrat",
                fontWeights: { heading: 700, body: 400 },
            },
            colorPalette: {
                style: "uk-royal",
                primary: "#8B4789",
                secondary: "#C19AC8",
                accent: "#FFD700",
                background: "#FFF9F5",
                text: "#2D1B2E",
            },
            layout: {
                type: "centered",
                spacing: "comfortable",
            },
            patterns: {
                primary: "adras-1",
                style: "uzbek-adras",
            },
        },
        osh: {
            typography: {
                primaryFont: "Lora",
                secondaryFont: "Inter",
                fontWeights: { heading: 700, body: 400 },
            },
            colorPalette: {
                style: "uzbek-modern",
                primary: "#D4AF37",
                secondary: "#8B7355",
                accent: "#E85D04",
                background: "#FFFBF0",
                text: "#3E2723",
            },
            layout: {
                type: "left-aligned",
                spacing: "comfortable",
            },
            patterns: {
                primary: "atlas-1",
                style: "uzbek-atlas",
            },
        },
    };

    return defaults[eventType] || defaults.wedding;
}
