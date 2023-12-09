import { PrismaClient } from '@prisma/client';
import { type Bot } from '~/types/Bot';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { $api } = useApi();
  console.log(123);

  const response = await $api.get(`/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid`);
  response.data.forEach(async (element: Bot) => {
    const existingBot = await prisma.bot.findFirst({
      where: {
        algoId: element.algoId,
        state: 'running',
      },
    });

    if (existingBot) {
      console.log(existingBot);
      try {
        await prisma.botHistory.create({
          data: {
            arbitrageNum: element.arbitrageNum,
            totalPnl: element.totalPnl,
            pnlRatio: element.pnlRatio,
            gridProfit: element.gridProfit,
            floatProfit: element.floatProfit,
            botId: existingBot.id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});
