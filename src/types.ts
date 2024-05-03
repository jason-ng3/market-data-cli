import { Document } from 'mongoose';

// Interfaces for market data
export interface MarketData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

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