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
exports.DerabitAdapter = void 0;
const api_connector_1 = require("../api-connector");
class DerabitAdapter {
    constructor(pair, startTime, endTime, interval) {
        this.apiConnector = new api_connector_1.ApiConnector({
            baseUrl: 'https://test.deribit.com/api/v2/public/get_tradingview_chart_data',
            params: {
                instrument_name: pair,
                start_timestamp: startTime,
                end_timestamp: endTime,
                resolution: interval
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
        return response.data.result;
    }
}
exports.DerabitAdapter = DerabitAdapter;
