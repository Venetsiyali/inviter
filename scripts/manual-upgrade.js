import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function upgradeUser() {
    try {
        await prisma.user.updateMany({
            where: { email: 'dilov_t_e@mail.ru' },
            data: { plan: 'PREMIUM' }
        });
        console.log("Upgraded dilov_t_e@mail.ru to PREMIUM");
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

upgradeUser();
