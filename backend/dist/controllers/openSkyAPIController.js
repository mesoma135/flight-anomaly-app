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
exports.fetchStateById = exports.fetchAllStates = void 0;
const axios_1 = __importDefault(require("axios"));
const openSkyAPI = process.env.OPENSKY_URL || "";
const mappedStates = (flight) => {
    var _a, _b;
    return ({
        icao24: flight[0] ? flight[0].toLowerCase() : "",
        callsign: flight[1] ? flight[1].trim() : "",
        origin_country: flight[2] || "",
        longitude: (_a = flight[5]) !== null && _a !== void 0 ? _a : null,
        latitude: (_b = flight[6]) !== null && _b !== void 0 ? _b : null,
        speed: flight[9] != null ? Math.floor(flight[9] * 1.94384) : null, //converting from m/s to kts
        heading: flight[10] != null ? Math.floor(flight[10]) : null,
        verticalSpeed: flight[11] != null ? Math.floor(flight[11] * 196.85) : null, //converting from m/s to ft/min
        altitude: flight[13] != null ? Math.floor(flight[13] * 3.28084) : null,
    });
};
const fetchAllStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${openSkyAPI}/states/all`, { timeout: 10000 });
        const mappedStates = response.data.states.map((flight) => {
            var _a, _b;
            return ({
                icao24: flight[0] ? flight[0].toLowerCase() : "",
                callsign: flight[1] ? flight[1].trim() : "",
                origin_country: flight[2] || "",
                longitude: (_a = flight[5]) !== null && _a !== void 0 ? _a : null,
                latitude: (_b = flight[6]) !== null && _b !== void 0 ? _b : null,
                speed: flight[9] != null ? Math.floor(flight[9] * 1.94384) : null, //converting from m/s to kts
                heading: flight[10] != null ? Math.floor(flight[10]) : null,
                verticalSpeed: flight[11] != null ? Math.floor(flight[11] * 196.85) : null, //converting from m/s to ft/min
                altitude: flight[13] != null ? Math.floor(flight[13] * 3.28084) : null,
            });
        });
        res.json({
            count: mappedStates.length,
            states: mappedStates
        });
        console.log("Flights recieved: ", response.data.states.length);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch states" });
    }
});
exports.fetchAllStates = fetchAllStates;
const fetchStateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { icao24 } = req.params;
        if (!icao24) {
            return res.status(400).json({ error: "Pease enter a valid icao24 code" });
        }
        const response = yield axios_1.default.get(`${openSkyAPI}/states/all`, { timeout: 10000 });
        const match = response.data.states.find((s) => s[0] === icao24.toLowerCase());
        if (!match) {
            return res.status(400).json({ error: "Flight not found" });
        }
        res.json(mappedStates(match));
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch aircraft state" });
    }
});
exports.fetchStateById = fetchStateById;
//# sourceMappingURL=openSkyAPIController.js.map