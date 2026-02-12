export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Invite.uz",
        "url": "https://inviter.uz",
        "logo": "https://inviter.uz/logo.png",
        "description": "O'zbekistondagi ilk AI yordamida taklifnoma yaratish platformasi",
        "founder": {
            "@type": "Person",
            "name": "Rustamjon Nasridinov",
            "jobTitle": "O'qituvchi",
            "worksFor": {
                "@type": "EducationalOrganization",
                "name": "Toshkent Axborot Texnologiyalari Universiteti",
                "alternateName": "TATU"
            }
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@inviter.uz",
            "contactType": "Customer Service",
            "areaServed": "UZ",
            "availableLanguage": ["uz", "ru"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressRegion": "Toshkent"
        },
        "sameAs": [
            "https://github.com/Venetsiyali/inviter"
        ]
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Invite.uz",
        "applicationCategory": "WebApplication",
        "applicationSubCategory": "Event Planning",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "UZS",
            "description": "Bepul asosiy xizmatlar"
        },
        "description": "AI sun'iy intellekt yordamida professional taklifnomalar yaratish platformasi. To'y, tug'ilgan kun, nikoh va boshqa tadbirlar uchun raqamli taklifnomalarni bir necha daqiqada yarating.",
        "author": {
            "@type": "Person",
            "name": "Rustamjon Nasridinov",
            "jobTitle": "O'qituvchi, Dasturchi",
            "affiliation": {
                "@type": "EducationalOrganization",
                "name": "Toshkent Axborot Texnologiyalari Universiteti",
                "alternateName": "TATU"
            }
        },
        "creator": {
            "@type": "Person",
            "name": "Rustamjon Nasridinov"
        },
        "url": "https://inviter.uz",
        "screenshot": "https://inviter.uz/screenshot.png",
        "softwareVersion": "1.0.0",
        "datePublished": "2026-02-12",
        "inLanguage": ["uz-UZ", "ru-RU"],
        "featureList": [
            "AI yordamida dizayn generatsiyasi",
            "Raqamli taklifnomalar",
            "QR kod yaratish",
            "RSVP boshqaruvi",
            "Mehmonlar ro'yxati",
            "Ijtimoiy tarmoqlarda ulashish",
            "Email yuborish",
            "O'zbek tilida interfeys"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "ratingCount": "1",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(softwareSchema)
                }}
            />
        </>
    );
}
