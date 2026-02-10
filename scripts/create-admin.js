const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🔧 Creating admin user...')

    // Delete existing admin
    await prisma.user.deleteMany({
        where: { email: 'admin@invite.uz' }
    })

    // Hash password
    const passwordHash = await bcrypt.hash('InviteUz2024#', 10)

    // Create admin
    const admin = await prisma.user.create({
        data: {
            id: 'admin_001',
            email: 'admin@invite.uz',
            name: 'Super Admin',
            passwordHash,
            emailVerified: true,
            role: 'ADMIN',
            plan: 'PREMIUM',
        }
    })

    console.log('✅ Admin created:', admin.email)
    console.log('   Role:', admin.role)
    console.log('   Plan:', admin.plan)
    console.log('   Email Verified:', admin.emailVerified)
    console.log('\n🔐 Login Credentials:')
    console.log('   Email: admin@invite.uz')
    console.log('   Parol: InviteUz2024#')
}

main()
    .then(() => {
        console.log('\n✅ Done!')
        prisma.$disconnect()
    })
    .catch((error) => {
        console.error('❌ Error:', error)
        prisma.$disconnect()
        process.exit(1)
    })
