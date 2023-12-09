export default defineEventHandler(async (event) => {
  //   const body: Record<string, string> = await readBody(event);
  //   const params = new URLSearchParams(body);
  const { $api } = useApi();
  //   console.log(params);

  const response = await $api.get(`/tradingBot/grid/orders-algo-pending?algoOrdType=contract_grid`);
  return response;
});
