"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.writeToDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define schema for MarketQuote document
const MarketQuoteSchema = new mongoose_1.Schema({
    timestamp: { type: Date, default: null },
    data: mongoose_1.Schema.Types.Mixed
});
// Define model to map to MarketQuote collection 
const MarketQuoteModel = mongoose_1.default.model('MarketQuote', MarketQuoteSchema);
// Connect to MongoDB Atlas database
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.MONGODB_URI;
    if (!url) {
        throw new Error('MongoDB URI is not defined');
    }
    try {
        yield mongoose_1.default.connect(url);
    }
    catch (error) {
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
// Write data to MongoDB Atlas datbase
const writeToDatabase = (data, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marketQuote = new MarketQuoteModel({
            timestamp: timestamp,
            data: data
        });
        yield marketQuote.save();
        mongoose_1.default.connection.close();
    }
    catch (error) {
        throw error;
    }
});
exports.writeToDatabase = writeToDatabase;
