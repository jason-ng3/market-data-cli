import { CoinMarketCapAdapter } from "./coinmarketcap";
import { SfoxAdapter } from "./sfox";
import { DerabitAdapter } from "./derabit";

interface Adapters {
  coinmarketcap: typeof CoinMarketCapAdapter;
  sfox: typeof SfoxAdapter;
  derabit: typeof DerabitAdapter;
}

// Mapping of adapter names to their implementations
export const adapters: Adapters = {
  coinmarketcap: CoinMarketCapAdapter,
  sfox: SfoxAdapter,
  derabit: DerabitAdapter,
};