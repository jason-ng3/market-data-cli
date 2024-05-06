import { ApiConnector } from "../api-connector";
import { AdapterInterface } from "../types";

export class DerabitAdapter implements AdapterInterface {
  private apiConnector: ApiConnector

  constructor(pair: string, startTime: string, endTime: string, interval: string) {
    this.apiConnector = new ApiConnector({
      baseUrl: 'https://test.deribit.com/api/v2/public/get_tradingview_chart_data',
      params: { 
        instrument_name: pair, 
        start_timestamp: startTime, 
        end_timestamp: endTime, 
        resolution: interval 
      },
    });
  }

  async gatherMarketData(): Promise<any> {
    const response = await this.apiConnector.get();
    return this.parseResponse(response);
  }

  parseResponse(response: any): any {
    return response.data.result;
  }
}