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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commander_1 = require("commander");
const adapter_1 = require("./adapter");
const database_1 = require("./database");
// Parse command-line parameters using commander
commander_1.program
    .option('-v, --venue <venue>', 'Specify the venue: Coinmarketcap')
    .option('-p, --pair <pair>', 'Specify the crypto pair (e.g., BTC/USD)')
    .parse(process.argv);
// main function for starting CLI
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = new Date();
    const { venue, pair } = commander_1.program.opts();
    try {
        console.log('Program run time: ', timestamp);
        // Validate the venue option
        if (!['coinmarketcap'].includes(venue.toLowerCase())) {
            console.error('Invalid venue. Supported venues: coinmarketcap');
            process.exit(1);
        }
        // Validate the pair option
        if (!/^[a-zA-Z]+\/[a-zA-Z]+$/i.test(pair)) {
            console.error('Invalid pair format. The pair should be in the format "XXX/YYY"');
            process.exit(1);
        }
        // Gather market data
        console.log('Gathering market data...');
        const marketData = yield (0, adapter_1.gatherMarketData)(venue.toLowerCase(), pair.toUpperCase());
        console.log('Market quote: ', marketData);
        // Connect and write to MongoDB Atlas
        console.log('Writing data to database...');
        yield (0, database_1.connectToDatabase)();
        yield (0, database_1.writeToDatabase)(marketData, timestamp);
        console.log('Data written to database successfully');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message);
            process.exit(1);
        }
    }
});
// Start the CLI
main();
