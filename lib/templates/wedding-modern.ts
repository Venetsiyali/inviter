import { TemplateData } from "./index";

export function weddingModern(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, primaryColor, secondaryColor,
        coverImageUrl, slug,
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
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Montserrat', sans-serif;
            background: #fafafa;
            color: #333;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }
        .card {
            max-width: 480px;
            width: 100%;
            background: #fff;
        }
        .hero-section {
            position: relative;
            height: 400px;
            overflow: hidden;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%);
        }
        ${coverImageUrl ? `
        .hero-section {
            background-image: url('${coverImageUrl}');
            background-size: cover;
            background-position: center;
        }
        .hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
        }` : `.hero-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 40%, ${secondaryColor}22 0%, transparent 60%);
        }`}
        .hero-content {
            position: relative;
            z-index: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 40px 32px;
            color: #fff;
        }
        .tag {
            display: inline-block;
            padding: 6px 16px;
            background: ${secondaryColor};
            color: ${primaryColor};
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            border-radius: 50px;
            margin-bottom: 16px;
            width: fit-content;
        }
        .names {
            font-family: 'Cormorant Garamond', serif;
            font-size: 40px;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 8px;
        }
        .event-type-text {
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 1px;
            opacity: 0.85;
        }
        .details {
            padding: 40px 32px;
        }
        .detail-card {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .detail-card:last-child { border-bottom: none; }
        .detail-icon {
            width: 44px;
            height: 44px;
            background: ${primaryColor}0a;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
        }
        .detail-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: ${primaryColor}aa;
            margin-bottom: 4px;
            font-weight: 600;
        }
        .detail-value {
            font-size: 16px;
            font-weight: 500;
            color: #1a1a1a;
            line-height: 1.4;
        }
        .actions {
            padding: 0 32px 40px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .btn-primary {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 16px;
            background: ${primaryColor};
            color: #fff;
            border-radius: 14px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            transition: all 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-outline {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px;
            border: 1.5px solid ${primaryColor}33;
            color: ${primaryColor};
            border-radius: 14px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        .footer {
            padding: 24px 32px;
            text-align: center;
            background: #f8f8f8;
        }
        .footer-text {
            font-size: 12px;
            color: #999;
        }
        .footer-brand { color: ${primaryColor}; text-decoration: none; font-weight: 600; }
    </style>
</head>
<body>
    <div class="card">
        <div class="hero-section">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <span class="tag">To'y marosimi</span>
                <h1 class="names">${brideGroom}</h1>
                <p class="event-type-text">nikoh to'yiga taklif etamiz</p>
            </div>
        </div>

        <div class="details">
            <div class="detail-card">
                <div class="detail-icon">📅</div>
                <div>
                    <p class="detail-label">Sana</p>
                    <p class="detail-value">${formattedDate}</p>
                    ${eventTime ? `<p class="detail-value" style="color:#666; font-size:14px">${eventTime}</p>` : ""}
                </div>
            </div>

            ${venue ? `
            <div class="detail-card">
                <div class="detail-icon">📍</div>
                <div>
                    <p class="detail-label">Manzil</p>
                    <p class="detail-value">${venue}</p>
                    ${venueAddress ? `<p class="detail-value" style="color:#666; font-size:14px">${venueAddress}</p>` : ""}
                </div>
            </div>` : ""}

            ${phone ? `
            <div class="detail-card">
                <div class="detail-icon">📞</div>
                <div>
                    <p class="detail-label">Aloqa</p>
                    <p class="detail-value">${phone}</p>
                </div>
            </div>` : ""}
        </div>

        <div class="actions">
            ${mapUrl ? `<a href="${mapUrl}" target="_blank" class="btn-primary">🗺 Xaritada ko'rish</a>` : ""}
            ${phone ? `<a href="tel:${phone}" class="btn-outline">📞 Qo'ng'iroq qilish</a>` : ""}
        </div>

        <div class="footer">
            <p class="footer-text">
                <a href="https://inviter.uz" class="footer-brand">inviter.uz</a> orqali yaratildi
            </p>
        </div>
    </div>
</body>
</html>`;
}
