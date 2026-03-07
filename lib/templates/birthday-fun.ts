import { TemplateData } from "./index";

export function birthdayFun(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, primaryColor, secondaryColor,
        slug,
    } = data;

    const mapUrl = venueLat && venueLng
        ? `https://www.google.com/maps?q=${venueLat},${venueLng}`
        : null;

    return `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>${brideGroom} — Tug'ilgan kun</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            background: #111;
            min-height: 100vh;
            display: flex;
            justify-content: center;
        }
        .card {
            max-width: 480px;
            width: 100%;
            background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
            color: #fff;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        .confetti {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            pointer-events: none;
            background-image:
                radial-gradient(circle at 15% 20%, #ff6b6b44 2px, transparent 2px),
                radial-gradient(circle at 85% 15%, #ffd93d44 3px, transparent 3px),
                radial-gradient(circle at 45% 10%, #6bcb7744 2px, transparent 2px),
                radial-gradient(circle at 70% 30%, #4ecdc444 2px, transparent 2px),
                radial-gradient(circle at 25% 45%, #ff6b6b44 1.5px, transparent 1.5px),
                radial-gradient(circle at 90% 55%, #ffd93d44 2px, transparent 2px);
        }
        .hero {
            padding: 64px 32px 40px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        .emoji-big { font-size: 64px; margin-bottom: 20px; }
        .hero-tag {
            display: inline-block;
            padding: 6px 18px;
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            color: #000;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            border-radius: 50px;
            margin-bottom: 20px;
        }
        .hero-name {
            font-size: 36px;
            font-weight: 800;
            line-height: 1.1;
            background: linear-gradient(135deg, #fff 30%, ${secondaryColor});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }
        .hero-sub {
            font-size: 15px;
            color: rgba(255,255,255,0.6);
            font-weight: 400;
        }
        .info-grid {
            padding: 24px 32px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        .info-card {
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .info-emoji {
            width: 48px;
            height: 48px;
            background: rgba(255,255,255,0.08);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }
        .info-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: ${secondaryColor};
            margin-bottom: 2px;
            font-weight: 600;
        }
        .info-val {
            font-size: 16px;
            font-weight: 600;
            color: #fff;
        }
        .info-sub {
            font-size: 13px;
            color: rgba(255,255,255,0.5);
        }
        .actions {
            padding: 24px 32px 48px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: relative;
            z-index: 1;
        }
        .act-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px;
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            color: #000;
            border-radius: 14px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
        }
        .act-outline {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px;
            border: 1.5px solid rgba(255,255,255,0.15);
            color: #fff;
            border-radius: 14px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }
        .footer {
            padding: 24px;
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-text { font-size: 12px; color: rgba(255,255,255,0.3); }
        .footer-brand { color: #ffd93d; text-decoration: none; font-weight: 600; }
    </style>
</head>
<body>
    <div class="card">
        <div class="confetti"></div>

        <div class="hero">
            <div class="emoji-big">🎂</div>
            <span class="hero-tag">Tug'ilgan kun</span>
            <h1 class="hero-name">${brideGroom}</h1>
            <p class="hero-sub">tug'ilgan kuniga taklif etamiz!</p>
        </div>

        <div class="info-grid">
            <div class="info-card">
                <div class="info-emoji">📅</div>
                <div>
                    <p class="info-label">Qachon?</p>
                    <p class="info-val">${formattedDate}</p>
                    ${eventTime ? `<p class="info-sub">${eventTime}</p>` : ""}
                </div>
            </div>

            ${venue ? `
            <div class="info-card">
                <div class="info-emoji">📍</div>
                <div>
                    <p class="info-label">Qayerda?</p>
                    <p class="info-val">${venue}</p>
                    ${venueAddress ? `<p class="info-sub">${venueAddress}</p>` : ""}
                </div>
            </div>` : ""}

            ${phone ? `
            <div class="info-card">
                <div class="info-emoji">📞</div>
                <div>
                    <p class="info-label">Aloqa</p>
                    <p class="info-val">${phone}</p>
                </div>
            </div>` : ""}
        </div>

        <div class="actions">
            ${mapUrl ? `<a href="${mapUrl}" target="_blank" class="act-btn">🗺 Xaritada ko'rish</a>` : ""}
            ${phone ? `<a href="tel:${phone}" class="act-outline">📞 Qo'ng'iroq qilish</a>` : ""}
        </div>

        <div class="footer">
            <p class="footer-text"><a href="https://inviter.uz" class="footer-brand">inviter.uz</a></p>
        </div>
    </div>
</body>
</html>`;
}
