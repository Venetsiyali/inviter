/**
 * SVG Pattern Library - O'zbekona va Xalqaro Naqshlar
 */

export interface PatternConfig {
    id: string;
    name: string;
    category: "uzbek" | "geometric" | "floral" | "minimal";
    svgContent: string;
}

/**
 * Adras (O'zbek an'anaviy ipak naqshi)
 */
export const adrasPattern: PatternConfig = {
    id: "adras-1",
    name: "Adras Ipak",
    category: "uzbek",
    svgContent: `
    <pattern id="adras-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="currentColor" fill="none" stroke-width="2" opacity="0.3"/>
      <path d="M50 0 Q 75 25, 100 0" stroke="currentColor" fill="none" stroke-width="2" opacity="0.2"/>
      <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="75" cy="75" r="3" fill="currentColor" opacity="0.4"/>
      <path d="M20 80 L30 80 L25 90 Z" fill="currentColor" opacity="0.2"/>
    </pattern>
  `,
};

/**
 * Atlas (O'zbek atlas ipak naqshi)
 */
export const atlasPattern: PatternConfig = {
    id: "atlas-1",
    name: "Atlas Ipak",
    category: "uzbek",
    svgContent: `
    <pattern id="atlas-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="80" height="80" fill="none"/>
      <path d="M0 40 L40 0 L80 40 L40 80 Z" stroke="currentColor" fill="none" stroke-width="1.5" opacity="0.25"/>
      <circle cx="40" cy="40" r="8" stroke="currentColor" fill="none" stroke-width="1" opacity="0.3"/>
      <line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" stroke-width="1" opacity="0.2"/>
      <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" stroke-width="1" opacity="0.2"/>
    </pattern>
  `,
};

/**
 * Geometric Modern
 */
export const geometricPattern: PatternConfig = {
    id: "geometric-1",
    name: "Zamonaviy Geometrik",
    category: "geometric",
    svgContent: `
    <pattern id="geometric-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="none"/>
      <circle cx="0" cy="0" r="20" stroke="currentColor" fill="none" stroke-width="1" opacity="0.15"/>
      <circle cx="60" cy="0" r="20" stroke="currentColor" fill="none" stroke-width="1" opacity="0.15"/>
      <circle cx="0" cy="60" r="20" stroke="currentColor" fill="none" stroke-width="1" opacity="0.15"/>
      <circle cx="60" cy="60" r="20" stroke="currentColor" fill="none" stroke-width="1" opacity="0.15"/>
      <circle cx="30" cy="30" r="20" stroke="currentColor" fill="none" stroke-width="1" opacity="0.15"/>
    </pattern>
  `,
};

/**
 * Floral Pattern
 */
export const floralPattern: PatternConfig = {
    id: "floral-1",
    name: "Gul Naqshlari",
    category: "floral",
    svgContent: `
    <pattern id="floral-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <g opacity="0.2">
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
        <ellipse cx="50" cy="35" rx="8" ry="12" fill="currentColor" opacity="0.6" transform="rotate(0 50 50)"/>
        <ellipse cx="50" cy="35" rx="8" ry="12" fill="currentColor" opacity="0.6" transform="rotate(72 50 50)"/>
        <ellipse cx="50" cy="35" rx="8" ry="12" fill="currentColor" opacity="0.6" transform="rotate(144 50 50)"/>
        <ellipse cx="50" cy="35" rx="8" ry="12" fill="currentColor" opacity="0.6" transform="rotate(216 50 50)"/>
        <ellipse cx="50" cy="35" rx="8" ry="12" fill="currentColor" opacity="0.6" transform="rotate(288 50 50)"/>
      </g>
    </pattern>
  `,
};

/**
 * Minimal Dots
 */
export const minimalPattern: PatternConfig = {
    id: "minimal-1",
    name: "Minimal Nuqtalar",
    category: "minimal",
    svgContent: `
    <pattern id="minimal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.25"/>
    </pattern>
  `,
};

/**
 * Pattern kutubxonasi
 */
export const patterns: Record<string, PatternConfig> = {
    adras: adrasPattern,
    atlas: atlasPattern,
    geometric: geometricPattern,
    floral: floralPattern,
    minimal: minimalPattern,
};

/**
 * Pattern SVG'ni olish
 */
export function getPatternSVG(style: string): string {
    const pattern = patterns[style] || patterns.minimal;
    return pattern.svgContent;
}

/**
 * Pattern ID'sini olish
 */
export function getPatternId(style: string): string {
    const pattern = patterns[style] || patterns.minimal;
    return pattern.id;
}
