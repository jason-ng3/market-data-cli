import { Document } from 'mongoose';

// Interfaces for market data specific to each API
interface CoinMarketCapMarketData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  last_updated: string;
}

export type MarketData = CoinMarketCapMarketData;

// Interface for command-line options
export interface CommandOptions {
  venue: string;
  pair: string;
}

// Interface for MarketQuote documents
export interface MarketQuoteDocument extends Document {
  timestamp: Date;
  data: any;
}