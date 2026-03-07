import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [], // Providers are defined in auth.ts
} satisfies NextAuthConfig;
