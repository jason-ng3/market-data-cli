## How to run CLI tool:
1. Clone the market-data-cli repository. The market-data-cli repo holds the CLI tool.
  - `git clone https://github.com/jason-ng3/market-data-cli.git`
2. Navigate to the root of each project directory and install dependencies: 
  - `npm install`
3. Add MongoDB Atlas URI and CoinMarketCap API keys to an `.env` file in the `market-data-app/server` directory. Since OHLCV data from CoinMarketCap requires
a paid plan, I used their test API key (indicated below) and test domain (sandbox-api.coinmarketcap.com). 
  - `COINMARKETCAP_API_KEY=b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c` 
  - `MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.<cluster-shard>.mongodb.net/<database>?retryWrites=true&w=majority`
4. To run a command for fetching from CoinMarketCap for a crypto pair:
  - `npm run cli -- -v CoinMarketCap -p <BTC/USD>`

## Design
1. I wrote the CLI tool in TypeScript and used the commander npm package to create the CLI interface.
2. I have an adapter module (`adapter.ts`), which acts as a flexible and unifed way to add new venues to the `gatherMarketData` function,
each of which encapsulates the logic for fetching data from a given venue's API.
