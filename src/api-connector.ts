import axios from 'axios';
import { ApiConnectorConfig } from './types';

export class ApiConnector {
  private config: ApiConnectorConfig

  constructor(config: ApiConnectorConfig) {
    this.config = config;
  }

  async get(): Promise<any> {
    console.log(this.config);
    const response = await axios.get(this.config.baseUrl, {
      params: this.config.params, 
      headers: {
        ...this.config.headers,
        'Accepts': 'application/json'
      }
    });

    return response;
  }
}