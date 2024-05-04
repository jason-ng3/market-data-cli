import { ApiConnector } from "./api-connector";
import { MarketData, AdapterInterface } from "./types";

export class CoinMarketCapAdapter implements AdapterInterface {
  private apiConnector: ApiConnector
  private symbol: string
  private convert: string

  constructor(apiKey: string, pair: string) {
    const [symbol, convert] = pair.split('/');
    this.symbol = symbol;
    this.convert = convert;

    this.apiConnector = new ApiConnector({
      baseUrl: 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/latest',
      apiKey,
      params: { symbol, convert },
      headers: { 'X-CMC_PRO_API_KEY': apiKey },
    });
  }

  async gatherMarketData(): Promise<MarketData> {
    const response = await this.apiConnector.get();
    const marketData = this.parseResponse(response);
    return marketData;
  }

  parseResponse(response: any): MarketData {
    const marketData = response.data.data[`${this.symbol}`].quote[`${this.convert}`];
    delete marketData.last_updated;
    return marketData;
  }
}