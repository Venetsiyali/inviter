const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Finding user...");
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log("No user found in DB");
            return;
        }

        console.log("Found user ID:", user.id);

        console.log("Creating event...");
        const event = await prisma.event.create({
            data: {
                userId: user.id,
                type: "wedding",
                title: "Test Event",
                date: new Date("2023-10-12T15:30"),
                location: "Tashkent",
                description: "Test description",
                contentJson: JSON.stringify({
                    title: "Test Event",
                    date: "2023-10-12T15:30",
                    location: "Tashkent",
                    description: "Test description",
                }),
                designConfig: JSON.stringify({
                    typography: {},
                    colorPalette: {},
                    layout: {},
                    patterns: {}
                }),
                isPublished: false,
            },
        });

        console.log("✅ Event created successfully:", event.id);

        // Delete the test event
        await prisma.event.delete({ where: { id: event.id } });
        console.log("Test event cleaned up.");

    } catch (err) {
        console.error("❌ Pristma Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
