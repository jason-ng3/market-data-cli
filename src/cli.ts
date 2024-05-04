import dotenv from 'dotenv';
dotenv.config();
import { program } from 'commander';
import { CoinMarketCapAdapter } from './coinmarketcap';
import { connectToDatabase, writeToDatabase } from './database';
import { CommandOptions, AdapterInterface } from './types';

// Parse command-line parameters using commander
program
  .option('-v, --venue <venue>', 'Specify the venue: Coinmarketcap')
  .option('-p, --pair <pair>', 'Specify the crypto pair (e.g., BTC/USD)')
  .parse(process.argv);

// main function for starting CLI
const main = async () => {
  const timestamp = new Date();
  const { venue, pair } = program.opts<CommandOptions>();

  try {
    console.log('Program run time: ', timestamp);

    // Validate the pair option
    if (!/^[a-zA-Z]+\/[a-zA-Z]+$/i.test(pair)) {
      console.error('Invalid pair format. The pair should be in the format "XXX/YYY"');
      process.exit(1);
    }

    // Validate the venue option
    let adapter: AdapterInterface;
    switch (venue.toLowerCase()) {
      case 'coinmarketcap':
        const apiKey = process.env.COINMARKETCAP_API_KEY;
        if (!apiKey) {
          throw new Error('Please provide a valid CoinMarketCap API key.');
        }
        adapter = new CoinMarketCapAdapter(apiKey, pair);
        break;
      default:
        console.error(`Unsupported venue: ${venue}`);
        process.exit(1);
    }

    if (adapter) {
      // Gather market data
      console.log('Gathering market data...');
      const marketData = await adapter.gatherMarketData();
      console.log('Market quote: ', marketData);

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
