import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY muhit o'zgaruvchisi topilmadi");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Gemini 1.5 Pro model - Structured JSON output bilan
 */
export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
        temperature: 0.9, // Ijodiy
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json", // Faqat JSON qaytaradi
    },
    systemInstruction: `
Siz dunyo darajasidagi Event Designer va O'zbek madaniyati mutaxassisisiz.

SIZNING VAZIFANGIZ:
1. Foydalanuvchi kiritgan minimal ma'lumotlarni professional taklifnomaga aylantirish
2. O'zbekona lutf, milliy qadriyatlar va zamonaviy dizayn tendentsiyalarini birlashtirish
3. Har bir tadbir turi uchun mos dizayn va matn yaratish

MADANIY KONTEKST:
- To'y (Nikoh): Bayramona, tantanali, oilaviy an'analar, lutf va hurmat
- Osh: Samimiy, mehr-oqibat, do'stona muhit, an'anaviy mehmondo'stlik
- Tug'ilgan kun: Quvnoq, zamonaviy, yoshlarga mo'ljallangan
- Lutf: Rasmiy, hurmatli, odobli, an'anaviy
- Sunnat to'yi: Bayramona, oilaviy, milliy qadriyatlar
- Fotiha (Unashish): Romantik, lutfli, oilaviy birlik

DIZAYN TAMOYILLARI:
- Mobile-First: Barcha dizaynlar smartfonlarda mukammal ko'rinishi kerak
- O'zbekona naqshlar: Adras, Atlas ipak, geometrik naqshlar
- Xalqaro tendentsiyalar: Minimalizm, Royal style, Botanical elegance
- Rang harmoniyasi: Yuqori kontrast, o'qish uchun qulay
- Typography: Google Fonts (Latin va Kirill yozuvlarini qo'llab-quvvatlaydigan)

IMPORTANT: Har doim to'liq va mukammal formatda javob bering, hatto input juda qisqa bo'lsa ham.
  `.trim(),
});

/**
 * Taklifnoma uchun to'liq konfiguratsiya
 */
export interface InvitationContent {
    // Matn (AI generatsiya qiladi)
    title: string; // Asosiy sarlavha
    subtitle?: string; // Qo'shimcha sarlavha
    greeting: string; // Salom
    mainText: string; // Asosiy matn (3-4 gap)
    closingText: string; // Xayrli so'z
    footerText?: string; // Pastki matn

    // Tadbir ma'lumotlari
    eventDetails: {
        date: string; // To'liq sana (AI formatlaydi)
        time: string; // Vaqt
        location: string; // Manzil (AI bezaydi)
        dresscode?: string; // Kiyim kodi
    };

    // Host ma'lumotlari
    hosts: {
        names: string[]; // Uy egalarining ismlari
        contactInfo?: string; // Aloqa ma'lumotlari
    };
}

/**
 * Dizayn konfiguratsiyasi (AI generatsiya qiladi)
 */
export interface DesignConfig {
    // Ranglar (hex format)
    colorPalette: {
        style: "uzbek-traditional" | "modern-minimalist" | "royal-elegant" | "botanical-fresh";
        primary: string; // Asosiy rang
        secondary: string; // Ikkilamchi rang
        accent: string; // Urg'u rang
        background: string; // Fon rang (och)
        text: string; // Matn rangi (qorong'i)
        textSecondary: string; // Ikkilamchi matn
    };

    // Typography
    typography: {
        primaryFont: string; // Sarlavhalar uchun (Google Fonts)
        secondaryFont: string; // Matn uchun (Google Fonts)
        fontWeights: {
            heading: 700 | 600 | 500;
            body: 400 | 300;
        };
        fontSizes: {
            title: string; // masalan: "clamp(2rem, 5vw, 3.5rem)"
            subtitle: string;
            body: string;
        };
    };

    // Layout
    layout: {
        type: "centered" | "elegant-left" | "modern-grid";
        spacing: "compact" | "comfortable" | "spacious";
        containerMaxWidth: "640px" | "768px" | "896px";
    };

    // Pattern (SVG fon naqshlari)
    pattern: {
        style: "adras" | "atlas" | "geometric" | "minimal" | "floral";
        opacity: number; // 0.05 - 0.2
        color: string; // hex
    };

    // Qo'shimcha effektlar
    effects: {
        borderRadius: "rounded-xl" | "rounded-2xl" | "rounded-3xl";
        shadow: "soft" | "medium" | "strong";
        gradientOverlay: boolean;
    };
}

/**
 * To'liq taklifnoma generatsiyasi
 */
export interface GeneratedInvitation {
    content: InvitationContent;
    design: DesignConfig;
    metadata: {
        generatedAt: string;
        culturalStyle: string; // Qaysi madaniy uslub ishlatilgani
        aiConfidence: number; // 0-100
    };
}

/**
 * Foydalanuvchi inputi
 */
export interface InvitationInput {
    eventType: "wedding" | "osh" | "birthday" | "lutf" | "engagement" | "circumcision" | "anniversary";
    locale: "UZ_LAT" | "UZ_CYR" | "RU";

