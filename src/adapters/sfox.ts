import { ApiConnector } from "../api-connector";
import { AdapterInterface } from "../types";

const apiKey = process.env.SFOX_API_KEY;

export class SfoxAdapter implements AdapterInterface {
  private apiConnector: ApiConnector

  constructor(pair: string, startTime: string, endTime: string, interval: number = 60) {
    pair = pair.split('/').join('').toLowerCase();

    if (!apiKey) {
      throw new Error('Please provide a valid CoinMarketCap API key.');
    }

    this.apiConnector = new ApiConnector({
      baseUrl: 'https://chartdata.sfox.com/candlesticks',
      params: { 
        pair, 
        startTime, 
        endTime, 
        period: interval, 
      },
      headers: { Authorization: `Bearer ${apiKey}` }
    });
  }

  async gatherMarketData(): Promise<any> {
    const response = await this.apiConnector.get();
    return this.parseResponse(response);
  }

  parseResponse(response: any): any {
    return response.data;
  }
}