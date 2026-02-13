/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL from environment variables
 * Falls back to production URL if not set
 */
export function getBaseUrl(): string {
    // In browser, use window.location.origin
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }

    // In server, use environment variable or fallback
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://inviter.uz';
}

/**
 * Get the full URL for an invitation
 */
export function getInvitationUrl(invitationId: string): string {
    return `${getBaseUrl()}/invite/${invitationId}`;
}

/**
 * Get the full URL for any path
 */
export function getFullUrl(path: string): string {
    const baseUrl = getBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
}
