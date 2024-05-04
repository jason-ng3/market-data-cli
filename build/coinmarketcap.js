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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinMarketCapAdapter = void 0;
const api_connector_1 = require("./api-connector");
class CoinMarketCapAdapter {
    constructor(apiKey, pair) {
        const [symbol, convert] = pair.split('/');
        this.symbol = symbol;
        this.convert = convert;
        this.apiConnector = new api_connector_1.ApiConnector({
            baseUrl: 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/latest',
            apiKey,
            params: { symbol, convert },
            headers: { 'X-CMC_PRO_API_KEY': apiKey },
        });
    }
    gatherMarketData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiConnector.get();
            const marketData = this.parseResponse(response);
            return marketData;
        });
    }
    parseResponse(response) {
        const marketData = response.data.data[`${this.symbol}`].quote[`${this.convert}`];
        delete marketData.last_updated;
        return marketData;
    }
}
exports.CoinMarketCapAdapter = CoinMarketCapAdapter;
