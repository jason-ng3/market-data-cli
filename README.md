## How to run CLI tool:
1. Clone the market-data-cli repository. The market-data-cli repo holds the CLI tool.
  - `git clone https://github.com/jason-ng3/market-data-cli.git`
2. Navigate to the root of each project directory and install dependencies: 
  - `npm install`
3. Add MongoDB Atlas URI and CoinMarketCap API key to an `.env` file in the `market-data-app/server` directory. Since OHLCV data from CoinMarketCap requires a paid plan, I used their test API key (indicated below) and test domain (sandbox-api.coinmarketcap.com). 
  - `COINMARKETCAP_API_KEY=b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c` 
  - `MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.<cluster-shard>.mongodb.net/<database>?retryWrites=true&w=majority`
4. To run a command for fetching from CoinMarketCap for a crypto pair:
  - `npm run cli -- -v CoinMarketCap -p <BTC/USD>`

## Design
1. I wrote the CLI tool in TypeScript and used the commander npm package to create the CLI interface.
2. The integrations with each API source (CoinMarketCap, sFox, Derabit) are located in the `src/adapters` directory.
  - Each "adapter" implements the Adapter interface, for which each adapter authenticates (if necessary) and gathers market data via `gatherMarketData()` and does light parsing of the response via `parseResponse()`. 
  - Each adapter also instantiates an instance of API Connector, the state of which contains the adapter's dependencies (endpoint URL, query paramaters, headers) and the behavior of which fetches the data with those dependencies. 
  - The `src/adapters` directory also contains `adapterRegistry.ts`, which contains a lookup table to map between data sources and their corresponding adapter implementations. Now, we have a centralized place for managing and selecting adapters without having to make any changes to the main CLI program code.
3. Any newly data source now only requires:
  - Adding a new entry to the adapter registry.  
  - Creating a new adapter implementation, based on the Adapter interface.
