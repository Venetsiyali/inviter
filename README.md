# 🎉 Inviter.uz - Raqamli Taklifnoma Platformasi

**Inviter.uz** - bu zamonaviy, AI texnologiyalari bilan jihozlangan raqamli taklifnoma yaratish platformasi. To'ylar, tug'ilgan kunlar va boshqa tadbirlar uchun chiroyli taklifnomalarni bir necha daqiqada yarating!

## ✨ Asosiy Imkoniyatlar

- 🎨 **AI Dizayn** - Gemini AI yordamida avtomatik chiroyli dizayn yaratish
- 📱 **QR Kod** - Oson ulashish uchun QR kod
- 📤 **Ijtimoiy Tarmoqlar** - Telegram, WhatsApp, Facebook'da ulashing
- ✅ **RSVP Tizimi** - Mehmonlar "Kelaman/Kelmayman" javob beradi
- 🌐 **3 Til** - O'zbek (Lotin), O'zbek (Kirill), Rus
- 🎭 **Ko'p Tadbir Turlari** - To'y, Tug'ilgan kun, Fotiha, Osh, Sunnat to'yi va boshqalar

## 🚀 Texnologiyalar

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon.tech production) / SQLite (development)
- **Auth:** Lucia Auth
- **AI:** Google Gemini 1.5 Pro
- **Deployment:** Vercel

## 📦 O'rnatish

### 1. Repozitoriyani Clone qiling

```bash
git clone https://github.com/Venetsiyali/inviter.git
cd inviter
```

### 2. Paketlarni o'rnating

```bash
npm install
```

### 3. Environment o'zgaruvchilarni sozlang

`.env` fayl yarating:

```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# Database (Production - Neon PostgreSQL)
# DATABASE_URL="postgresql://user:password@host/database"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database'ni sozlang

```bash
npx prisma generate
npx prisma db push
```

### 5. Admin foydalanuvchi yarating

```bash
node scripts/create-admin.js
```

### 6. Development serverni ishga tushiring

```bash
npm run dev
```

Brauzeringizda `http://localhost:3000` ochiladi.

## 🔑 Default Admin Login

- **Email:** admin@Inviter.uz
- **Parol:** InviteUz2024#

## 📂 Loyiha Strukturasi

```
Inviter.uz/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # User dashboard
│   ├── events/       # Event management
│   └── Inviter/       # Public invitation pages
├── components/       # React components
├── lib/
│   ├── ai/          # AI design generation
│   ├── auth/        # Authentication logic
│   └── db.ts        # Prisma client
├── prisma/
│   └── schema.prisma # Database schema
└── locales/         # Translations (UZ/RU)
```

## 🌐 Production Deployment

### Vercel'ga Deploy

1. GitHub repozitoriyangizni Vercel'ga ulang
2. Environment o'zgaruvchilarni qo'shing:
   - `DATABASE_URL` (Neon PostgreSQL)
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
3. Deploy!

### Database Migration

Production'da Neon.tech PostgreSQL ishlatiladi:

```bash
# schema.prisma'da provider'ni o'zgartiring
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# Migration qiling
npx prisma migrate deploy
```

## 🎯 Foydalanish

1. **Ro'yxatdan o'ting** yoki **Tizimga kiring**
2. **"Yangi tadbir yaratish"** tugmasini bosing
3. Tadbir ma'lumotlarini kiriting (tur, sarlavha, sana, joy)
4. AI avtomatik chiroyli dizayn yaratadi
5. QR kod va ommaviy havolani oling
6. Telegram/WhatsApp'da ulashing!
7. Mehmonlar RSVP javob beradi

## 🛠️ Development

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Lint code
```

### Database Commands

```bash
npx prisma generate    # Generate Prisma Client
npx prisma db push     # Push schema to database
npx prisma studio      # Visual database editor
```

## 📝 License

MIT License

## 👨‍💻 Muallif

**Inviter.uz Team**

---

**🎉 Taklifnomalaringizni yanada chiroyli qiling! Inviter.uz bilan.**
