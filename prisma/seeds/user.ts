import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
    },
  });
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'User',
      provider: {
        create: [
          // temporary
          {
            name: 'okx',
            apiKey: process.env.OKX_APIKEY!,
            passphrase: process.env.OKX_PASSPHRASE!,
            secretKey: process.env.OKX_SECRETKEY!,
          },
        ],
      },
    },
  });
}
