import dotenv from 'dotenv';
dotenv.config();
import { program } from 'commander';
import { adapters } from './adapters/adapterRegistry';
import { connectToDatabase, writeToDatabase } from './database';
import { CommandOptions } from './types';

// Parse command-line parameters using commander
program
  .option('-v, --venue <venue>', 'Specify the venue: Coinmarketcap')
  .option('-p, --pair <pair>', 'Specify the crypto pair (e.g., BTC/USD)')
  .option('-s, --startTime <start_time>', 'Specify the start time')
  .option('-e, --endTime <end_time>', 'Specify the end time')
  .option('-i, --interval <interval>', 'Specify the interval')
  .parse(process.argv);

// main function for starting CLI
const main = async () => {
  const timestamp = new Date();
  const { venue, pair, startTime, endTime, interval } = program.opts<CommandOptions>();

  try {
    console.log('Program run time: ', timestamp);

    // Validate the venue option
    let adapter;
    const venueKey = venue.toLowerCase();
    if (venueKey in adapters) {
      const AdapterClass = (adapters as Record<string, any>)[venueKey];
      adapter = new AdapterClass(pair, startTime, endTime, interval);
    } else {
      console.error(`Unsupported venue: ${venue}`);
      process.exit(1);
    }

    if (adapter) {
      // Gather market data
      console.log('Gathering market data...');
      const marketData = await adapter.gatherMarketData();
      console.log('Market data: ', marketData);

      // Connect and write to MongoDB Atlas
      console.log('Writing data to database...');
      await connectToDatabase();
      await writeToDatabase(marketData, timestamp);
      console.log('Data written to database successfully');
    }
  } catch(error) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
      process.exit(1);
    }
  }
}

// Start the CLI
main();
