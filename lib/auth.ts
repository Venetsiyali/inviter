import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),

        Credentials({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Parol", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.passwordHash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // First login — attach plan info
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: { plan: true, planExpiry: true, role: true },
                });
                token.plan = dbUser?.plan || "FREE";
                token.planExpiry = dbUser?.planExpiry?.toISOString() || null;
                token.role = dbUser?.role || "USER";
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                (session.user as any).plan = token.plan;
                (session.user as any).planExpiry = token.planExpiry;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    basePath: "/api/auth",
    trustHost: true,
});
