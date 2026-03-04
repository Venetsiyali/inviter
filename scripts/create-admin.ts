import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Admin foydalanuvchi yaratilmoqda...\n');

    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@Inviter.uz' },
        });

        if (existingAdmin) {
            console.log('⚠️  Admin foydalanuvchi allaqachon mavjud!');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Role:', existingAdmin.role);
            console.log('💎 Plan:', existingAdmin.plan);

            // Update to ensure ADMIN role and PREMIUM plan
            const updated = await prisma.user.update({
                where: { email: 'admin@Inviter.uz' },
                data: {
                    role: 'ADMIN',
                    plan: 'PREMIUM',
                    emailVerified: true,
                },
            });

            console.log('\n✅ Admin role va plan yangilandi!');
            return;
        }

        // Create password hash for InviteUz2024#
        const passwordHash = await bcrypt.hash('InviteUz2024#', 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email: 'admin@Inviter.uz',
                name: 'Super Admin',
                passwordHash: passwordHash,
                emailVerified: true,
                role: 'ADMIN',
                plan: 'PREMIUM',
            },
        });

        console.log('✅ Admin foydalanuvchi muvaffaqiyatli yaratildi!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    admin@Inviter.uz');
        console.log('🔑 Parol:    InviteUz2024#');
        console.log('👤 Role:     ADMIN');
        console.log('💎 Plan:     PREMIUM');
        console.log('✅ Verified: true');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n✨ Endi login qilishingiz mumkin: /auth/login\n');
    } catch (error: any) {
        console.error('❌ Xatolik:', error.message);
        throw error;
    }
}

main()
    .catch((error) => {
        console.error('\n❌ Fatal error:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
