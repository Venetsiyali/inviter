# Database Error Troubleshooting 🔍

## Nimani yuboring:

1. **Terminal'dagi to'liq error** (screenshot yoki copy-paste)
2. **Supabase SQL run natijasi** (SQL run qildingizmi?)
3. **Browser'dagi xatolik** (aniq matn)

---

## Umumiy Xatoliklar:

### 1. "Can't reach database server"
**Sabab:** Tarmoq yetolmayapti  
**Test:** `Test-NetConnection db.vlsuupwvcgcqiwxggeap.supabase.co -Port 5432`  
**Yechim:** VPN ishlatish yoki Supabase REST API

### 2. "Tenant or user not found"
**Sabab:** Password noto'g'ri yoki user yo'q  
**Yechim:** Parolni tekshiring (`InviteUz2024%23`)

### 3. "Table 'User' does not exist"
**Sabab:** SQL run qilinmagan  
**Yechim:** `quick_sql_setup.md` dagi SQL'ni Supabase'da run qiling

### 4. "Module not found: @prisma/client"
**Sabab:** Prisma Client o'rnatilmagan  
**Yechim:** `npm install @prisma/client@5.22.0 --legacy-peer-deps`

### 5. "Invalid username or password"
**Sabab:** Database password noto'g'ri  
**Yechim:** Supabase dashboard'dan to'g'ri parolni oling

---

## Quick Check:

```powershell
# 1. Connection test
Test-NetConnection db.vlsuupwvcgcqiwxggeap.supabase.co -Port 5432

# 2. Prisma Client check
npm list @prisma/client

# 3. .env check
Get-Content .env | Select-String "DATABASE_URL"
```

---

## Menga yuboring:

- Terminal screenshot yoki log
- SQL run qildingizmi? (Ha/Yo'q)
- Qaysi sahifada xatolik? (login/signup/dashboard)

Screenshot eng yaxshi! 📸
