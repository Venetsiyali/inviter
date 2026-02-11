import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@/lib/db";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            name: attributes.name,
            emailVerified: attributes.emailVerified,
            plan: attributes.plan,
            role: attributes.role,
            telegramChatId: attributes.telegramChatId,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    name: string | null;
    emailVerified: boolean;
    plan: string;
    role: string;
    telegramChatId: string | null;
}

