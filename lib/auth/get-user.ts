import { lucia } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async () => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
        return null;
    }

    const { user, session } = await lucia.validateSession(sessionId);

    if (!session) {
        return null;
    }

    return user;
});
