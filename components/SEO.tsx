import Head from "next/head";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({
    title = "inviter.uz — Raqamli taklifnomalar platformasi",
    description = "O'zbekistondagi eng zamonaviy online taklifnomalar yaratish platformasi. To'y, osh, unashtiruv va boshqa marosimlar uchun.",
    image = "https://inviter.uz/og-image.jpg",
    url = "https://inviter.uz",
}: SEOProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
