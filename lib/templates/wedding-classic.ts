import { TemplateData } from "./index";

export function weddingClassic(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, primaryColor, secondaryColor,
        giftEnabled, photoEnabled, slug, coverImageUrl,
    } = data;

    const mapUrl = venueLat && venueLng
        ? `https://www.google.com/maps?q=${venueLat},${venueLng}`
        : null;

    return `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>${brideGroom} — Taklifnoma</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: ${primaryColor};
            color: #fff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
        .card {
            max-width: 480px;
            width: 100%;
            min-height: 100vh;
            background: linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 40%, ${primaryColor} 100%);
            position: relative;
            overflow: hidden;
        }
        .ornament {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 120px;
            background: linear-gradient(135deg, ${secondaryColor}33 0%, transparent 50%);
        }
        .ornament::after {
            content: '';
            position: absolute;
            bottom: 0; right: 0;
            width: 200px; height: 200px;
            background: radial-gradient(circle, ${secondaryColor}22 0%, transparent 70%);
        }
        .hero {
            padding: 60px 32px 40px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        .bismillah {
            font-size: 14px;
            color: ${secondaryColor};
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 32px;
            opacity: 0.8;
        }
        .divider {
            width: 60px;
            height: 2px;
            background: ${secondaryColor};
            margin: 24px auto;
            border-radius: 1px;
        }
        .title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 700;
            color: ${secondaryColor};
            line-height: 1.2;
            margin-bottom: 8px;
        }
        .subtitle {
            font-size: 15px;
            color: rgba(255,255,255,0.7);
            font-weight: 300;
            letter-spacing: 2px;
        }
        .info-section {
            padding: 32px;
            text-align: center;
        }
        .info-block {
            margin-bottom: 28px;
        }
        .info-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: ${secondaryColor};
            margin-bottom: 8px;
            font-weight: 500;
        }
        .info-value {
            font-size: 18px;
            font-weight: 400;
            color: rgba(255,255,255,0.95);
            line-height: 1.5;
        }
        .info-value.large {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            color: #fff;
        }
        .map-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 14px 28px;
            background: ${secondaryColor};
            color: ${primaryColor};
            border-radius: 50px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            margin-top: 16px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .map-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px ${secondaryColor}44;
        }
        .phone-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border: 1.5px solid ${secondaryColor}66;
            color: ${secondaryColor};
            border-radius: 50px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            margin-top: 12px;
            transition: all 0.2s;
        }
        .phone-btn:hover {
            background: ${secondaryColor}11;
        }
        .footer {
            padding: 40px 32px;
            text-align: center;
            border-top: 1px solid ${secondaryColor}22;
        }
        .footer-text {
            font-size: 13px;
            color: rgba(255,255,255,0.4);
        }
        .footer-brand {
            color: ${secondaryColor};
            text-decoration: none;
            font-weight: 500;
        }
        ${coverImageUrl ? `
        .cover-img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            display: block;
        }` : ""}
    </style>
</head>
<body>
    <div class="card">
        <div class="ornament"></div>

        ${coverImageUrl ? `<img src="${coverImageUrl}" alt="" class="cover-img" loading="lazy">` : ""}

        <div class="hero">
            <p class="bismillah">Hurmatli mehmon</p>
            <div class="divider"></div>
            <h1 class="title">${brideGroom}</h1>
            <p class="subtitle">nikoh to'yiga taklif etamiz</p>
        </div>

        <div class="info-section">
            <div class="info-block">
                <p class="info-label">📅 Sana</p>
                <p class="info-value large">${formattedDate}</p>
                ${eventTime ? `<p class="info-value">${eventTime}</p>` : ""}
            </div>

            ${venue ? `
            <div class="info-block">
                <p class="info-label">📍 Manzil</p>
                <p class="info-value large">${venue}</p>
                ${venueAddress ? `<p class="info-value">${venueAddress}</p>` : ""}
                ${mapUrl ? `<a href="${mapUrl}" target="_blank" class="map-btn">🗺 Xaritada ko'rish</a>` : ""}
            </div>
            ` : ""}

            ${phone ? `
            <div class="info-block">
                <p class="info-label">📞 Aloqa</p>
                <a href="tel:${phone}" class="phone-btn">📞 ${phone}</a>
            </div>
            ` : ""}
        </div>

        <div class="footer">
            <p class="footer-text">
                Taklifnoma <a href="https://inviter.uz" class="footer-brand">inviter.uz</a> orqali yaratildi
            </p>
        </div>
    </div>
</body>
</html>`;
}
