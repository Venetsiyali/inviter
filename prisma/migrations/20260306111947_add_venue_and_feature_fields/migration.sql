/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "giftEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photoEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "venueAddress" TEXT,
ADD COLUMN     "venueLat" DOUBLE PRECISION,
ADD COLUMN     "venueLng" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "premiumValidUntil" TIMESTAMP(3),
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