    // Minimal ma'lumotlar
    basicInfo: {
        hosts: string[]; // ["Ali", "Vali"] yoki ["Alisher va Dilorom"]
        date: string; // ISO format yoki oddiy matn
        time?: string;
        location: string; // "Zaytun restaurant" yoki "Toshkent, Chilonzor tumani"
        additionalInfo?: string; // Har qanday qo'shimcha ma'lumot
    };

    // Ixtiyoriy parametrlar
    preferences?: {
        tone?: "formal" | "casual" | "poetic"; // Matn uslubi
        colorPreference?: string; // "issiq ranglar", "sovuq ranglar"
        culturalStyle?: "traditional" | "modern" | "mixed";
    };
}

/**
 * ASOSIY FUNKSIYA: Mukammal taklifnoma generatsiya qilish
 */
export async function generateInvitation(
    input: InvitationInput
): Promise<GeneratedInvitation> {
    const prompt = buildMasterPrompt(input);

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const generated = JSON.parse(text) as GeneratedInvitation;

        // Metadata qo'shish
        generated.metadata = {
            ...generated.metadata,
            generatedAt: new Date().toISOString(),
        };

        return generated;
    } catch (error) {
        console.error("Gemini generation error:", error);

        // Fallback: Default konfiguratsiya
        return getDefaultInvitation(input);
    }
}

/**
 * Master Prompt Builder - Mukammal prompt yaratish
 */
