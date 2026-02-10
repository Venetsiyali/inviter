# Environment Variables - Setup Guide

## ⚠️ IMPORTANT: Configure Before Running

Quyidagi `.env` faylini to'ldiring. Aks holda signup ishlamaydi.

## 1. Database (REQUIRED)

### Option A: Supabase PostgreSQL (Recommended)

1. [Supabase.com](https://supabase.com) da account yarating
2. New Project yarating
3. Project Settings → Database → Connection String
4. Copy "URI" string

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Option B: Local PostgreSQL

```bash
# Install PostgreSQL locally
# Then create database
createdb inviteuz

# .env
DATABASE_URL="postgresql://user:password@localhost:5432/inviteuz"
```

### Test Connection:

```bash
npx prisma db push
npx prisma studio
```

---

## 2. Supabase (REQUIRED)

Same project as database:

1. Project Settings → API
2. Copy:
   - Project URL
   - Anon/Public key

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 3. Email (REQUIRED for OTP)

### Option A: Gmail App Password

1. Gmail Settings → Security
2. 2-Step Verification → ON
3. App Passwords → Generate
4. Copy 16-character password

```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="abcd efgh ijkl mnop"  # 16 chars from step 3
EMAIL_FROM="noreply@invite.uz"
```

### Option B: Skip Email (Development)

Verification code terminalda ko'rinadi:

```env
# Leave empty - email will be skipped
# EMAIL_SERVER_HOST=""
# EMAIL_SERVER_USER=""
```

Signup'dan keyin terminal'da:
```
Email send error: ...
Email failed but continuing signup. Code: 123456
```

---

## 4. Gemini AI (ALREADY CONFIGURED)

```env
GEMINI_API_KEY="AIzaSyBCRvOTUjkTJEu3RcZWFPvlnRtDAsqt6o8"
```

✅ Already working

---

## 5. Optional Services

### Telegram Bot
```env
TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
```

### Payments
```env
CLICK_MERCHANT_ID=""
CLICK_SECRET_KEY=""
PAYME_MERCHANT_ID=""
PAYME_SECRET_KEY=""
STRIPE_SECRET_KEY="sk_test_..."
```

---

## Complete .env Template

```env
# ========================================
# REQUIRED - Configure These First
# ========================================

# 1. Database - Use Supabase or Local PostgreSQL
DATABASE_URL="postgresql://postgres.[ref]:[password]@[host].supabase.com:6543/postgres?pgbouncer=true"

# 2. Supabase - Same project as database
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."

# 3. Email - Gmail App Password or skip for dev
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@invite.uz"

# ========================================
# Already Configured
# ========================================

# AI
GEMINI_API_KEY="AIzaSyBCRvOTUjkTJEu3RcZWFPvlnRtDAsqt6o8"

# App
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ========================================
# Optional - Leave Empty for Now
# ========================================

TELEGRAM_BOT_TOKEN=""
CLICK_MERCHANT_ID=""
CLICK_SECRET_KEY=""
PAYME_MERCHANT_ID=""
PAYME_SECRET_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

---

## After Configuration

1. **Update .env file**
2. **Restart dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```
3. **Test signup**:
   - Go to `/auth/signup`
   - Fill form
   - Submit
   - Check terminal for logs

---

## Troubleshooting

### "Ma'lumotlar bazasiga ulanishda xatolik"

- DATABASE_URL noto'g'ri
- Supabase project to'xtatilgan
- Network connection yo'q

### Email not sent (but signup works)

- EMAIL credentials noto'g'ri
- Gmail App Password ishlatilmagan
- Development mode - kod terminalda

### Prisma errors

```bash
npx prisma generate
npx prisma db push
```

---

✅ Minimal Setup (Quick Start):

1. DATABASE_URL (Supabase)
2. NEXT_PUBLIC_SUPABASE_*
3. Skip email - check terminal for code
