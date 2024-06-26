import { ApiConnector } from "../api-connector";
import { AdapterInterface } from "../types";

export class SfoxAdapter implements AdapterInterface {
  private apiConnector: ApiConnector

  constructor(pair: string, startTime: string, endTime: string, interval: number = 60) {
    this.apiConnector = new ApiConnector({
      baseUrl: 'https://chartdata.sfox.com/candlesticks',
      params: { 
        pair, 
        startTime, 
        endTime, 
        period: interval, 
      },
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