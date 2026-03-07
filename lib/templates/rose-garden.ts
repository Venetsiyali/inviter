import { TemplateData } from "./index";

export function roseGarden(data: TemplateData): string {
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
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@300;400;600;700&display=swap');

        /* CSS VARIABLES */
        .template-wrapper {
            --primary: #E8547A;
            --secondary: #FFE4E8;
            --bg: #FFFFFF;
            --text-main: #5D4037;
            --text-muted: rgba(93, 64, 55, 0.7);
            --accent: #D81B60;
            --btn-hover: #C2185B;
        }

        /* RESET & BASE */
        

        .template-wrapper {
            background-color: #fce4ec;
            font-family: 'Nunito', sans-serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px 0;
            overflow-x: hidden;
        }

        /* CARD CONTAINER */
        .invitation-card {
            background: var(--bg);
            width: 100%;
            max-width: 480px;
            position: relative;
            border-radius: 32px;
            padding: 50px 30px;
            box-shadow: 0 15px 40px rgba(232, 84, 122, 0.15);
            text-align: center;
            overflow: hidden;
            animation: fadeInUp 0.8s ease-out;
            z-index: 1;
        }

        /* SUBTLE FLORAL BACKGROUND PATTERN */
        .invitation-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(var(--secondary) 2px, transparent 2px);
            background-size: 24px 24px;
            opacity: 0.6;
            z-index: -2;
        }

        /* DASHED FRAME */
        .frame {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 2px dashed rgba(232, 84, 122, 0.3);
            border-radius: 20px;
            pointer-events: none;
            z-index: -1;
        }

        /* ANIMATIONS */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* CSS KEYFRAMES - FALLING CHERRY BLOSSOMS/PETALS */
        .petal {
            position: absolute;
            background: var(--secondary);
            border: 1px solid rgba(232, 84, 122, 0.2);
            border-radius: 150% 0 150% 0;
            animation: falling linear infinite;
            opacity: 0.8;
            z-index: -1;
        }

        .p1 {
            width: 15px;
            height: 15px;
            left: 15%;
            animation-duration: 7s;
        }

        .p2 {
            width: 22px;
            height: 22px;
            left: 50%;
            animation-duration: 9s;
            animation-delay: -2s;
        }

        .p3 {
            width: 12px;
            height: 12px;
            left: 80%;
            animation-duration: 6s;
            animation-delay: -4s;
        }

        .p4 {
            width: 18px;
            height: 18px;
            left: 35%;
            animation-duration: 8s;
            animation-delay: -1s;
        }

        .p5 {
            width: 14px;
            height: 14px;
            left: 70%;
            animation-duration: 7.5s;
            animation-delay: -3s;
        }

        @keyframes falling {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 0;
            }

            15% {
                opacity: 0.8;
            }

            80% {
                opacity: 0.8;
            }

            100% {
                transform: translateY(900px) rotate(360deg);
                opacity: 0;
            }
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 30px;
        }

        .badge {
            display: inline-block;
            background: var(--secondary);
            color: var(--accent);
            padding: 6px 18px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 25px;
        }

        .hero-section h1 {
            font-family: 'Dancing Script', cursive;
            font-size: 54px;
            color: var(--accent);
            line-height: 1.2;
            margin-bottom: -5px;
        }

        /* DIVIDER */
        .divider {
            margin: 20px 0 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 20px;
            opacity: 0.5;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 228, 232, 0.4);
            border-radius: 16px;
            border: 1px solid rgba(255, 228, 232, 0.8);
        }

        .date-time .date {
            font-size: 18px;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 5px;
        }

        .date-time .time {
            font-size: 15px;
            color: var(--text-muted);
            font-weight: 600;
        }

        /* VENUE */
        .venue {
            margin-bottom: 35px;
        }

        .venue h3 {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 8px;
        }

        .venue p {
            font-size: 14px;
            line-height: 1.5;
            color: var(--text-muted);
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 160px;
            height: 160px;
            background: #E5E7EB;
            border: 3px solid var(--secondary);
            border-radius: 20px;
            margin: 0 auto 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent);
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s;
        }

        .qr-placeholder:hover {
            transform: scale(1.03);
            border-color: var(--primary);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 35px;
        }

        .btn {
            padding: 16px 24px;
            border-radius: 50px;
            font-family: 'Nunito', sans-serif;
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .gift-btn {
            background: var(--primary);
            color: white;
            box-shadow: 0 8px 20px rgba(232, 84, 122, 0.25);
        }

        .gift-btn:hover {
            background: var(--btn-hover);
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(232, 84, 122, 0.35);
        }

        .photo-btn {
            background: var(--secondary);
            color: var(--accent);
        }

        .photo-btn:hover {
            background: #FFD2D9;
            transform: translateY(-2px);
        }

        /* FOOTER */
        .footer {
            border-top: 1px dashed rgba(232, 84, 122, 0.2);
            padding-top: 20px;
        }

        .footer .phone {
            font-size: 16px;
            font-weight: 700;
            color: var(--accent);
            text-decoration: none;
            margin-bottom: 12px;
            display: inline-block;
        }

        .footer .share-btn {
            background: transparent;
            border: 1px solid var(--primary);
            color: var(--primary);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
        }

        .footer .share-btn:hover {
            background: var(--primary);
            color: white;
        }

        /* RESPONSIVE DESIGN - MOBILE */
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
                border-top: 4px solid var(--primary);
            }

            .frame {
                border-radius: 0;
                top: 10px;
                bottom: 10px;
                left: 10px;
                right: 10px;
            }

            .hero-section h1 {
                font-size: 46px;
            }

            .btn {
                font-size: 14px;
                padding: 14px 20px;
            }
        }
    `}
    </style>
    
    

    <div class="invitation-card">
        <div class="frame"></div>

        <!-- CSS Animated Petals -->
        <div class="petal p1"></div>
        <div class="petal p2"></div>
        <div class="petal p3"></div>
        <div class="petal p4"></div>
        <div class="petal p5"></div>

        <div class="hero-section">
            <div class="badge">Nikoh To'yi</div>
            <h1>${brideGroom}</h1>
        </div>

        <div class="divider">❦</div>

        <div class="date-time">
            <div class="date">${formattedDate}</div>
            <div class="time">🕒 ${eventTime ? `SOAT ${eventTime}` : ""} da</div>
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
            <button class="share-btn">📤 Do'stlarga ulashish</button>
        </div>
    </div>


</div>`;
}