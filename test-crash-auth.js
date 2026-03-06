const { PrismaClient } = require('@prisma/client');
const http = require('http');
const prisma = new PrismaClient();

async function traceError() {
    try {
        const user = await prisma.user.findFirst({ where: { email: 'dilov_t_e@mail.ru' } });
        if (!user) return console.log("User not found");

        const session = await prisma.session.findFirst({ where: { userId: user.id } });
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
                // Find the error message
                const errIndex = data.indexOf("Error:");
                if (errIndex > -1) {
                    console.log("Found error:");
                    console.log(data.substring(errIndex - 50, errIndex + 300));
                } else {
                    console.log("No error string found in response body.");
                    console.log("Status:", res.statusCode);
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
