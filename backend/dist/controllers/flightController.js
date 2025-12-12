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
exports.getFlightbyId = exports.getHistoricalFlights = void 0;
const Flight_1 = __importDefault(require("../models/Flight"));
const getHistoricalFlights = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield Flight_1.default.find().sort({ lastUpdated: -1 }).limit(1000);
        return res.json(flights);
    }
    catch (error) {
        res.status(500).json({ Error: "Failed to fetch historical flights" });
    }
});
exports.getHistoricalFlights = getHistoricalFlights;
const getFlightbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "icao24 is required" });
        }
        const flight = yield Flight_1.default.findOne({ icao24: id });
        res.json(flight);
    }
    catch (error) {
        res.status(500).json({ error: "An error has occured" });
    }
});
exports.getFlightbyId = getFlightbyId;
//# sourceMappingURL=flightController.js.map