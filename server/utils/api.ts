import CryptoJS from 'crypto-js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function useApi() {
  const userProvider = await prisma.userProvider.findFirst();

  const timestamp = new Date().toISOString();
  const accessKey = userProvider?.apiKey;
  const passphrase = userProvider?.passphrase;
  const secret = userProvider?.secretKey;

  const sign = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
      timestamp + 'GET' + '/api/v5/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid',
      secret
    )
  );

  const $api = {
    get: async (url: string) =>
      await $fetch(url, {
        headers: {
          'OK-ACCESS-KEY': accessKey,
          'OK-ACCESS-SIGN': sign,
          'OK-ACCESS-TIMESTAMP': timestamp,
          'OK-ACCESS-PASSPHRASE': passphrase,
        },
        method: 'GET',
        baseURL: 'https://okx.com/api/v5',
      }),
  };

  return { $api };
}
