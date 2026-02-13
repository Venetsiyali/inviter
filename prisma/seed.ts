import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogPosts = [
    {
        slug: "toy-taklifnomasi-matnlari",
        title: "To'y taklifnomasi uchun eng chiroyli o'zbekcha matnlar to'plami",
        excerpt: "To'y - inson hayotidagi eng unutilmas damlardan biri. Professional va samimiy taklifnoma matnlari to'plamini taqdim etamiz.",
        category: "Yo'riqnoma",
        keywords: ["to'y taklifnomasi", "nikoh taklifnomasi", "taklifnoma matnlari", "o'zbekcha taklifnoma", "to'y", "nikoh"],
        readTime: "5 daqiqa",
        author: "Rustamjon Nasridinov",
        content: `To'y — inson hayotidagi eng hayajonli va unutilmas damlardan biri. Ushbu tantananing ilk qadami esa yaqinlaringizga yuboriladigan taklifnomadan boshlanadi. To'g'ri tanlangan so'zlar mehmonda tantanangiz haqida ilk ijobiy taassurotni uyg'otadi. Bugun biz Invite.uz jamoasi bilan birgalikda turli uslubdagi eng sara taklifnoma matnlarini to'pladik.

## 1. Klassik va an'anaviy matnlar (Ota-onalar nomidan)

Bu uslub ko'proq kattalarga, qarindoshlarga va hurmatli mehmonlarga yuboriladi. Unda samimiylik va chuqur ehtirom aks etadi.

**Misol 1:**
> "Bismillohir Rohmanir Rohiym. Farzandlarimiz kamolini ko'rmoq har bir ota-onaning eng ezgu niyati. Shunday ekan, o'g'limiz [Ism] va qizimiz [Ism]ning nikoh to'yiga siz kabi aziz mehmonimizni lutfan taklif etamiz. Sizning tashrifingiz biz uchun chinakam baxtdir!"

**Misol 2:**
> "Hurmatli mehmonlarimiz! Farzandlarimizning baxtli hayot yo'liga qadam qo'yayotgan paytida sizlarning marhamat tashrifi bizni quvontiradi. [Sana] kuni soat [Vaqt]da [Manzil]da bo'lib o'tadigan to'y marosimiga taklif qilamiz."

## 2. Romantik va zamonaviy matnlar (Yoshlar nomidan)

Agar taklifnoma zamonaviy uslubda bo'lsa va asosan do'stlarga yuborilsa, matn qisqa va hissiyotlarga boy bo'lishi maqsadga muvofiq.

**Soddalik va nafosat:**
> "Ikki qalb birlashuvi — yangi bir hayot ibtidosi. Quvonchimizga sherik bo'ling!"

**Hissiyot:**
> "Biz birgalikda yangi yo'lga qadam qo'ymoqdamiz. Ushbu tarixiy lahzada yonimizda bo'lishingiz bizni shod etadi."

**Zamonaviy:**
> "Sevgi bizni birlashtirdi. Baxt bizni kelajakka olib bormoqda. Ushbu muhim kunda yonimizda bo'ling! 💕"

## 3. She'riy va badiiy matnlar

O'zbek xalqi she'riyatni sevadi. Chiroyli to'rtliklar taklifnomaga alohida fayz bag'ishlaydi.

> Ikki yoshning ahdu paymoni bo'lur,
> Xonadonlar shodlik va nurg'a to'lur.
> Bu quvonchli kunda sizdek azizlar,
> Tashrif buyursangiz baxtimiz kular!

**Yana bir she'riy namuna:**

> Muhabbat uyi qurilmoqda bugun,
> Ikki yosh birlashar mehr-u suygun.
> Bu bayrami azizlarga taklif,
> Mehriboningiz bo'lsin doim qalbing.

## 4. Nima uchun matn tanlashda AI texnologiyasidan foydalanish kerak?

An'anaviy qog'oz taklifnomalarda matnni o'zgartirish imkoniyati yo'q. Ammo **Invite.uz platformasi** orqali siz Sun'iy intellekt yordamida har bir mehmonga alohida, personalizatsiya qilingan matnlar yaratishingiz mumkin.

### Invite.uz afzalliklari:

✅ **Tezlik:** 2 daqiqa ichida tayyor taklifnoma yaratish
✅ **Ekspertiza:** TATU mutaxassislari tomonidan ishlab chiqilgan algoritm
✅ **QR-kod:** Mehmonlar uchun manzil va vaqtni aniq ko'rsatuvchi raqamli tizim
✅ **Personalizatsiya:** Har bir mehmon uchun individual matn
✅ **Ekologik:** Qog'oz sarflamasdan raqamli taklifnomalar

## Taklifnoma matnini tanlashda maslahatlar

1. **Mehmon kontingentini hisobga oling** - Yoshlarga zamonaviy, kattarga an'anaviy uslub
2. **Qisqa va lo'nda yozing** - Asosiy ma'lumotlar: kim, qachon, qayer
3. **Samimiy bo'ling** - Yurakdan chiqqan so'zlar har doim ta'sir qiladi
4. **Dizayn bilan uyg'unlashtirishni unutmang** - Matn va dizayn bir-birini to'ldirishi kerak

---

## Hoziroq o'z taklifnomangizni yarating!

Invite.uz platformasi yordamida yuqoridagi matnlardan birini tanlab, uni professional dizayn bilan birlashtirishingiz mumkin. AI texnologiyasi sizga eng mos matnni tavsiya qiladi va uni chiroyli qilib bezatadi.

**[Bepul boshlash →](/auth/signup)**`,
    },
    {
        slug: "ai-dizayn-transformatsiyasi",
        title: "Raqamli transformatsiya: Sun'iy intellekt taklifnomalar dizaynini qanday o'zgartirmoqda?",
        excerpt: "AI texnologiyalari grafik dizaynda inqilob yasadi. Generativ modellar, giper-personalizatsiya va zamonaviy texnologik yechimlar haqida.",
        category: "Texnologiya",
        keywords: ["AI dizayn", "sun'iy intellekt", "generativ dizayn", "taklifnoma dizayni", "Google Gemini", "personalizatsiya"],
        readTime: "7 daqiqa",
        author: "Rustamjon Nasridinov",
        content: `An'anaviy dizayn jarayoni uzoq vaqt va katta resurslarni talab qiladi. Biroq, bugungi kunda Sun'iy intellekt (AI) nafaqat matn yozish, balki grafik dizayn va shaxsiy kommunikatsiya sohalarida ham inqilob yasamoqda. Invite.uz platformasi misolida biz AI texnologiyalarining taklifnomalar olamini qanday o'zgartirayotganini tahlil qilamiz.

## 1. Generativ dizayn: Cheksiz ijod imkoniyati

Ilgari dizayner bitta taklifnoma ustida soatlab ishlagan bo'lsa, bugun **generativ modellar** (masalan, Google Gemini AI) bir necha soniya ichida yuzlab noyob variantlarni taklif qilishi mumkin. Bu texnologiya foydalanuvchining xohishidan kelib chiqib, ranglar uyg'unligi, shriftlar va vizual elementlarni avtomatik ravishda moslashtiradi.

### Generativ dizaynning afzalliklari:

- ⚡ **Tezlik:** Soniyalar ichida professional dizayn
- 🎨 **Xilma-xillik:** Yuzlab noyob variantlar
- 🎯 **Moslashuvchanlik:** Foydalanuvchi xohishiga qarab o'zgaradi
- 💡 **Kreativlik:** Inson fikriga kelmagan dizayn yechimlar

## 2. Giper-personalizatsiya (Hyper-personalization)

AI dizaynning eng katta ustunligi — **har bir mehmon uchun individual yondashuvdir**. Invite.uz tizimi yordamida har bir taklifnoma mehmonga xos bo'lgan ohang va uslubda yaratiladi.

**[O'z AI taklifnomangizni yarating →](/auth/signup)**`,
    },
    {
        slug: "raqamli-pedagogika-tadbirlar",
        title: "Raqamli pedagogika va texnologik konvergentsiya: Tadbirlarni boshqarishda AI hamda QR tizimlarining innovatsion o'rni",
        excerpt: "Akademik yondashuv: Raqamli pedagogika tamoyillarini tadbirlarni boshqarishga qo'llash. TATU tadqiqotlari asosida.",
        category: "Akademik",
        keywords: ["raqamli pedagogika", "event management", "QR texnologiyasi", "AI tadbirlar", "TATU", "innovatsiya"],
        readTime: "10 daqiqa",
        author: "Rustamjon Nasridinov",
        content: `Zamonaviy ta'lim va xizmat ko'rsatish sohalari raqamli transformatsiya davriga qadam qo'ydi. **Raqamli pedagogika** nafaqat dars o'tish usullarini, balki ijtimoiy munosabatlar va tadbirlarni tashkil etish madaniyatini ham tubdan isloh qilmoqda.

**[Professional taklifnoma yarating →](/auth/signup)**

**[Loyiha haqida batafsil →](/about)**`,
    },
];

async function main() {
    console.log('🌱 Seeding blog posts...');

    for (const post of blogPosts) {
        const created = await prisma.post.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                keywords: post.keywords,
                readTime: post.readTime,
                author: post.author,
                published: true,
            },
            create: {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                keywords: post.keywords,
                readTime: post.readTime,
                author: post.author,
                published: true,
            },
        });
        console.log(`✅ Created/Updated post: ${created.title}`);
    }

    console.log('✅ Blog seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding blog posts:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
