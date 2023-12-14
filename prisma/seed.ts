import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/user';

const prisma = new PrismaClient();

seedUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
