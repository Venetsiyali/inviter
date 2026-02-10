import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "@/lib/db";

/**
 * Generate a 6-digit email verification code
 */
export async function generateEmailVerificationCode(
    userId: string,
    email: string
): Promise<string> {
    // Delete any existing codes for this user
    await prisma.emailVerificationCode.deleteMany({
        where: { userId },
    });

    // Generate 6-digit code
    const code = generateRandomString(6, alphabet("0-9"));

    // Store code in database with 15 minute expiration
    await prisma.emailVerificationCode.create({
        data: {
            userId,
            email,
            code,
            expiresAt: createDate(new TimeSpan(15, "m")), // 15 minutes
        },
    });

    return code;
}

/**
 * Verify email verification code
 */
export async function verifyEmailCode(
    email: string,
    code: string
): Promise<{ valid: boolean; userId?: string }> {
    const verificationCode = await prisma.emailVerificationCode.findFirst({
        where: {
            email: email.toLowerCase(),
            code,
        },
    });

    if (!verificationCode) {
        return { valid: false };
    }

    // Check if code is expired
    if (verificationCode.expiresAt < new Date()) {
        // Delete expired code
        await prisma.emailVerificationCode.delete({
            where: { id: verificationCode.id },
        });
        return { valid: false };
    }

    // Delete used code
    await prisma.emailVerificationCode.delete({
        where: { id: verificationCode.id },
    });

    // Mark user as verified
    await prisma.user.update({
        where: { id: verificationCode.userId },
        data: { emailVerified: true },
    });

    return { valid: true, userId: verificationCode.userId };
}
