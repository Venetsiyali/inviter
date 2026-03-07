import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt", // MUHIM: Edge xatosini oldini olish uchun JWT majburiy
        maxAge: 30 * 24 * 60 * 60, // 30 kun
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true, // Bir xil email bilan qayta kirishga ruxsat
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
                const isValid = await bcrypt.compare(credentials.password as string, user.passwordHash);
                if (!isValid) return null;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: (user as any).image || null,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    basePath: "/api/auth",
    trustHost: true, // Vercel uchun MUHIM

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Agar foydalanuvchi endi kirgan bo'lsa (user obyekti mavjud bo'ladi)
            if (user) {
                token.id = user.id;
                // Bazadan eng so'nggi ma'lumotlarni olamiz
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: { plan: true, planExpiry: true, role: true, phone: true }
                });
                token.plan = dbUser?.plan || "FREE";
                token.planExpiry = (dbUser as any)?.planExpiry?.toISOString() || (dbUser as any)?.premiumValidUntil?.toISOString() || null;
                token.role = dbUser?.role || "USER";
                token.phone = dbUser?.phone || null;
            }
            // Sessiyani yangilash trigger qilinganda
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
