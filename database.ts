import mongoose, { Model, Schema } from 'mongoose';
import { MarketQuoteDocument } from './types';

const MarketQuoteSchema = new Schema({
  timestamp: { type: Date, default: null },
  data: Schema.Types.Mixed
});

const MarketQuoteModel: Model<MarketQuoteDocument> = mongoose.model('MarketQuote', MarketQuoteSchema);

export const connectToDatabase = async (): Promise<void>  => {
  const url = process.env.MONGODB_URI;

  if (!url) {
    throw new Error('MongoDB URI is not defined');
  }

  try {
    await mongoose.connect(url);
  } catch (error) {
      throw error;
  }
};

export const writeToDatabase = async (data: any, timestamp: Date): Promise<void> => {
  try {
    const marketQuote = new MarketQuoteModel({ 
      timestamp: timestamp,
      data: data 
    });

    await marketQuote.save();
    mongoose.connection.close()
  } catch (error) {
      throw error;
  }
};