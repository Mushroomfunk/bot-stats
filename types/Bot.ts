export type OkxResponse<DataType> = {
  code: string;
  data: DataType;
  msg: string;
};

export type OkxBotData = {
  algoId: string;
  algoClOrdId: string;
  algoOrdType: string;
  actualLever: string;
  state: 'starting' | 'running' | 'stopped' | 'no_close_position';
  maxPx: string;
  minPx: string;
  gridNum: string;
  runType: string;
  arbitrageNum: string;
  totalPnl: string;
  pnlRatio: string;
  investment: string;
  gridProfit: string;
  floatProfit: string;
  instFamily: string;
  limitPrice: string;
  instId: string;
  liqPx: string;
  direction: string;
  lever: string;
  basePos: boolean;
};
