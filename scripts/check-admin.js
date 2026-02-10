// Quick check if admin user exists in database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdmin() {
    try {
        console.log('🔍 Admin user qidirilmoqda...\n');

        const admin = await prisma.user.findUnique({
            where: { email: 'admin@invite.uz' }
        });

        if (!admin) {
            console.log('❌ Admin user topilmadi!');
            console.log('   Supabase SQL Editor orqali yarating.');
            return;
        }

        console.log('✅ Admin user topildi!\n');
        console.log('📧 Email:', admin.email);
        console.log('👤 Ism:', admin.name);
        console.log('🔑 Password Hash:', admin.passwordHash.substring(0, 30) + '...');
        console.log('✅ Email Verified:', admin.emailVerified);
        console.log('👤 Role:', admin.role);
        console.log('💎 Plan:', admin.plan);
        console.log('\n✨ Admin mavjud - login qilish mumkin!\n');

    } catch (error) {
        console.error('❌ Xatolik:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkAdmin();