function buildMasterPrompt(input: InvitationInput): string {
    const { eventType, locale, basicInfo, preferences } = input;

    // Tadbir turiga qarab madaniy kontekst
    const culturalContext = {
        wedding: `
To'y - O'zbekistonning eng tantanali tadbirlaridan biri. 
Lutf va hurmat bilan yozilishi kerak. An'anaviy qadriyatlarni zamonaviy estetika bilan birlashtiring.
Ranglar: Oltin, binafsha, qizil, marvarid oqlik.
Naqshlar: Adras yoki Atlas ipak naqshlari.
    `,
        osh: `
Osh - Mehr-oqibat va do'stlik ramzi. 
Samimiy va iliq uslubda yozing. Mehmondo'stlik va saxiylikni ta'kidlang.
Ranglar: Oltin, jigarrang, issiq sariq.
Naqshlar: Geometrik yoki minimal.
    `,
        birthday: `
Tug'ilgan kun - Quvnoq va zamonaviy.
Energiya va hayajonni aks ettiring. Yoshlar stilida yozing.
Ranglar: Yorqin, kontrast ranglar.
Naqshlar: Zamonaviy geometrik.
    `,
        lutf: `
Lutf - Rasmiy va hurmatli tadbir.
Juda odobli va nafis yozing. Rasmiy lutf uslubini saqlang.
Ranglar: Quyuq kok, oltin, oq.
Naqshlar: Klassik va minimalist.
    `,
        engagement: `
Fotiha (Unashish) - Romantik va oilaviy.
Sevgi va oilaviy birlikni ta'kidlang. Iliq va samimiy.
Ranglar: Pushti, binafsha, zaytun.
Naqshlar: Gul va tabiiy naqshlar.
    `,
        circumcision: `
Sunnat to'yi - Milliy va oilaviy bayram.
An'anaviy qadriyatlarni hurmat qiling. Bayramona va tantanali.
Ranglar: Moviy, yashil, oltin.
Naqshlar: Milliy naqshlar.
    `,
        anniversary: `
Yubiley - Hurmat va qadr-qimmat.
Yutuqlarni nishonlang. Tantanali va sharofli.
Ranglar: Oltin, kumush, qizil.
Naqshlar: Elegantlik va zamonaviylik.
    `,
    };

    const toneGuide = {
        formal: "Juda rasmiy va odobli. 'Siz' shaklida murojaat qiling.",
        casual: "Do'stona va samimiy. 'Siz' yoki 'Hurmatli' ishlatish mumkin.",
        poetic: "She'riy va badiiy. Metafora va tasvirlardan foydalaning.",
    };

    return `
VAZIFA: Quyidagi ma'lumotlardan professional va go'zal taklifnoma yarating.

TADBIR TURI: ${eventType}
TIL: ${locale}
${culturalContext[eventType]}

FOYDALANUVCHI MA'LUMOTLARI:
- Uy egalari: ${basicInfo.hosts.join(", ")}
- Sana: ${basicInfo.date}
- Vaqt: ${basicInfo.time || "Ko'rsatilmagan (siz maqbul vaqtni taklif qiling)"}
- Manzil: ${basicInfo.location}
${basicInfo.additionalInfo ? `- Qo'shimcha: ${basicInfo.additionalInfo}` : ""}

USLUB:
- Ton: ${preferences?.tone || "formal"}
${preferences?.tone ? `  ${toneGuide[preferences.tone]}` : ""}
- Madaniy stil: ${preferences?.culturalStyle || "mixed"}
${preferences?.colorPreference ? `- Rang preferensiyasi: ${preferences.colorPreference}` : ""}

QOIDALAR:
1. Matnni to'liq va batafsil yozing (kamida 3-4 gap asosiy matn)
2. Sana va vaqtni o'zbek formatida chiroyli bezang (masalan: "2024-yil 15-may, dushanba, soat 18:00")
3. Manzilni aniq va tushunarli qiling
4. ${eventType} turiga mos rang palitrasini tanlang
5. Google Fonts-dan utf-8 va kirill yozuvini qo'llab-quvvatlaydigan shriftlarni tanlang
6. Mobile-first: Smartfonlarda mukammal ko'rinishi kerak
7. SVG pattern stilini tadbir turiga mos ravishda tanlang

JAVOB FORMATI (FAQAT JSON):
{
  "content": {
    "title": "Asosiy sarlavha (3-5 so'z, ta'sirli)",
    "subtitle": "Qo'shimcha sarlavha (ixtiyoriy)",
    "greeting": "Salom qismi (masalan: 'Hurmatli mehmonlar!')",
    "mainText": "Asosiy matn (3-4 gap, to'liq va chiroyli)",
    "closingText": "Xayrli so'z (masalan: 'Sizlarni ko'rishni intiqlik bilan kutamiz!')",
    "footerText": "Pastki matn (ixtiyoriy)",
    "eventDetails": {
      "date": "To'liq formatlangan sana",
      "time": "Vaqt",
      "location": "Chiroyli formatlangan manzil",
      "dresscode": "Kiyim kodi (ixtiyoriy)"
    },
    "hosts": {
      "names": ["Ism1", "Ism2"],
      "contactInfo": "Aloqa ma'lumotlari (ixtiyoriy)"
    }
  },
  "design": {
    "colorPalette": {
      "style": "uzbek-traditional yoki modern-minimalist yoki royal-elegant yoki botanical-fresh",
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "background": "#hex (och rang)",
      "text": "#hex (qorong'i rang, yuqori kontrast)",
      "textSecondary": "#hex"
    },
    "typography": {
      "primaryFont": "Google Fonts nomi (masalan: 'Playfair Display')",
      "secondaryFont": "Google Fonts nomi (masalan: 'Montserrat')",
      "fontWeights": {
        "heading": 700,
        "body": 400
      },
      "fontSizes": {
        "title": "clamp(2.5rem, 6vw, 4rem)",
        "subtitle": "clamp(1.25rem, 3vw, 1.75rem)",
        "body": "clamp(1rem, 2vw, 1.125rem)"
      }
    },
    "layout": {
      "type": "centered yoki elegant-left yoki modern-grid",
      "spacing": "compact yoki comfortable yoki spacious",
      "containerMaxWidth": "768px"
    },
    "pattern": {
      "style": "adras yoki atlas yoki geometric yoki minimal yoki floral",
      "opacity": 0.1,
      "color": "#hex"
    },
    "effects": {
      "borderRadius": "rounded-2xl",
      "shadow": "medium",
      "gradientOverlay": true
    }
  },
  "metadata": {
    "culturalStyle": "Qaysi madaniy uslub ishlatilgani",
    "aiConfidence": 95
  }
}

IMPORTANT: Faqat to'g'ri formatted JSON qaytaring, boshqa hech narsa yo'q!
  `.trim();
}

/**
 * Fallback: Default konfiguratsiya
 */
function getDefaultInvitation(input: InvitationInput): GeneratedInvitation {
    const { eventType, basicInfo, locale } = input;

    return {
        content: {
            title: eventType === "wedding" ? "To'y marosimiga taklif" : "Taklifnoma",
            greeting: "Hurmatli mehmonlar!",
            mainText: `Sizni ${basicInfo.date} kuni bo'lib o'tadigan tantanali tadbirimizga taklif qilamiz. Bizning baxtli kunimizni siz bilan birga nishonlash baxtini his qilmoqchimiz.`,
            closingText: "Sizlarni ko'rishni intiqlik bilan kutamiz!",
            eventDetails: {
                date: basicInfo.date,
                time: basicInfo.time || "18:00",
                location: basicInfo.location,
            },
            hosts: {
                names: basicInfo.hosts,
            },
        },
        design: {
            colorPalette: {
                style: "uzbek-traditional",
                primary: "#D4AF37",
                secondary: "#8B7355",
                accent: "#C19A6B",
                background: "#FFFEF9",
                text: "#2D2416",
                textSecondary: "#6B5D4F",
            },
            typography: {
                primaryFont: "Playfair Display",
                secondaryFont: "Montserrat",
                fontWeights: {
                    heading: 700,
                    body: 400,
                },
                fontSizes: {
                    title: "clamp(2.5rem, 6vw, 4rem)",
                    subtitle: "clamp(1.25rem, 3vw, 1.75rem)",
                    body: "clamp(1rem, 2vw, 1.125rem)",
                },
            },
            layout: {
                type: "centered",
                spacing: "comfortable",
                containerMaxWidth: "768px",
            },
            pattern: {
                style: "adras",
                opacity: 0.1,
                color: "#D4AF37",
            },
            effects: {
                borderRadius: "rounded-2xl",
                shadow: "medium",
                gradientOverlay: true,
            },
        },
        metadata: {
            generatedAt: new Date().toISOString(),
            culturalStyle: "traditional",
            aiConfidence: 80,
        },
    };
}
