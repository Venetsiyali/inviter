-- ============================================
-- Invite.uz - Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. User Table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "passwordHash" TEXT NOT NULL,
  "emailVerified" BOOLEAN NOT NULL DEFAULT false,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "plan" TEXT NOT NULL DEFAULT 'FREE',
  "telegramChatId" TEXT,
  "telegramUsername" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Session Table (Lucia Auth)
CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Email Verification Code
CREATE TABLE IF NOT EXISTS "EmailVerificationCode" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "EmailVerificationCode_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. Event Table
CREATE TABLE IF NOT EXISTS "Event" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "date" TIMESTAMP(3) NOT NULL,
  "location" TEXT NOT NULL,
  "eventType" TEXT NOT NULL DEFAULT 'wedding',
  "guestCount" INTEGER,
  "design" JSONB,
  "qrCode" TEXT,
  "publicUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Guest Table
CREATE TABLE IF NOT EXISTS "Guest" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "eventId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "email" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "plusOnes" INTEGER NOT NULL DEFAULT 0,
  "notes" TEXT,
  "rsvpDate" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Guest_eventId_fkey" FOREIGN KEY ("eventId") 
    REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. Click Transaction (Donation)
CREATE TABLE IF NOT EXISTS "ClickTransaction" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "eventId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'UZS',
  "status" TEXT NOT NULL DEFAULT 'pending',
  "guestName" TEXT,
  "guestPhone" TEXT,
  "transactionId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ClickTransaction_eventId_fkey" FOREIGN KEY ("eventId") 
    REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 7. Payme Transaction (Donation)
CREATE TABLE IF NOT EXISTS "PaymeTransaction" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "eventId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'UZS',
  "status" TEXT NOT NULL DEFAULT 'pending',
  "guestName" TEXT,
  "guestPhone" TEXT,
  "transactionId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymeTransaction_eventId_fkey" FOREIGN KEY ("eventId") 
    REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "EmailVerificationCode_userId_idx" ON "EmailVerificationCode"("userId");
CREATE INDEX IF NOT EXISTS "Event_userId_idx" ON "Event"("userId");
CREATE INDEX IF NOT EXISTS "Event_publicUrl_idx" ON "Event"("publicUrl");
CREATE INDEX IF NOT EXISTS "Guest_eventId_idx" ON "Guest"("eventId");
CREATE INDEX IF NOT EXISTS "ClickTransaction_eventId_idx" ON "ClickTransaction"("eventId");
CREATE INDEX IF NOT EXISTS "PaymeTransaction_eventId_idx" ON "PaymeTransaction"("eventId");

-- Insert Admin User
DELETE FROM "User" WHERE email = 'admin@invite.uz';

INSERT INTO "User" (
  "id", 
  "email", 
  "name", 
  "passwordHash", 
  "emailVerified", 
  "role", 
  "plan", 
  "updatedAt"
)
VALUES (
  'admin_' || floor(extract(epoch from now()))::text,
  'admin@invite.uz',
  'Super Admin',
  '$2a$10$vK8Jhp8Y5xR7ZN5wQ9L8ZeGpJX9mQN1kL2mP3nO4pQ5rR6sS7tT8u',
  true,
  'ADMIN',
  'PREMIUM',
  NOW()
);

-- Verify Installation
SELECT 
  'Tables Created:' as status,
  COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_name IN ('User', 'Session', 'EmailVerificationCode', 'Event', 'Guest', 'ClickTransaction', 'PaymeTransaction');

SELECT 
  'Admin User:' as status,
  email,
  name,
  role,
  plan,
  "emailVerified"
FROM "User"
WHERE email = 'admin@invite.uz';
