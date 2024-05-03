import dotenv from 'dotenv';
dotenv.config();
import { program } from 'commander';
import { gatherMarketData } from './adapter';

interface CommandOptions {
  venue: string;
  pair: string;
}

program
  .option('-v, --venue <venue>', 'Specify the venue: Coinmarketcap')
  .option('-p, --pair <pair>', 'Specify the crypto pair (e.g., BTC/USD)')
  .parse(process.argv);


const main = async () => {
  const { venue, pair } = program.opts<CommandOptions>();

  try {
    console.log('Gathering market data...');
    const marketData = await gatherMarketData(venue.toLowerCase(), pair.toUpperCase());
    console.log('Market data retrieved successfully');
    console.log(marketData);
  } catch(error) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
      process.exit(1);
    }
  }
}

main();
