import { TemplateData } from "./index";

export function terracottaBoho(data: TemplateData): string {
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
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,600;0,700;1,300&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        .template-wrapper {
            --primary: #C85C3C;
            --secondary: #F5C842;
            --bg: #F5EFE6;
            --bg-darker: #E5D5C5;
            --text-main: #4A3B32;
            --text-muted: #826C5E;
            --accent: #E07A5F;
        }

        

        .template-wrapper {
            background-color: #d1bfae;
            font-family: 'Lora', serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px 0;
            overflow-x: hidden;
        }

        .invitation-card {
            background-color: var(--bg);
            width: 100%;
            max-width: 480px;
            min-height: 90vh;
            position: relative;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 15px 40px rgba(74, 59, 50, 0.2);
            text-align: center;
            overflow: hidden;
            animation: fadeIn 0.8s ease-in;
            z-index: 1;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.98);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* SVG NOISE BACKGROUND + ARCH */
        .invitation-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.05;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            z-index: -2;
            pointer-events: none;
        }

        .invitation-card::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid var(--primary);
            border-radius: 200px 200px 0 0;
            z-index: -1;
            opacity: 0.3;
        }

        /* Sun Graphic */
        .boho-sun {
            width: 80px;
            height: 40px;
            background: var(--secondary);
            border-radius: 80px 80px 0 0;
            margin: 0 auto 30px;
            position: relative;
            animation: rise 3s ease-out;
        }

        @keyframes rise {
            0% {
                transform: translateY(20px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .boho-sun::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: -20px;
            right: -20px;
            height: 2px;
            background: var(--primary);
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 40px;
        }

        .badge {
            display: inline-block;
            color: var(--primary);
            font-family: 'Josefin Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 20px;
        }

        .hero-section h1 {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 44px;
            font-weight: 300;
            color: var(--text-main);
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .ampersand {
            display: block;
            color: var(--primary);
            font-size: 40px;
            font-style: italic;
            font-family: 'Lora', serif;
            margin: 0;
        }

        /* DIVIDER */
        .divider {
            margin: 30px auto;
            width: 40px;
            display: flex;
            gap: 5px;
            justify-content: center;
        }

        .dot {
            width: 6px;
            height: 6px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.5;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 35px;
        }

        .date-time .date {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
            color: var(--primary);
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .date-time .time {
            font-size: 15px;
            color: var(--text-muted);
            font-style: italic;
        }

        /* VENUE */
        .venue {
            margin-bottom: 40px;
            background: var(--bg-darker);
            padding: 25px 20px;
            border-radius: 0 40px 0 40px;
        }

        .venue h3 {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 20px;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .venue p {
            font-size: 15px;
            line-height: 1.6;
            color: var(--text-muted);
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 140px;
            height: 140px;
            background: #E5E7EB;
            border: 1px solid var(--text-muted);
            margin: 0 auto 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-main);
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 2px;
            transition: transform 0.3s;
        }

        .qr-placeholder:hover {
            transform: scale(1.03) rotate(-2deg);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 35px;
        }

        .btn {
            padding: 16px;
            border-radius: 0;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 1px solid var(--primary);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: transparent;
        }

        .gift-btn {
            background: var(--primary);
            color: white;
            box-shadow: 4px 4px 0 rgba(200, 92, 60, 0.2);
        }

        .gift-btn:active,
        .gift-btn:hover {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 rgba(200, 92, 60, 0);
        }

        .photo-btn {
            color: var(--primary);
            box-shadow: 4px 4px 0 rgba(74, 59, 50, 0.1);
        }

        .photo-btn:active,
        .photo-btn:hover {
            transform: translate(2px, 2px);
            box-shadow: 0 0 0 rgba(74, 59, 50, 0);
            background: var(--bg-darker);
        }

        /* FOOTER */
        .footer {
            margin-top: 10px;
        }

        .footer .phone {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: var(--text-main);
            text-decoration: none;
            margin-bottom: 12px;
            display: inline-block;
            letter-spacing: 1px;
        }

        .footer .share-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 13px;
            font-family: 'Josefin Sans', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            text-decoration: underline;
        }

        .footer .share-btn:hover {
            color: var(--primary);
        }

        /* MOBILE RESPONSIVE */
        @media screen and (max-width: 480px) {
            .template-wrapper {
                padding: 0;
                background: var(--bg);
            }

            .invitation-card {
                border-radius: 0;
                box-shadow: none;
                min-height: 100vh;
                padding: 40px 20px;
            }

            .invitation-card::after {
                top: 15px;
                left: 15px;
                right: 15px;
                bottom: 15px;
            }

            .hero-section h1 {
                font-size: 40px;
            }

            .venue {
                padding: 25px 15px;
            }
        }
    `}
    </style>
    
    

    <div class="invitation-card">
        <div class="boho-sun"></div>

        <div class="hero-section">
            <div class="badge">Visol Oqshomi</div>
            <h1>${part1}</h1>
            <span class="ampersand">&</span>
            <h1>${part2}</h1>
        </div>

        <div class="divider">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>

        <div class="date-time">
            <div class="date">${formattedDate}</div>
            <div class="time">${eventTime ? `Soat ${eventTime} da osh tortiladi` : ""}</div>
        </div>

        <div class="venue">
            <h3>${venue || "To'yxona"}</h3>
            <p>${venueAddress || ""}</p>
        </div>

        <div class="qr-placeholder">
            QR KOD
        </div>

        <div class="actions">
            ${giftEnabled ? `<button class="btn gift-btn" id="trigger-gift">💝 Hadya Yuborish</button>` : ""}
            ${photoEnabled ? `<button class="btn photo-btn" id="trigger-photo">📸 Rasm Yuklash</button>` : ""}
        </div>

        <div class="footer">
            <a href="tel:+998901234567" class="phone">${phone || ""}</a><br>
            <button class="share-btn">Ulashish</button>
        </div>
    </div>


</div>`;
}