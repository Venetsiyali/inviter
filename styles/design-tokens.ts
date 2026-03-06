// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
// Central design system for inviter.uz
// All components should reference these tokens for visual consistency.

export const tokens = {
    colors: {
        brand: {
            navy: '#0F1B2D',
            navyLight: '#162236',
            gold: '#F59E0B',
            goldDark: '#D97706',
            goldLight: '#FCD34D',
            cream: '#FEF3C7',
            creamDark: '#FDE68A',
        },
        semantic: {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6',
        },
        text: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#94A3B8',
            inverse: '#F8FAFC',
            highlight: '#F59E0B',
        },
        bg: {
            dark: '#0a0a0f',
            darkCard: '#111118',
            glass: 'rgba(255,255,255,0.06)',
            glassBorder: 'rgba(255,255,255,0.1)',
        }
    },

    typography: {
        fontSerif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
        fontSans: "'Inter', 'DM Sans', system-ui, sans-serif",
        fontMono: "'JetBrains Mono', monospace",
    },

    radius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px',
    },

    shadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        cardHover: '0 8px 40px rgba(0,0,0,0.12)',
        modal: '0 20px 60px rgba(0,0,0,0.3)',
        glow: '0 0 40px rgba(245,158,11,0.3)',
        glowSm: '0 0 20px rgba(245,158,11,0.15)',
        nav: '0 4px 30px rgba(0,0,0,0.1)',
    },

    spacing: {
        section: {
            sm: '3rem',    // 48px
            md: '5rem',    // 80px
            lg: '7rem',    // 112px
        }
    }
} as const;

export type DesignTokens = typeof tokens;
