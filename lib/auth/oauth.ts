import { Google } from "arctic";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
    console.warn("Google OAuth credentials inside .env are missing, OAuth will not work.");
}

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID ?? "",
    process.env.GOOGLE_CLIENT_SECRET ?? "",
    process.env.GOOGLE_REDIRECT_URI ?? ""
);
