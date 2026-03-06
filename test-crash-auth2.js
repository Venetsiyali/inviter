const { PrismaClient } = require('@prisma/client');
const http = require('http');
const prisma = new PrismaClient();

async function traceError() {
    try {
        const session = await prisma.session.findFirst();
        if (!session) return console.log("Session not found");

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/events/create?ai=true&type=wedding',
            method: 'GET',
            headers: {
                'Cookie': `auth_session=${session.id}`
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const errIndex = data.indexOf("Error:");
                if (errIndex > -1) {
                    console.log("=== FULL RESPONSE SNIPPET ===");
                    console.log(data.substring(errIndex - 50, errIndex + 500));
                } else if (data.includes('data-nextjs-dialog-header')) {
                    const match = data.match(/data-nextjs-dialog-header="([^"]+)"/);
                    console.log("Error header:", decodeURIComponent(match?.[1]));
                } else {
                    console.log("No error found. Status:", res.statusCode);
                    console.log("Response starts with:", data.substring(0, 100));
                }
            });
        });

        req.on('error', e => console.error(e));
        req.end();
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
traceError();
