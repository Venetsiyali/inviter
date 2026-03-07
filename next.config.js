/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "**.r2.cloudflarestorage.com",
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ["bcryptjs"],
    },
};

module.exports = nextConfig;
