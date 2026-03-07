import { TemplateData } from "./index";

export function cherryBlossom(data: TemplateData): string {
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
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;600;900&family=Noto+Sans:wght@300;400;600&display=swap');

        .template-wrapper {
            --primary: #FFB7C5;
            /* Sakura Pink */
            --secondary: #FFFFFF;
            --bg: #FAFAFA;
            --text-main: #2D2D2D;
            /* Charcoal/Dark Ash */
            --text-muted: #7D7D7D;
            --accent: #E57373;
            /* Deeper Pink for accents */
            --border: #FCE4EC;
        }

        

        .template-wrapper {
            background-color: #f7e6e9;
            font-family: 'Noto Sans', sans-serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px 0;
            overflow-x: hidden;
            position: relative;
        }

        .invitation-card {
            background-color: var(--secondary);
            width: 100%;
            max-width: 480px;
            min-height: 90vh;
            border-radius: 4px;
            /* Minimalist sharp edges */
            padding: 60px 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            text-align: center;
            position: relative;
            z-index: 10;
            overflow: hidden;
            border-top: 8px solid var(--primary);
            border-bottom: 8px solid var(--primary);
            animation: fadeIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.98);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* JAPANESE MINIMAL BACKGROUND DECOR */
        .invitation-card::after {
            content: '';
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            border: 1px solid var(--border);
            border-radius: 50%;
            opacity: 0.5;
            z-index: -1;
        }

        /* FALLING CHERRY BLOSSOMS (Pure CSS) */
        .sakura {
            position: fixed;
            background: var(--primary);
            border-radius: 100% 0 100% 0;
            opacity: 0.6;
            animation: fall linear infinite;
            z-index: 1;
            pointer-events: none;
            box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.8);
        }

        .sakura.s1 {
            width: 12px;
            height: 12px;
            left: 10%;
            animation-duration: 8s;
            animation-delay: 0s;
        }

        .sakura.s2 {
            width: 16px;
            height: 16px;
            left: 30%;
            animation-duration: 12s;
            animation-delay: -3s;
        }

        .sakura.s3 {
            width: 10px;
            height: 10px;
            left: 50%;
            animation-duration: 9s;
            animation-delay: -5s;
        }

        .sakura.s4 {
            width: 18px;
            height: 18px;
            left: 70%;
            animation-duration: 14s;
            animation-delay: -1s;
        }

        .sakura.s5 {
            width: 14px;
            height: 14px;
            left: 85%;
            animation-duration: 10s;
            animation-delay: -7s;
        }

        @keyframes fall {
            0% {
                transform: translateY(-50px) rotate(0deg) translateX(0);
                opacity: 0;
            }

            10% {
                opacity: 0.8;
            }

            90% {
                opacity: 0.6;
            }

            100% {
                transform: translateY(100vh) rotate(360deg) translateX(100px);
                opacity: 0;
            }
        }

        /* RED STAMP (Hanko) DECORATION */
        .hanko-stamp {
            width: 40px;
            height: 40px;
            border: 2px solid var(--accent);
            color: var(--accent);
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            border-radius: 4px;
            font-family: 'Noto Serif JP', serif;
            font-weight: 900;
            opacity: 0.8;
            transform: rotate(-10deg);
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 45px;
        }

        .hero-section h1 {
            font-family: 'Noto Serif JP', serif;
            font-size: 38px;
            font-weight: 300;
            color: var(--text-main);
            letter-spacing: 4px;
            line-height: 1.5;
            text-transform: uppercase;
        }

        .ampersand {
            display: block;
            color: var(--primary);
            font-size: 30px;
            font-family: 'Noto Sans', sans-serif;
            font-weight: 300;
            margin: 10px 0;
            opacity: 0.7;
        }

        /* MINIMAL DIVIDER */
        .divider {
            width: 2px;
            height: 40px;
            background-color: var(--primary);
            margin: 0 auto 30px;
            opacity: 0.5;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 35px;
        }

        .date-time .date {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 3px;
            color: var(--text-main);
            margin-bottom: 12px;
            text-transform: uppercase;
        }

        .date-time .time {
            font-size: 13px;
            color: var(--text-muted);
            letter-spacing: 2px;
        }

        /* VENUE */
        .venue {
            margin-bottom: 40px;
            padding: 25px 0;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        }

        .venue h3 {
            font-family: 'Noto Serif JP', serif;
            font-size: 18px;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 15px;
            letter-spacing: 2px;
        }

        .venue p {
            font-size: 13px;
            line-height: 1.8;
            color: var(--text-muted);
            font-weight: 300;
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 140px;
            height: 140px;
            background: #FAFAFA;
            border: 1px solid var(--border);
            margin: 0 auto 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            font-size: 12px;
            letter-spacing: 3px;
            transition: all 0.3s;
        }

        .qr-placeholder:hover {
            border-color: var(--primary);
            background: #FFF;
            box-shadow: 0 5px 15px rgba(255, 183, 197, 0.2);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 40px;
        }

        .btn {
            padding: 16px;
            border-radius: 0;
            /* Minimal sharp buttons */
            font-family: 'Noto Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 3px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }

        .gift-btn {
            background: var(--text-main);
            color: var(--secondary);
            border: 1px solid var(--text-main);
        }

        .gift-btn:hover {
            background: transparent;
            color: var(--text-main);
        }

        .photo-btn {
            background: transparent;
            color: var(--text-muted);
            border: 1px solid var(--border);
        }

        .photo-btn:hover {
            border-color: var(--text-main);
            color: var(--text-main);
        }

        /* FOOTER */
        .footer .phone {
            font-size: 14px;
            font-weight: 400;
            color: var(--text-main);
            text-decoration: none;
            letter-spacing: 2px;
            margin-bottom: 20px;
            display: block;
        }

        .footer .share-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            cursor: pointer;
            transition: 0.3s;
        }

        .footer .share-btn:hover {
            color: var(--accent);
        }

        /* MOBILE RESPONSIVE */
        @media screen and (max-width: 480px) {
            .template-wrapper {
                padding: 0;
                background: var(--bg);
            }

            .invitation-card {
                padding: 40px 20px;
                min-height: 100vh;
                border-radius: 0;
            }

            .hero-section h1 {
                font-size: 32px;
            }

            .hanko-stamp {
                margin-bottom: 20px;
            }

            .venue {
                padding: 20px 0;
            }
        }
    `}
    </style>
    
    

    <!-- Background Sakuras -->
    <div class="sakura s1"></div>
    <div class="sakura s2"></div>
    <div class="sakura s3"></div>
    <div class="sakura s4"></div>
    <div class="sakura s5"></div>

    <div class="invitation-card">

        <div class="hanko-stamp">愛</div>

        <div class="hero-section">
            <h1>${part1}</h1>
            <span class="ampersand">+</span>
            <h1>${part2}</h1>
        </div>

        <div class="divider"></div>

        <div class="date-time">
            <div class="date">${formattedDate}</div>
            <div class="time">${eventTime || ""}</div>
        </div>

        <div class="venue">
            <h3>${venue || "TO'YXONA"}</h3>
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
            <a href="tel:+998901234567" class="phone">${phone || ""}</a>
            <button class="share-btn">ULASHISH</button>
        </div>
    </div>


</div>`;
}