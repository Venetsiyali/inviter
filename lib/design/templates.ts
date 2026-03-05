export interface AppTemplate {
    id: string;
    name: string;
    mood: string;
    imageUrl: string;
    gradient: string;
    tags: string[];
}

export const CANVAS_TEMPLATES: AppTemplate[] = [
    {
        id: "uzbek-gold",
        name: "O'zbek Oltin",
        mood: "An'anaviy va hashamatli",
        imageUrl: "https://image.pollinations.ai/prompt/luxury%20uzbek%20traditional%20invitation%20card%20with%20gold%20ornaments%20and%20dark%20background%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-yellow-900 to-amber-700",
        tags: ["Barchasi", "To'y", "Osh", "Sunnat to'yi", "Yubiley"],
    },
    {
        id: "floral-white",
        name: "Oq Gullar",
        mood: "Romantik va nafis",
        imageUrl: "https://image.pollinations.ai/prompt/elegant%20white%20wedding%20invitation%20card%20with%20pink%20watercolor%20floral%20border%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-pink-200 to-rose-100",
        tags: ["Barchasi", "To'y", "Unashtiruv", "Tug'ilgan kun"],
    },
    {
        id: "luxury-dark",
        name: "Qoʻngʻir Hashamat",
        mood: "Tantanali va ulug'vor",
        imageUrl: "https://image.pollinations.ai/prompt/premium%20dark%20minimalist%20invitation%20card%20with%20gold%20foil%20typography%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-stone-900 to-stone-700",
        tags: ["Barchasi", "To'y", "Osh", "Yubiley"],
    },
    {
        id: "blue-elegant",
        name: "Ko'k Zafarlik",
        mood: "Milliy va nafis",
        imageUrl: "https://image.pollinations.ai/prompt/royal%20navy%20blue%20invitation%20card%20with%20silver%20geometric%20patterns%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-blue-900 to-indigo-700",
        tags: ["Barchasi", "To'y", "Osh", "Sunnat to'yi"],
    },
    {
        id: "rose-gold",
        name: "Atirgul Oltin",
        mood: "Romantik va zamonaviy",
        imageUrl: "https://image.pollinations.ai/prompt/modern%20rose%20gold%20invitation%20card%20with%20glitter%20and%20marble%20texture%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-rose-300 to-pink-400",
        tags: ["Barchasi", "To'y", "Unashtiruv", "Tug'ilgan kun"],
    },
    {
        id: "green-botanical",
        name: "Yashil Botanika",
        mood: "Tabiiy va fresh",
        imageUrl: "https://image.pollinations.ai/prompt/botanical%20emerald%20green%20invitation%20card%20with%20gold%20leaves%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-green-800 to-emerald-600",
        tags: ["Barchasi", "To'y", "Tug'ilgan kun", "Yubiley"],
    },
    {
        id: "purple-luxury",
        name: "Binafsha Hashamat",
        mood: "Qirolona va nafis",
        imageUrl: "https://image.pollinations.ai/prompt/luxurious%20deep%20purple%20invitation%20card%20with%20gold%20mandala%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-purple-900 to-violet-700",
        tags: ["Barchasi", "To'y", "Tug'ilgan kun", "Yubiley"],
    },
    {
        id: "minimal-cream",
        name: "Krem Minimal",
        mood: "Sodda va zamonaviy",
        imageUrl: "https://image.pollinations.ai/prompt/minimalist%20cream%20color%20invitation%20card%20with%20elegant%20typography%20and%20blind%20embossing%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-amber-50 to-stone-100",
        tags: ["Barchasi", "To'y", "Unashtiruv", "Tug'ilgan kun"],
    },
    {
        id: "kids-birthday",
        name: "Bolajon Quvonchi",
        mood: "Quvnoq va yorqin",
        imageUrl: "https://image.pollinations.ai/prompt/cute%20colorful%20kids%20birthday%20invitation%20card%20with%20balloons%20and%20confetti%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-cyan-400 to-blue-500",
        tags: ["Barchasi", "Tug'ilgan kun", "Sunnat to'yi"],
    },
    {
        id: "modern-black",
        name: "Qora Zamonaviy",
        mood: "Minimalist",
        imageUrl: "https://image.pollinations.ai/prompt/ultra%20modern%20matte%20black%20invitation%20card%20with%20silver%20text%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-gray-900 to-black",
        tags: ["Barchasi", "Yubiley", "Korporativ"],
    },
    {
        id: "red-classic",
        name: "Qizil Klassika",
        mood: "Sevgi va Ehtiros",
        imageUrl: "https://image.pollinations.ai/prompt/elegant%20velvet%20red%20invitation%20card%20with%20gold%20borders%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-red-800 to-red-600",
        tags: ["Barchasi", "To'y", "Unashtiruv", "Yubiley"],
    },
    {
        id: "islamic-art",
        name: "Islomiy San'at",
        mood: "Ruhiy va sof",
        imageUrl: "https://image.pollinations.ai/prompt/beautiful%20islamic%20geometric%20art%20invitation%20card%20green%20and%20gold%20portrait?width=576&height=1024&nologo=true",
        gradient: "from-emerald-900 to-teal-800",
        tags: ["Barchasi", "To'y", "Osh", "Sunnat to'yi"],
    }
];

export const GALLERY_CATEGORIES = [
    "Barchasi",
    "To'y",
    "Osh",
    "Tug'ilgan kun",
    "Sunnat to'yi",
    "Unashtiruv",
    "Yubiley",
    "Korporativ"
];
