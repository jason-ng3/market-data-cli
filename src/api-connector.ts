import axios from 'axios';

export interface ApiConnectorConfig {
  baseUrl: string;
  apiKey: string;
  params?: { [key: string]: string | number };
  headers?: { [key: string]: string };
}

export class ApiConnector {
  private config: ApiConnectorConfig

  constructor(config: ApiConnectorConfig) {
    this.config = config;
  }

  async get(): Promise<any> {
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