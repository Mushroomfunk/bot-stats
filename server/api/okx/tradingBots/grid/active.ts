import { PrismaClient } from '@prisma/client';
import { type Bot } from '~/types/Bot';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['POST']);

  //   const user = await prisma.bot.create({
  //     data: {
  //       email: 'elsa@prisma.io',
  //       name: 'Elsa Prisma',
  //     },
  //   })

  //   const body: Record<string, string> = await readBody(event);
  //   const params = new URLSearchParams(body);
  const { $api } = useApi();
  //   console.log(params);

  const response = await $api.get(`/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid`);
  response.data.forEach(async (element: Bot) => {
    const user = await prisma.user.findFirst();
    const existingBot = await prisma.bot.findFirst({
      where: {
        algoId: element.algoId,
      },
    });

    if (!existingBot && user) {
      await prisma.bot.create({
        data: {
          algoId: element.algoId,
          algoClOrdId: element.algoClOrdId,
          instId: element.instId,
          state: 'running',
          maxPx: element.maxPx,
          minPx: element.minPx,
          gridNum: element.gridNum,
          runType: element.runType,
          investment: element.investment,
          instFamily: element.instFamily,
          userId: user.id,
        },
      });
    }
  });
  //   console.log(response);
  return response;
});
