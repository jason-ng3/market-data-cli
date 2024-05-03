import axios from 'axios';
import { MarketData } from './types';

const COINMARKETCAP_API_URL = 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/latest';

// Gather market data from different venues
export const gatherMarketData = async (venue: string, pair: string): Promise<MarketData> => {
  try {
    if (venue === 'coinmarketcap') {
      // Retrieve the CoinMarketCap API key
      const apiKey = process.env.COINMARKETCAP_API_KEY;
      if (!apiKey) {
        throw new Error('Please provide a valid CoinMarketCap API key.');
      }
      
      // Call CoinMarketCap API to fetch market data
      const [symbol, convert] = pair.split('/');
      const response = await axios.get(COINMARKETCAP_API_URL, {
        params: {
          symbol,
          convert,
        },
        headers: {
          'Accepts': 'application/json',
          'X-CMC_PRO_API_KEY': apiKey,
        },
      });
      
      // Extract market data from API reponse
      const marketData = response.data.data[`${symbol}`].quote[`${convert}`];
      if (!marketData) {
        throw new Error('Invalid response received from Coinmarketcap API.');
      }
      
      delete marketData.last_updated;
      return marketData;
    } else {
      throw new Error(`Unsupported venue: ${venue}`);
    }
  } catch(error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Network error occurred while fetching data from CoinMarketCap API.');
    } else {
        throw error;
    }
  }
}
