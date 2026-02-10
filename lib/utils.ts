import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

export function generateSlug(title: string, suffix?: string): string {
    const baseSlug = slugify(title);
    const randomSuffix = suffix || Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomSuffix}`;
}

export function formatDate(date: Date | string, locale: string = "uz-UZ"): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatCurrency(amount: number, currency: string = "UZS"): string {
    return new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(amount);
}
