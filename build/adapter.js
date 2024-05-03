"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherMarketData = void 0;
const axios_1 = __importDefault(require("axios"));
const COINMARKETCAP_API_URL = 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/latest';
// Gather market data from different venues
const gatherMarketData = (venue, pair) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (venue === 'coinmarketcap') {
            // Retrieve the CoinMarketCap API key
            const apiKey = process.env.COINMARKETCAP_API_KEY;
            if (!apiKey) {
                throw new Error('Please provide a valid CoinMarketCap API key.');
            }
            // Call CoinMarketCap API to fetch market data
            const [symbol, convert] = pair.split('/');
            const response = yield axios_1.default.get(COINMARKETCAP_API_URL, {
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
        }
        else {
            throw new Error(`Unsupported venue: ${venue}`);
        }
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw new Error('Network error occurred while fetching data from CoinMarketCap API.');
        }
        else {
            throw error;
        }
    }
});
exports.gatherMarketData = gatherMarketData;
