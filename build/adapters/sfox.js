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
exports.SfoxAdapter = void 0;
const api_connector_1 = require("../api-connector");
class SfoxAdapter {
    constructor(pair, startTime, endTime, interval = 60) {
        this.apiConnector = new api_connector_1.ApiConnector({
            baseUrl: 'https://chartdata.sfox.com/candlesticks',
            params: {
                pair,
                startTime,
                endTime,
                period: interval,
            },
        });
    }
    gatherMarketData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiConnector.get();
            return this.parseResponse(response);
        });
    }
    parseResponse(response) {
        return response.data;
    }
}
exports.SfoxAdapter = SfoxAdapter;
