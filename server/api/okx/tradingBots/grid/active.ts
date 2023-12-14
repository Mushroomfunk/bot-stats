import { PrismaClient } from '@prisma/client';
import { type OkxBotData, type OkxResponse } from '~/types/Bot';
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
  const { $api } = await useApi();
  //   console.log(params);
  const user = await prisma.user.findFirst({
    where: {
      email: 'user@example.com',
    },
  });
  const response: OkxResponse<OkxBotData[]> = await $api.get(
    `/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid`
  );
  response.data.forEach(async (element) => {
    const existingBot = await prisma.bot.findFirst({
      where: {
        algoId: BigInt(element.algoId),
      },
    });

    if (!existingBot && user) {
      await prisma.bot.create({
        data: {
          algoId: BigInt(element.algoId),
          algoClOrdId: Number(element.algoClOrdId),
          instId: element.instId,
          state: element.state,
          direction: element.direction,
          maxPx: Number(element.maxPx),
          minPx: Number(element.minPx),
          gridNum: Number(element.gridNum),
          runType: element.runType,
          investment: Number(element.investment),
          instFamily: element.instFamily,
          lever: Number(element.lever),
          basePos: Boolean(element.basePos),
          userId: user.id,
        },
      });
    }
  });
  //   console.log(response);
  return response;
});
