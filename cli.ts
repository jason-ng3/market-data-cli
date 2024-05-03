import * as commander from 'commander';

interface CommandOptions {
  venue: string;
  pair: string;
}

const program = new commander.Command();

program
  .option('-v, --venue <venue>', 'Specify the venue: Coinmarketcap')
  .option('-p, --pair <pair>', 'Specify the crypto pair (e.g., BTC/USD)')
  .parse(process.argv);

const { venue, pair } = program.opts<CommandOptions>();
console.log(venue, pair);