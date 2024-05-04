import { Document } from 'mongoose';

// Interface for adapter
export interface AdapterInterface {
  gatherMarketData(): Promise<any>;
  parseResponse(response: any): any;
}

// Interface for command-line options
export interface CommandOptions {
  venue: string;
  pair: string;
  startTime: string;
  endTime: string;
  interval: string;
}

// Interface for MarketQuote documents
export interface MarketQuoteDocument extends Document {
  timestamp: Date;
  data: any;
}