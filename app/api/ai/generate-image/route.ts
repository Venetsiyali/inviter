import { NextRequest, NextResponse } from "next/server";

// Uses Pollinations.ai - free, no API key needed
// Stable Diffusion models with text-free prompts
export async function POST(request: NextRequest) {
    try {
        const { prompt, index } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt talab qilinadi" }, { status: 400 });
        }

        // Pollinations.ai generates images from prompts, free and fast
        // We add strict no-text instructions to every prompt
        const enhancedPrompt = `${prompt}, absolutely no text, no letters, no words, no inscriptions, no watermarks, portrait orientation 9:16, invitation card background, professional photography, ultra detailed, 8k quality`;

        const seed = Math.floor(Math.random() * 999999) + (index * 12345);

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=576&height=1024&seed=${seed}&nologo=true&enhance=true`;

        return NextResponse.json({
            success: true,
            imageUrl,
            prompt: enhancedPrompt,
        });
    } catch (error: any) {
        console.error("Image generation error:", error);
        return NextResponse.json(
            { error: "Rasm yaratishda xatolik yuz berdi" },
            { status: 500 }
        );
    }
}
