// ─── FRAMER MOTION ANIMATION PRESETS ───────────────────────────────────────────
// Reusable animation variants for consistent motion across the platform.
// Usage: <motion.div {...fadeUp}> or <motion.div variants={fadeUpVariant} initial="initial" animate="animate">

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Simple presets (spread directly) ─────────────────────────────────────────

export const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease },
};

export const fadeDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' as const },
};

export const slideInLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease },
};

export const slideInRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease },
};

// ─── Container variants (for staggerChildren) ────────────────────────────────

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
        },
    },
};

// ─── Child variants (used inside stagger containers) ──────────────────────────

export const fadeUpItem = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease },
    },
};

export const scaleInItem = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' as const },
    },
};

// ─── Word-by-word hero animation ──────────────────────────────────────────────

export const wordContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const wordItem = {
    initial: { opacity: 0, y: 40, rotateX: -20 },
    animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.5,
            ease,
        },
    },
};

// ─── Scroll-triggered viewport settings ───────────────────────────────────────

export const viewportOnce = {
    once: true,
    margin: '-80px' as const,
};
