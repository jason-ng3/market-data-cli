import mongoose, { Model, Schema } from 'mongoose';
import { MarketQuoteDocument } from './types';

// Define schema for MarketQuote document
const MarketQuoteSchema = new Schema({
  timestamp: { type: Date, default: null },
  data: Schema.Types.Mixed
});

// Define model to map to MarketQuote collection 
const MarketQuoteModel: Model<MarketQuoteDocument> = mongoose.model('MarketQuote', MarketQuoteSchema);

// Connect to MongoDB Atlas database
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

// Write data to MongoDB Atlas datbase
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