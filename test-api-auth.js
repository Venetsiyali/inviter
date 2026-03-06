const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const http = require('http');

async function main() {
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log("No user found");
            return;
        }

        // We will insert a raw session into the DB to bypass lucia library dependency easily
        const sessionId = "test_session_" + Date.now();
        await prisma.session.create({
            data: {
                id: sessionId,
                userId: user.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
            }
        });

        const payload = JSON.stringify({
            eventType: "wedding",
            title: "Test Full API",
            date: "2023-10-12T15:30",
            location: "Tashkent",
            description: "Full simulation",
            aiDesign: null
        });

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/events',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Cookie': `auth_session=${sessionId}`
            }
        };

        const req = http.request(options, (res) => {
            let data = '';

            console.log('API Status Code:', res.statusCode);

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                console.log('API Response:', data);
                // Clean up session
                await prisma.session.delete({ where: { id: sessionId } });
                await prisma.$disconnect();
            });
        });

        req.on('error', (error) => {
            console.error('Request Error:', error);
        });

        req.write(payload);
        req.end();

    } catch (e) {
        console.error(e);
        await prisma.$disconnect();
    }
}

main();
