import { PrismaClient } from '@prisma/client';
import { type OkxResponse, type OkxBotData } from '~/types/Bot';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { $api } = await useApi();

  const response: OkxResponse<OkxBotData[]> = await $api.get(
    `/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid`
  );
  response.data.forEach(async (element) => {
    const existingBot = await prisma.bot.findFirst({
      where: {
        algoId: BigInt(element.algoId),
        state: 'running',
      },
    });

    if (existingBot) {
      console.log(existingBot);
      try {
        await prisma.botHistory.create({
          data: {
            actualLever: Number(element.actualLever),
            arbitrageNum: Number(element.arbitrageNum),
            totalPnl: Number(element.totalPnl),
            pnlRatio: Number(element.pnlRatio),
            gridProfit: Number(element.gridProfit),
            floatProfit: Number(element.floatProfit),
            liqPx: Number(element.liqPx),
            botId: existingBot.id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
});
