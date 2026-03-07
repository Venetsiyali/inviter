import { TemplateData } from "./index";

export function orientalSilk(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, giftEnabled, photoEnabled
    } = data;

    const part1 = brideGroom.split(/ & | va | \+ /i)[0] || brideGroom;
    const part2 = brideGroom.split(/ & | va | \+ /i)[1] || '';

    return `
<div class="template-wrapper">
    <style>
        
        ${String.raw`
        /* FONTS */
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Serif:wght@400;600;700&display=swap');

        /* CSS VARIABLES */
        .template-wrapper {
            --primary: #8B0000;
            --secondary: #C5A028;
            --bg: #FFF8DC;
            --text-main: #2C1810;
            --text-muted: #5C4033;
        }

        

        .template-wrapper {
            background-color: #2C1810;
            font-family: 'Noto Serif', serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px 0;
        }

        /* CARD CONTAINER */
        .invitation-card {
            background-color: var(--bg);
            /* Subtle Ikat-style repeating gradient background */
            background-image: repeating-linear-gradient(45deg,
                    rgba(197, 160, 40, 0.03),
                    rgba(197, 160, 40, 0.03) 10px,
                    rgba(255, 248, 220, 0.5) 10px,
                    rgba(255, 248, 220, 0.5) 20px);
            width: 100%;
            max-width: 480px;
            position: relative;
            padding: 45px 30px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            text-align: center;
            animation: fadeInUp 0.8s ease-out;
            border: 8px solid var(--primary);
            border-image: repeating-linear-gradient(45deg, var(--primary), var(--primary) 10px, #610000 10px, #610000 20px) 10;
        }

        /* ISLAMIC / ORIENTAL CORNERS */
        .corner {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 3px solid var(--secondary);
            border-radius: 2px;
        }

        .corner-tl {
            top: 15px;
            left: 15px;
            border-right: none;
            border-bottom: none;
        }

        .corner-tr {
            top: 15px;
            right: 15px;
            border-left: none;
            border-bottom: none;
        }

        .corner-bl {
            bottom: 15px;
            left: 15px;
            border-right: none;
            border-top: none;
        }

        .corner-br {
            bottom: 15px;
            right: 15px;
            border-left: none;
            border-top: none;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* BISMILLAH / TOP ORNAMENT */
        .top-ornament {
            font-family: 'Amiri', serif;
            font-size: 20px;
            color: var(--secondary);
            margin-bottom: 20px;
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 30px;
        }

        .badge {
            display: inline-block;
            color: var(--primary);
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--secondary);
            padding-bottom: 5px;
        }

        .hero-section h1 {
            font-family: 'Amiri', serif;
            font-size: 46px;
            font-weight: 700;
            color: var(--primary);
            line-height: 1.3;
        }

        /* DIVIDER */
        .divider {
            margin: 20px auto 30px;
            width: 80%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--secondary), transparent);
            position: relative;
        }

        .divider::after {
            content: '♦';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--primary);
            background: var(--bg);
            padding: 0 10px;
            font-size: 18px;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 30px;
        }

        .date-time .date {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 8px;
            font-family: 'Amiri', serif;
        }

        .date-time .time {
            font-size: 16px;
            color: var(--text-muted);
            border: 1px solid var(--secondary);
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
        }

        /* VENUE */
        .venue {
            margin-bottom: 40px;
            padding: 20px;
            background: rgba(139, 0, 0, 0.05);
            border-top: 1px solid rgba(197, 160, 40, 0.3);
            border-bottom: 1px solid rgba(197, 160, 40, 0.3);
        }

        .venue h3 {
            font-size: 22px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 8px;
            font-family: 'Amiri', serif;
        }

        .venue p {
            font-size: 15px;
            line-height: 1.6;
            color: var(--text-muted);
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 160px;
            height: 160px;
            background: #E5E7EB;
            border: 2px solid var(--primary);
            outline: 2px solid var(--secondary);
            outline-offset: -6px;
            margin: 0 auto 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-weight: 700;
            font-size: 15px;
            transition: transform 0.3s;
        }

        .qr-placeholder:hover {
            transform: translateY(-5px);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 35px;
        }

        .btn {
            padding: 15px 24px;
            border-radius: 4px;
            font-family: 'Noto Serif', serif;
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }

        .gift-btn {
            background: var(--primary);
            color: var(--secondary);
            border-color: var(--primary);
        }

        .gift-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: 0.5s;
        }

        .gift-btn:hover::before {
            left: 100%;
        }

        .photo-btn {
            background: transparent;
            color: var(--primary);
            border-color: var(--secondary);
        }

        .photo-btn:hover {
            background: rgba(197, 160, 40, 0.1);
        }

        /* FOOTER */
        .footer {
            margin-top: 20px;
            padding-bottom: 10px;
        }

        .footer .phone {
            font-size: 18px;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            margin-bottom: 15px;
            display: inline-block;
            font-family: 'Amiri', serif;
        }

        .footer .share-btn {
            display: block;
            margin: 0 auto;
            background: transparent;
            border: none;
            color: var(--secondary);
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer .share-btn:hover {
            text-decoration: underline;
        }

        /* RESPONSIVE DESIGN - MOBILE */
        @media screen and (max-width: 480px) {
            .template-wrapper {
                padding: 0;
                background: var(--bg);
            }

            .invitation-card {
                box-shadow: none;
                min-height: 100vh;
                padding: 40px 20px;
                border-left: none;
                border-right: none;
            }

            .corner {
                display: none;
            }

            .hero-section h1 {
                font-size: 40px;
            }

            .venue {
                padding: 15px 10px;
            }
        }
    `}
    </style>
    
    

    <div class="invitation-card">
        <!-- Oriental Corners -->
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="top-ornament">☪︎</div>

        <div class="hero-section">
            <div class="badge">Kelin Salom va To'y</div>
            <h1>${brideGroom}</h1>
        </div>

        <div class="divider"></div>

        <div class="date-time">
            <div class="date">${formattedDate}</div>
            <div class="time">${eventTime ? `🕰 Soat ${eventTime} da` : ""}</div>
        </div>

        <div class="venue">
            <h3>${venue || "To'yxona"}</h3>
            <p class="address">${venueAddress || ""}</p>
        </div>

        <div class="qr-placeholder">
            QR Kod
        </div>

        <div class="actions">
            ${giftEnabled ? `<button class="btn gift-btn" id="trigger-gift">💝 Hadya Yuborish</button>` : ""}
            ${photoEnabled ? `<button class="btn photo-btn" id="trigger-photo">📸 Rasm Yuklash</button>` : ""}
        </div>

        <div class="footer">
            <a href="tel:+998901234567" class="phone">📞 ${phone || ""}</a>
            <button class="share-btn">📤 Yaqinlar bilan ulashish</button>
        </div>
    </div>


</div>`;
}