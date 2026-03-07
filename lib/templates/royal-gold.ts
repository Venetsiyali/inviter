import { TemplateData } from "./index";

export function royalGold(data: TemplateData): string {
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;600&display=swap');
        
        /* CSS VARIABLES */
        .template-wrapper {
            --primary: #0D1B2A;
            --secondary: #D4AF37;
            --bg: #050a0f;
            --card-bg: linear-gradient(135deg, #0D1B2A 0%, #1A2A40 100%);
            --text-main: #FFFFFF;
            --text-muted: rgba(255, 255, 255, 0.7);
            --gold-light: #F3E5AB;
            --gold-dark: #AA7C11;
        }

        /* RESET & BASE */
        

        .template-wrapper {
            background-color: var(--bg);
            font-family: 'Lato', sans-serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 20px 0;
            overflow-x: hidden;
        }

        /* CARD CONTAINER */
        .invitation-card {
            background: var(--card-bg);
            width: 100%;
            max-width: 480px;
            min-height: 90vh;
            border: 2px solid var(--secondary);
            border-radius: 24px;
            padding: 50px 30px;
            position: relative;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            text-align: center;
            overflow: hidden;
            animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* INNER BORDER DECORATION */
        .invitation-card::before {
            content: '';
            position: absolute;
            top: 15px; left: 15px; right: 15px; bottom: 15px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 14px;
            pointer-events: none;
        }

        /* ANIMATIONS */
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        @keyframes pulse-glow {
            0% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
            50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.6); }
            100% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 40px;
            position: relative;
            z-index: 2;
        }

        .hero-section .badge {
            display: inline-block;
            color: var(--secondary);
            font-size: 13px;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 25px;
            position: relative;
        }

        .hero-section .badge::after {
            content: '';
            display: block;
            width: 30px;
            height: 1px;
            background: var(--secondary);
            margin: 8px auto 0;
        }

        .hero-section h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 42px;
            font-weight: 700;
            color: var(--secondary);
            line-height: 1.1;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .hero-section .ampersand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            font-style: italic;
            color: var(--gold-light);
            display: block;
            margin: -5px 0;
        }

        /* DIVIDER */
        .divider {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 35px 0;
        }

        .divider::before, .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--secondary), transparent);
            max-width: 100px;
        }

        .divider span {
            margin: 0 15px;
            color: var(--secondary);
            font-size: 24px;
            animation: float 4s infinite ease-in-out;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 35px;
            z-index: 2;
            position: relative;
        }

        .date-time .date {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26px;
            font-weight: 600;
            color: var(--secondary);
            margin-bottom: 8px;
        }

        .date-time .time {
            font-size: 16px;
            color: var(--text-main);
            font-weight: 300;
            letter-spacing: 1px;
        }

        /* VENUE */
        .venue {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(212, 175, 55, 0.15);
            padding: 25px;
            border-radius: 16px;
            margin-bottom: 40px;
            position: relative;
            z-index: 2;
        }

        .venue h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 24px;
            color: var(--gold-light);
            margin-bottom: 12px;
            font-weight: 600;
        }

        .venue p {
            font-size: 14px;
            line-height: 1.6;
            color: var(--text-muted);
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 160px;
            height: 160px;
            background: #E5E7EB;
            border: 4px solid var(--secondary);
            border-radius: 12px;
            margin: 0 auto 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-family: 'Lato', sans-serif;
            font-weight: bold;
            font-size: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
            transition: transform 0.3s;
        }

        .qr-placeholder:hover {
            transform: scale(1.05);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 40px;
            position: relative;
            z-index: 2;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 16px 24px;
            border-radius: 50px;
            font-family: 'Lato', sans-serif;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            outline: none;
            gap: 10px;
        }

        .gift-btn {
            background: var(--secondary);
            color: var(--primary);
            animation: pulse-glow 3s infinite;
        }

        .gift-btn:hover {
            background: var(--gold-light);
            transform: translateY(-2px);
        }

        .photo-btn {
            background: rgba(212, 175, 55, 0.1);
            color: var(--secondary);
            border: 1px solid var(--secondary);
        }

        .photo-btn:hover {
            background: rgba(212, 175, 55, 0.2);
            transform: translateY(-2px);
        }

        /* FOOTER */
        .footer {
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            padding-top: 25px;
            position: relative;
            z-index: 2;
        }

        .footer .phone {
            font-size: 16px;
            color: var(--gold-light);
            margin-bottom: 15px;
            text-decoration: none;
            display: inline-block;
        }

        .footer .share-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: var(--text-muted);
            padding: 8px 24px;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            transition: 0.3s;
        }

        .footer .share-btn:hover {
            border-color: var(--secondary);
            color: var(--secondary);
        }

        /* FLOATING DECOR PARTICLES */
        .particle {
            position: absolute;
            background: var(--secondary);
            border-radius: 50%;
            opacity: 0.5;
            animation: float 5s infinite ease-in-out;
        }
        .p1 { width: 4px; height: 4px; top: 10%; left: 10%; animation-delay: 0s; }
        .p2 { width: 6px; height: 6px; top: 20%; right: 15%; animation-delay: 1s; }
        .p3 { width: 3px; height: 3px; bottom: 20%; left: 20%; animation-delay: 2s; }
        .p4 { width: 5px; height: 5px; bottom: 10%; right: 10%; animation-delay: 0.5s; }

        /* RESPONSIVE DESIGN - MOBILE */
        @media screen and (max-width: 480px) {
            .template-wrapper { padding: 0; }
            .invitation-card {
                border-radius: 0;
                border: none;
                border-top: 3px solid var(--secondary);
                min-height: 100vh;
                padding: 40px 20px;
            }
            .invitation-card::before { display: none; }
            .hero-section h1 { font-size: 38px; }
            .hero-section .ampersand { font-size: 28px; }
            .date-time .date { font-size: 22px; }
            .venue h3 { font-size: 22px; }
            .btn { font-size: 14px; padding: 14px 20px; }
        }
    `}
    </style>
    
    

    <div class="invitation-card">
        <!-- CSS Particles -->
        <div class="particle p1"></div>
        <div class="particle p2"></div>
        <div class="particle p3"></div>
        <div class="particle p4"></div>

        <div class="hero-section">
            <div class="badge">Visol Oqshomi</div>
            <h1>${brideGroom}</h1>
        </div>

        <div class="divider">
            <span>✧</span>
        </div>

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
            <a href="tel:+998901234567" class="phone">📞 ${phone || ""}</a><br>
            <button class="share-btn">📤 Yaqinlar bilan ulashish</button>
        </div>
    </div>


</div>`;
}