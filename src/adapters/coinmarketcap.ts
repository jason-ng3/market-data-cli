import { ApiConnector } from "../api-connector";
import { AdapterInterface } from "../types";

const apiKey = process.env.COINMARKETCAP_API_KEY;

export class CoinMarketCapAdapter implements AdapterInterface {
  private apiConnector: ApiConnector

  constructor(pair: string, startTime: string, endTime: string, interval: string) {
    const [symbol, convert] = pair.split('/');

    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Please provide a valid CoinMarketCap API key.');
    }

    this.apiConnector = new ApiConnector({
      baseUrl: 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical',
      params: { 
        symbol, 
        convert, 
        time_start: startTime, 
        time_end: endTime, 
        time_period: interval 
      },
      headers: { 
        'X-CMC_PRO_API_KEY': apiKey 
      },
    });
  }

  async gatherMarketData(): Promise<any> {
    const response = await this.apiConnector.get();
    return this.parseResponse(response);
  }

  parseResponse(response: any): any {
    return response.data.data;
  }
}