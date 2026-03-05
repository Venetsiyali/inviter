import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy_key",
});

const EVENT_TYPE_PROMPTS: Record<string, string> = {
    wedding: "wedding/nikoh marosimi",
    birthday: "birthday/tug'ilgan kun",
    osh: "osh marosimi/plov ziyofati",
    sunnat: "sunnat to'yi",
    engagement: "unashtiruv marosimi",
    anniversary: "nikoh yubileyi",
};

export async function generateInvitationPrompts(
    userDescription: string,
    eventType: string
): Promise<{ prompt: string; style: string; mood: string }[]> {
    const eventLabel = EVENT_TYPE_PROMPTS[eventType] || eventType;

    const systemPrompt = `You are a professional invitation card designer specializing in creating stunning visual concepts. 
Your task is to generate 4 DISTINCT image prompts for invitation card backgrounds.

CRITICAL RULES:
1. NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS in any image
2. Portrait orientation only (9:16 ratio) 
3. Design elements must NOT cover central areas (leave space for names, date, location text)
4. Each prompt must be in a completely different style
5. Prompts must be in English, highly detailed, professional

Return ONLY a valid JSON array with exactly 4 objects:
[
  {
    "prompt": "detailed english image prompt here, absolutely NO TEXT OR LETTERS, portrait 9:16 ratio invitation background...",
    "style": "Style Name in Uzbek",
    "mood": "Kayfiyat tavsifi o'zbek tilida"
  }
]`;

    const userPrompt = `Event type: ${eventLabel}
User's description (in Uzbek): "${userDescription}"

Generate 4 COMPLETELY DIFFERENT invitation background prompts based on this description.
Styles must be diverse: e.g., Traditional Uzbek, Modern Minimalist, Floral Elegant, Luxury Gold.
Each background must have space in the center/bottom for text overlay.
ABSOLUTELY NO TEXT, LETTERS, OR INSCRIPTIONS in the images.`;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 2048,
        response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || "[]";

    try {
        const parsed = JSON.parse(content);
        const prompts = Array.isArray(parsed) ? parsed : parsed.prompts || parsed.designs || [];
        return prompts.slice(0, 4);
    } catch {
        // Fallback prompts if JSON parsing fails
        return [
            {
                prompt: `Elegant ${eventLabel} invitation background, ornate Uzbek ikat textile patterns in gold and deep blue, no text, portrait orientation, smooth silk texture, decorative borders`,
                style: "O'zbek Milliy",
                mood: "An'anaviy va hashamatli",
            },
            {
                prompt: `Minimalist modern ${eventLabel} invitation background, soft white and blush pink watercolor wash with delicate gold geometric lines, no letters, portrait 9:16, clean elegant space`,
                style: "Zamonaviy Minimal",
                mood: "Nozik va zamonaviy",
            },
            {
                prompt: `Luxurious ${eventLabel} invitation background, lush white roses and peonies arrangement, gold leaf accents, cream background, no text or writing, portrait orientation`,
                style: "Gul Dekoratsiyasi",
                mood: "Romantik va nafis",
            },
            {
                prompt: `Royal ${eventLabel} invitation background, rich burgundy with gold foil geometric mandalas, intricate arabesques, deep jewel tones, no letters, portrait 9:16 ratio`,
                style: "Qirollik Uslubi",
                mood: "Tantanali va ulug'vor",
            },
        ];
    }
}
