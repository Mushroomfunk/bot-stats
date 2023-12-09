import CryptoJS from 'crypto-js';

export function useApi() {
  const timestamp = new Date().toISOString();
  const accessKey = '6300fc46-100f-4320-a522-05bbcc4d4e03';
  const passphrase = 'Jm7h28lk15j8!';
  const secret = 'A91FC9C62EC1EAC21BE0931FEA13A9D5';

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
