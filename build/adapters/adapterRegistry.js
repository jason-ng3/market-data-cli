"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapters = void 0;
const coinmarketcap_1 = require("./coinmarketcap");
const sfox_1 = require("./sfox");
const derabit_1 = require("./derabit");
// Mapping of adapter names to their implementations
exports.adapters = {
    coinmarketcap: coinmarketcap_1.CoinMarketCapAdapter,
    sfox: sfox_1.SfoxAdapter,
    derabit: derabit_1.DerabitAdapter,
};
