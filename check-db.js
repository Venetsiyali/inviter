const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUserStatus() {
    try {
        const users = await prisma.user.findMany({
            include: {
                _count: {
                    select: { events: true }
                }
            }
        });

        console.log("Users in DB:");
        for (const u of users) {
            console.log(`- ${u.email} | Plan: ${u.plan} | Premium Until: ${u.premiumValidUntil} | Events: ${u._count.events}`);

            // List their events
            if (u._count.events > 0) {
                const events = await prisma.event.findMany({ where: { userId: u.id }, select: { id: true, title: true } });
                console.log("  Events:", events);
            }
        }
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

checkUserStatus();
