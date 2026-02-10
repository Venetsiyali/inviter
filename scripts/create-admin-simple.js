// Simplified Admin Creation - Direct SQL approach
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    console.log('🔧 Admin user yaratilmoqda...\n');

    // Direct PostgreSQL connection
    const client = new Client({
        connectionString: process.env.DATABASE_URL ||
            'postgresql://postgres:InviteUz2024%23@db.vlsuupwvcgcqiwxggeap.supabase.co:5432/postgres'
    });

    try {
        await client.connect();
        console.log('✅ Database connected!\n');

        // Check if admin exists
        const checkResult = await client.query(
            'SELECT * FROM "User" WHERE email = $1',
            ['admin@invite.uz']
        );

        if (checkResult.rows.length > 0) {
            console.log('⚠️  Admin user allaqachon mavjud!');
            console.log('📧 Email:', checkResult.rows[0].email);
            console.log('👤 Role:', checkResult.rows[0].role);
            console.log('💎 Plan:', checkResult.rows[0].plan);

            // Update to ensure ADMIN role
            await client.query(
                'UPDATE "User" SET role = $1, plan = $2, "emailVerified" = $3 WHERE email = $4',
                ['ADMIN', 'PREMIUM', true, 'admin@invite.uz']
            );
            console.log('\n✅ Admin role va plan yangilandi!');
            return;
        }

        // Generate ID and password hash
        const id = 'admin_' + Date.now();
        const passwordHash = await bcrypt.hash('InviteUz2024#', 10);

        // Create admin user
        await client.query(
            `INSERT INTO "User" (id, email, name, "passwordHash", "emailVerified", role, plan, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
            [id, 'admin@invite.uz', 'Super Admin', passwordHash, true, 'ADMIN', 'PREMIUM']
        );

        console.log('✅ Admin user muvaffaqiyatli yaratildi!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    admin@invite.uz');
        console.log('🔑 Parol:    InviteUz2024#');
        console.log('👤 Role:     ADMIN');
        console.log('💎 Plan:     PREMIUM');
        console.log('✅ Verified: true');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n✨ Endi login qilishingiz mumkin: /auth/login\n');

    } catch (error) {
        console.error('❌ Xatolik:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

createAdmin()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('\n❌ Fatal error:', err);
        process.exit(1);
    });
