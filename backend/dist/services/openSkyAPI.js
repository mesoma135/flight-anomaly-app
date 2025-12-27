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
exports.fetchAndStoreFlights = void 0;
const axios_1 = __importDefault(require("axios"));
const flightCache_1 = require("../cache/flightCache");
const anomalyTrigger_1 = require("./anomalyTrigger");
const FlightSnapshot_1 = __importDefault(require("../models/FlightSnapshot"));
let ingestedCount = 0;
const openSkyAPI = process.env.OPENSKY_URL;
const OPENSKY_TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";
function getOpenSkyToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", process.env.OPENSKY_CLIENT_ID);
        params.append("client_secret", process.env.OPENSKY_CLIENT_SECRET);
        const res = yield axios_1.default.post(OPENSKY_TOKEN_URL, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                lamin: 40.0, // south latitude
                lamax: 45.0, // north latitude
                lomin: -80.0, // west longitude
                lomax: -70.0,
            },
        });
        return res.data.access_token;
    });
}
const fetchAndStoreFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = yield getOpenSkyToken();
        const response = yield axios_1.default.get(openSkyAPI, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 15000
        });
        const states = response.data.states;
        if (!Array.isArray(states) || states.length === 0) {
            console.log("OpenSky returned 0 flights");
            return 0;
        }
        for (let i = 0; i < states.length; i++) {
            const flight = states[i];
            const flightData = {
                flightIcao24: flight[0], //icao24 unique Id
                callsign: flight[1] ? flight[1].trim() : "",
                longitude: (_a = flight[5]) !== null && _a !== void 0 ? _a : null,
                latitude: (_b = flight[6]) !== null && _b !== void 0 ? _b : null,
                speed: flight[9] != null ? Math.floor(flight[9] * 1.94384) : null, //converting from m/s to kts
                heading: flight[10] != null ? Math.floor(flight[10]) : null,
                verticalSpeed: flight[11] != null ? Math.floor(flight[11] * 196.85) : null, //converting from m/s to ft/min
                altitude: flight[13] != null ? Math.floor(flight[13] * 3.28084) : null,
                timestamp: Date.now()
            };
            yield (0, flightCache_1.saveLiveFlight)(flight[0], flightData);
            yield (0, flightCache_1.addActiveFlight)(flight[0]);
            const snapshot = yield FlightSnapshot_1.default.create(Object.assign(Object.assign({}, flightData), { timestamp: new Date(flightData.timestamp) }));
            /*console.log("Snapshot saved:", snapshot.flightIcao24, snapshot.timestamp); */
            (0, anomalyTrigger_1.triggerAnomalyCheck)(snapshot);
            ingestedCount++;
        }
        return ingestedCount;
        console.log("Flight data loaded successfully!");
    }
    catch (error) {
        console.error("Error fetching flight data:", error);
    }
});
exports.fetchAndStoreFlights = fetchAndStoreFlights;
//# sourceMappingURL=openSkyAPI.js.map