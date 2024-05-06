import { CoinMarketCapAdapter } from "./coinmarketcap";
import { SfoxAdapter } from "./sfox";
import { DerabitAdapter } from "./derabit";

interface Adapters {
  coinmarketcap: typeof CoinMarketCapAdapter;
  sfox: typeof SfoxAdapter;
  derabit: typeof DerabitAdapter;
}

export const adapters: Adapters = {
  coinmarketcap: CoinMarketCapAdapter,
  sfox: SfoxAdapter,
  derabit: DerabitAdapter,
};