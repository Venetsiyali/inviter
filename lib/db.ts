import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    const client = new PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
    });

    // Test connection on creation (non-blocking)
    client.$connect()
        .then(() => {
            console.log("✅ Database connected successfully");
        })
        .catch((error) => {
            console.error("❌ Database connection failed:");
            console.error("   Error:", error.message);
            console.error("   Code:", error.code);
            if (error.code === 'P1001') {
                console.error("   💡 Hint: Check DATABASE_URL in .env");
                console.error("   💡 Hint: Verify network can reach Supabase pooler");
                console.error("   💡 Hint: Try using pooler URL: aws-0-eu-central-1.pooler.supabase.com:6543");
            }
        });

    return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

// Disconnect on process termination
if (typeof process !== 'undefined') {
    process.on('beforeExit', async () => {
        try {
            await prisma.$disconnect();
        } catch (error) {
            console.error("Error disconnecting Prisma:", error);
        }
    });
}
