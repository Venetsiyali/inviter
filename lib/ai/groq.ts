import Groq from "groq-sdk";

const EVENT_TYPE_LABELS: Record<string, string> = {
    wedding: "nikoh wedding",
    birthday: "birthday tug'ilgan kun",
    osh: "osh marosimi plov",
    sunnat: "sunnat",
    engagement: "unashtiruv engagement",
    anniversary: "anniversary nikoh yubileyi",
};

const FALLBACK_PROMPTS: Record<string, { prompt: string; style: string; mood: string }[]> = {
    wedding: [
        {
            prompt: "Elegant wedding invitation background, ornate gold mandala patterns on ivory white, delicate rose petals scattered, luxurious silk texture, no text no letters, portrait 9:16, space in center for text overlay",
            style: "Hashamatli Oltin",
            mood: "Romantik va nafis",
        },
        {
            prompt: "Traditional Uzbek wedding invitation background, ikat silk patterns in deep blue and gold, intricate suzani embroidery borders, no text, portrait format 9:16, center clear for text",
            style: "O'zbek Milliy",
            mood: "An'anaviy va ulug'vor",
        },
        {
            prompt: "Modern minimalist wedding background, soft blush pink watercolor wash, thin gold geometric lines, white space in center, no letters no words, portrait 9:16, elegant and clean",
            style: "Zamonaviy Minimal",
            mood: "Nozik va zamonaviy",
        },
        {
            prompt: "Luxurious floral wedding background, lush white garden roses and peonies bouquet arrangement at bottom and top, green leaves, gold borders, no text, portrait 9:16, cream background",
            style: "Gul Bezaklari",
            mood: "Bahorgi va go'zal",
        },
    ],
    birthday: [
        {
            prompt: "Festive birthday party background, colorful confetti and balloons floating, pastel colors pink blue yellow, no text no lettering, portrait 9:16, joyful elegant",
            style: "Bayram Kayfiyati",
            mood: "Quvnoq va yorqin",
        },
        {
            prompt: "Elegant birthday invitation background, gold glitter bokeh lights, dark navy background, subtle stars pattern, no text no words, portrait 9:16, luxury birthday",
            style: "Oltin Naqshlar",
            mood: "Tantanali va hashamatli",
        },
        {
            prompt: "Modern birthday background, geometric pastel shapes, soft gradient purple to pink, abstract artistic, no letters no inscriptions, portrait 9:16",
            style: "Zamonaviy Abstrakt",
            mood: "Zamonaviy va chiroyli",
        },
        {
            prompt: "Cute birthday invitation background, watercolor flowers and butterflies, soft pastel watercolor, no text, portrait 9:16, feminine elegant",
            style: "Gul va Kapalar",
            mood: "Nozik va romantik",
        },
    ],
    osh: [
        {
            prompt: "Traditional Uzbek osh celebration background, ornate blue and gold geometric tilework patterns, arabesque designs, no text no letters, portrait 9:16, rich and festive",
            style: "O'zbek Milliy",
            mood: "Milliy va hashamatli",
        },
        {
            prompt: "Elegant Central Asian feast invitation background, deep burgundy with gold arabesque patterns, silk texture, no text, portrait 9:16, traditional hospitality theme",
            style: "Sharq Uslubi",
            mood: "An'anaviy va tantanali",
        },
        {
            prompt: "Modern Uzbek celebration background, abstract teal and gold patterns inspired by ikat, contemporary design, no letters, portrait 9:16",
            style: "Zamonaviy O'zbek",
            mood: "Zamonaviy va milliy",
        },
        {
            prompt: "Festive osh celebration background, pomegranate flowers and cotton plant botanical illustration, warm orange terracotta colors, no text, portrait 9:16",
            style: "Botanik Naqshlar",
            mood: "Issiq va do'stona",
        },
    ],
    default: [
        {
            prompt: "Elegant invitation card background, gold geometric mandala patterns on white, luxury style, no text no letters, portrait 9:16",
            style: "Hashamatli Klassik",
            mood: "Tantanali va nafis",
        },
        {
            prompt: "Minimalist invitation background, soft gradient colors, delicate line art borders, no text, portrait 9:16",
            style: "Minimal Zamonaviy",
            mood: "Sodda va chiroyli",
        },
        {
            prompt: "Floral elegant invitation background, watercolor roses bouquet, gold accents, cream background, no text no letters, portrait 9:16",
            style: "Gul Bezaklari",
            mood: "Romantik va nafis",
        },
        {
            prompt: "Traditional ornate invitation background, intricate arabesque patterns, rich jewel tones navy and gold, no text, portrait 9:16",
            style: "Sharq Naqshlari",
            mood: "Ulug'vor va klassik",
        },
    ],
};

export async function generateInvitationPrompts(
    userDescription: string,
    eventType: string
): Promise<{ prompt: string; style: string; mood: string }[]> {
    const apiKey = process.env.GROQ_API_KEY;

    // If no API key, return smart fallback immediately
    if (!apiKey || apiKey === "dummy_key" || apiKey.length < 10) {
        console.warn("GROQ_API_KEY not configured, using fallback prompts");
        return FALLBACK_PROMPTS[eventType] || FALLBACK_PROMPTS.default;
    }

    const groq = new Groq({ apiKey });
    const eventLabel = EVENT_TYPE_LABELS[eventType] || eventType;

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a professional invitation designer. Generate 4 distinct image prompts for invitation backgrounds.
RULES: No text/letters/words in images. Portrait 9:16. Center space for text overlay. Each style must be different.
Return JSON: {"designs": [{"prompt": "...", "style": "Uzbek name", "mood": "Uzbek mood"}, ...]}`,
                },
                {
                    role: "user",
                    content: `Event: ${eventLabel}. User wants: "${userDescription}". Generate 4 different background image prompts.`,
                },
            ],
            temperature: 0.8,
            max_tokens: 1500,
            response_format: { type: "json_object" },
        });

        const content = response.choices[0]?.message?.content || "{}";
        const parsed = JSON.parse(content);
        const prompts = parsed.designs || parsed.prompts || (Array.isArray(parsed) ? parsed : []);

        if (prompts.length >= 4) {
            return prompts.slice(0, 4);
        }
        // If Groq returned too few, use fallback
        return FALLBACK_PROMPTS[eventType] || FALLBACK_PROMPTS.default;
    } catch (error) {
        console.error("Groq API error, using fallback:", error);
        return FALLBACK_PROMPTS[eventType] || FALLBACK_PROMPTS.default;
    }
}
