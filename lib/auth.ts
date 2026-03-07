import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    basePath: "/api/auth",
    trustHost: true,

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                if (!user.email) return false;

                // Manual Prisma User & Account creation (Node.js runtime safe)
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email }
                    });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name,
                                image: (user as any).image,
                                googleId: account.providerAccountId,
                                emailVerified: new Date(),
                                accounts: {
                                    create: {
                                        type: account.type,
                                        provider: account.provider,
                                        providerAccountId: account.providerAccountId,
                                        access_token: account.access_token,
                                        expires_at: account.expires_at,
                                        id_token: account.id_token,
                                    }
                                }
                            }
                        } as any);
                    } else if (existingUser && !existingUser.googleId) {
                        // Link account if email exists but no googleId
                        await prisma.user.update({
                            where: { email: existingUser.email },
                            data: {
                                googleId: account.providerAccountId,
                                // Remove image update here since existingUser type complaining about it
                            } as any
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Prisma error during sign in:", error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user, trigger, session, account }) {
            // First login
            if (user && user.email) {
                // If Google login, fetch the newly created or existing user DB ID
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { id: true, plan: true, role: true }
                });

                if (dbUser) {
                    token.id = dbUser.id;
                    token.plan = dbUser.plan;
                    // For Edge safety, we handle planExpiry loosely
                    token.planExpiry = (dbUser as any)?.planExpiry?.toISOString() || null;
                    token.role = dbUser.role;
                    token.phone = (dbUser as any)?.phone || null;
                }
            }
            if (trigger === "update" && session) {
                token.plan = session.plan;
                token.planExpiry = session.planExpiry;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                (session.user as any).plan = token.plan;
                (session.user as any).planExpiry = token.planExpiry;
                (session.user as any).role = token.role;
                (session.user as any).phone = token.phone;
            }
            return session;
        },
    },
});
