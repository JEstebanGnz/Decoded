import { PrismaClient, CyclePhase } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: "esteban@decoded.com" },
    update: {},
    create: {
      googleId: "google-test-123",
      name: "Esteban",
      email: "esteban@decoded.com",
    },
  });

  // Crear partner de prueba
  const partner = await prisma.partner.upsert({
    where: { id: "partner-test-001" },
    update: {},
    create: {
      id: "partner-test-001",
      userId: user.id,
      name: "Kathe",
      age: 25,
      likes: ["deporte", "aire libre", "música", "bailar"],
      dislikes: ["ruido excesivo", "lugares muy llenos"],
      notes: "Le gustan los momentos íntimos y genuinos. Tiene inseguridades ocasionales con su cuerpo.",
    },
  });

  // Crear ciclo de prueba
  await prisma.cycleEntry.upsert({
    where: { id: "cycle-test-001" },
    update: {},
    create: {
      id: "cycle-test-001",
      partnerId: partner.id,
      startDate: new Date("2026-04-16"),
      cycleLength: 28,
      currentPhase: CyclePhase.menstrual,
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });