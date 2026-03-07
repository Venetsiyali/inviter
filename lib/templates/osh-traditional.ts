import { TemplateData } from "./index";

export function oshTraditional(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, primaryColor, secondaryColor,
        eventType, slug,
    } = data;

    const mapUrl = venueLat && venueLng
        ? `https://www.google.com/maps?q=${venueLat},${venueLng}`
        : null;

    const eventLabel: Record<string, string> = {
        OSH: "Osh marosimi",
        SUNNAT: "Sunnat to'yi",
        OTHER: "Marosim",
    };
    const label = eventLabel[eventType] || "Marosim";

    return `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>${brideGroom} — ${label}</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: #f5f0e8;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }
        .card {
            max-width: 480px;
            width: 100%;
            background: #fffdf8;
        }
        .pattern-top {
            height: 8px;
            background: repeating-linear-gradient(
                90deg,
                ${primaryColor} 0px, ${primaryColor} 20px,
                ${secondaryColor} 20px, ${secondaryColor} 40px
            );
        }
        .header {
            padding: 48px 32px 32px;
            text-align: center;
            border-bottom: 2px solid ${secondaryColor}33;
        }
        .header-icon { font-size: 48px; margin-bottom: 16px; }
        .header-label {
            font-size: 12px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: ${primaryColor};
            font-weight: 600;
            margin-bottom: 16px;
        }
        .header-title {
            font-family: 'Noto Serif', serif;
            font-size: 32px;
            font-weight: 700;
            color: ${primaryColor};
            line-height: 1.2;
        }
        .header-subtitle {
            font-size: 14px;
            color: #777;
            margin-top: 8px;
        }
        .body {
            padding: 32px;
        }
        .info-row {
            display: flex;
            gap: 16px;
            padding: 18px 0;
            border-bottom: 1px solid #f0ebe0;
            align-items: center;
        }
        .info-row:last-child { border-bottom: none; }
        .info-icon {
            width: 48px;
            height: 48px;
            background: ${primaryColor}0d;
            border: 1.5px solid ${primaryColor}1a;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }
        .info-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: ${primaryColor}99;
            margin-bottom: 4px;
            font-weight: 600;
        }
        .info-text {
            font-size: 16px;
            color: #2a2a2a;
            font-weight: 500;
            line-height: 1.4;
        }
        .info-sub {
            font-size: 13px;
            color: #888;
            margin-top: 2px;
        }
        .cta-section {
            padding: 16px 32px 40px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .cta-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px;
            background: ${primaryColor};
            color: #fff;
            border-radius: 14px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
        }
        .cta-outline {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px;
            border: 1.5px solid ${primaryColor}44;
            color: ${primaryColor};
            border-radius: 14px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        .footer {
            padding: 24px;
            text-align: center;
            background: ${primaryColor}08;
            border-top: 1px solid ${primaryColor}11;
        }
        .footer-text { font-size: 12px; color: #aaa; }
        .footer-brand { color: ${primaryColor}; text-decoration: none; font-weight: 600; }
        .pattern-bottom {
            height: 8px;
            background: repeating-linear-gradient(
                90deg,
                ${secondaryColor} 0px, ${secondaryColor} 20px,
                ${primaryColor} 20px, ${primaryColor} 40px
            );
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="pattern-top"></div>
        <div class="header">
            <div class="header-icon">🍽️</div>
            <p class="header-label">${label}</p>
            <h1 class="header-title">${brideGroom}</h1>
            <p class="header-subtitle">marosimiga taklif etamiz</p>
        </div>

        <div class="body">
            <div class="info-row">
                <div class="info-icon">📅</div>
                <div>
                    <p class="info-title">Sana va vaqt</p>
                    <p class="info-text">${formattedDate}</p>
                    ${eventTime ? `<p class="info-sub">${eventTime}</p>` : ""}
                </div>
            </div>

            ${venue ? `
            <div class="info-row">
                <div class="info-icon">📍</div>
                <div>
                    <p class="info-title">Manzil</p>
                    <p class="info-text">${venue}</p>
                    ${venueAddress ? `<p class="info-sub">${venueAddress}</p>` : ""}
                </div>
            </div>` : ""}

            ${phone ? `
            <div class="info-row">
                <div class="info-icon">📞</div>
                <div>
                    <p class="info-title">Aloqa</p>
                    <p class="info-text">${phone}</p>
                </div>
            </div>` : ""}
        </div>

        <div class="cta-section">
            ${mapUrl ? `<a href="${mapUrl}" target="_blank" class="cta-btn">🗺 Xaritada ko'rish</a>` : ""}
            ${phone ? `<a href="tel:${phone}" class="cta-outline">📞 Qo'ng'iroq qilish</a>` : ""}
        </div>

        <div class="footer">
            <p class="footer-text"><a href="https://inviter.uz" class="footer-brand">inviter.uz</a></p>
        </div>
        <div class="pattern-bottom"></div>
    </div>
</body>
</html>`;
}
