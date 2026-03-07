import { TemplateData } from "./index";

export function sandyBeach(data: TemplateData): string {
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

        .template-wrapper {
            --primary: #D4A373;
            /* Sandy Tan */
            --secondary: #E9EDC9;
            /* Pale Yellow/Green */
            --bg: #FAEDCD;
            /* Creamy Sand */
            --text-main: #4A5759;
            /* Ocean Rock Gray */
            --text-muted: #8F999A;
            --accent: #FEFAE0;
            /* Seafoam White */
            --ocean: #A8DADC;
            /* Light Ocean Blue */
        }

        

        .template-wrapper {
            background-color: #e6dac3;
            font-family: 'Lato', sans-serif;
            color: var(--text-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px 0;
            overflow-x: hidden;
        }

        .invitation-card {
            background: linear-gradient(180deg, var(--ocean) 0%, var(--bg) 40%, var(--bg) 100%);
            width: 100%;
            max-width: 480px;
            min-height: 90vh;
            position: relative;
            border-radius: 12px;
            padding: 40px 30px;
            box-shadow: 0 10px 40px rgba(74, 87, 89, 0.1);
            text-align: center;
            overflow: hidden;
            animation: waveIn 1s ease-out;
            z-index: 1;
        }

        @keyframes waveIn {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.98);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Abstract Sand Dunes / Waves */
        .invitation-card::before {
            content: '';
            position: absolute;
            bottom: -50px;
            left: -20%;
            right: -20%;
            height: 250px;
            background: var(--primary);
            border-radius: 50% 50% 0 0;
            opacity: 0.1;
            z-index: -2;
            animation: ocean-sway 6s infinite alternate ease-in-out;
        }

        .invitation-card::after {
            content: '';
            position: absolute;
            bottom: -80px;
            left: -10%;
            right: -30%;
            height: 200px;
            background: var(--secondary);
            border-radius: 50% 50% 0 0;
            opacity: 0.2;
            z-index: -1;
            animation: ocean-sway 8s infinite alternate-reverse ease-in-out;
        }

        @keyframes ocean-sway {
            0% {
                transform: translateX(-20px) rotate(-1deg);
            }

            100% {
                transform: translateX(20px) rotate(1deg);
            }
        }

        /* SUN GRAPHIC */
        .sun-graphic {
            width: 60px;
            height: 60px;
            background: #FFE066;
            border-radius: 50%;
            margin: 0 auto 30px;
            position: relative;
            box-shadow: 0 0 30px rgba(255, 224, 102, 0.6);
            animation: sun-pulse 4s infinite alternate;
        }

        @keyframes sun-pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(255, 224, 102, 0.4);
            }

            100% {
                transform: scale(1.1);
                box-shadow: 0 0 40px rgba(255, 224, 102, 0.8);
            }
        }

        /* HERO SECTION */
        .hero-section {
            margin-bottom: 35px;
            position: relative;
            z-index: 2;
        }

        .badge {
            display: inline-block;
            color: var(--text-main);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 25px;
            background: rgba(255, 255, 255, 0.5);
            padding: 6px 15px;
            border-radius: 20px;
        }

        .hero-section h1 {
            font-family: 'Playfair Display', serif;
            font-size: 44px;
            font-weight: 400;
            color: var(--primary);
            line-height: 1.2;
            letter-spacing: 1px;
        }

        .ampersand {
            display: block;
            color: var(--text-muted);
            font-size: 30px;
            font-style: italic;
            font-family: 'Playfair Display', serif;
            margin: -5px 0;
        }

        /* DIVIDER */
        .divider {
            margin: 25px auto;
            width: 40px;
            height: 2px;
            background: var(--primary);
            opacity: 0.5;
        }

        /* DATE & TIME */
        .date-time {
            margin-bottom: 35px;
            position: relative;
            z-index: 2;
        }

        .date-time .date {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            color: var(--text-main);
            margin-bottom: 10px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .date-time .time {
            font-size: 14px;
            color: var(--text-muted);
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* VENUE */
        .venue {
            margin-bottom: 40px;
            background: rgba(255, 255, 255, 0.6);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid rgba(212, 163, 115, 0.2);
            position: relative;
            z-index: 2;
            backdrop-filter: blur(5px);
        }

        .venue h3 {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            color: var(--primary);
            margin-bottom: 8px;
            font-weight: 700;
        }

        .venue p {
            font-size: 15px;
            line-height: 1.6;
            color: var(--text-main);
        }

        /* QR PLACEHOLDER */
        .qr-placeholder {
            width: 140px;
            height: 140px;
            background: #FFF;
            border: 2px dashed var(--primary);
            margin: 0 auto 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 8px;
            position: relative;
            z-index: 2;
            transition: transform 0.3s;
        }

        .qr-placeholder:hover {
            transform: scale(1.03) rotate(1deg);
            background: var(--accent);
        }

        /* BUTTONS */
        .actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
        }

        .btn {
            padding: 16px;
            border-radius: 40px;
            font-family: 'Lato', sans-serif;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .gift-btn {
            background: var(--primary);
            color: white;
            box-shadow: 0 5px 15px rgba(212, 163, 115, 0.3);
        }

        .gift-btn:hover {
            background: #BC8A5F;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 163, 115, 0.4);
        }

        .photo-btn {
            background: var(--accent);
            color: var(--primary);
            border: 1px solid var(--primary);
        }

        .photo-btn:hover {
            background: var(--secondary);
            transform: translateY(-2px);
        }

        /* FOOTER */
        .footer {
            position: relative;
            z-index: 2;
        }

        .footer .phone {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;
            margin-bottom: 12px;
            display: inline-block;
        }

        .footer .share-btn {
            display: block;
            margin: 0 auto;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
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
                border-top: 4px solid var(--primary);
            }

            .hero-section h1 {
                font-size: 40px;
            }

            .venue {
                padding: 15px;
            }

            .sun-graphic {
                width: 50px;
                height: 50px;
                margin-bottom: 20px;
            }
        }
    `}
    </style>
    
    

    <div class="invitation-card">

        <div class="sun-graphic"></div>

        <div class="hero-section">
            <div class="badge">Sohil Bo'yi Ziyofati</div>
            <h1>${part1}</h1>
            <span class="ampersand">&</span>
            <h1>${part2}</h1>
        </div>

        <div class="divider"></div>

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
            <a href="tel:+998901234567" class="phone">📞 ${phone || ""}</a><br>
            <button class="share-btn">Mehmonlarga Ulashish</button>
        </div>
    </div>


</div>`;
}