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
        wedding: "Traditional Uzbek wedding (to'y) - festive, colorful, elegant",
        osh: "Osh ceremony - warm, inviting, family-oriented",
        lutf: "Lutf gathering - respectful, gracious, refined",
        birthday: "Birthday celebration - joyful, vibrant, modern",
        engagement: "Engagement ceremony (fotiha) - romantic, traditional",
        circumcision: "Sunnat toy - celebratory, cultural, joyful",
    };

    return `Generate a beautiful, professional invitation design configuration for a ${eventType} event.

Cultural Context: ${culturalContext[locale as keyof typeof culturalContext] || culturalContext.UZ_LAT}
Event Style: ${eventDescriptions[eventType as keyof typeof eventDescriptions] || "Elegant celebration"}

${userPreferences ? `User Preferences: ${JSON.stringify(userPreferences)}` : ""}

Generate a JSON object with the following structure:
{
  "typography": {
    "primaryFont": "Choose from: Playfair Display, Cormorant Garamond, Crimson Text, Lora",
    "secondaryFont": "Choose from: Montserrat, Inter, Open Sans, Raleway",
    "fontWeights": { "heading": 700, "body": 400 }
  },
  "colorPalette": {
    "style": "One of: us-minimalist, uk-royal, euro-botanical, uzbek-modern",
    "primary": "#hex color",
    "secondary": "#hex color",
    "accent": "#hex color",
    "background": "#hex color (light, soft)",
    "text": "#hex color (dark, readable)"
  },
  "layout": {
    "type": "One of: centered, left-aligned, grid",
    "spacing": "One of: compact, comfortable, spacious"
  },
  "patterns": {
    "primary": "Pattern identifier",
    "secondary": "Optional secondary pattern",
    "style": "One of: uzbek-adras, uzbek-atlas, geometric-western, minimal"
  }
}

Guidelines:
- For Uzbek events, prefer uzbek-adras or uzbek-atlas patterns with warm, rich colors
- For modern events, use minimal or geometric-western with contemporary palettes
- Ensure high contrast between text and background for mobile readability
- Choose Google Fonts that support Cyrillic and Latin scripts`;
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
