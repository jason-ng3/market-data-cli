interface CoinMarketCapMarketData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  last_updated: string;
}

export type MarketData = CoinMarketCapMarketData;