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
exports.removeActiveFlight = exports.getActiveFlights = exports.addActiveFlight = exports.getLiveFlight = exports.saveLiveFlight = void 0;
const redisClient_1 = require("./redisClient");
const saveLiveFlight = (flightIcao24, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.hSet(`flight:${flightIcao24}`, Object.entries(data).map(([k, v]) => [k, String(v !== null && v !== void 0 ? v : "")]).flat());
});
exports.saveLiveFlight = saveLiveFlight;
const getLiveFlight = (flightIcao24) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redisClient_1.client.get(`flight:${flightIcao24}`);
    return data ? JSON.parse(data) : null;
});
exports.getLiveFlight = getLiveFlight;
const addActiveFlight = (flightIcao24) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.sAdd("activeFlights", flightIcao24);
});
exports.addActiveFlight = addActiveFlight;
const getActiveFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient_1.client.sMembers("activeFlights");
});
exports.getActiveFlights = getActiveFlights;
const removeActiveFlight = (flightIcao24) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.sRem("activeFlights", flightIcao24);
});
exports.removeActiveFlight = removeActiveFlight;
//# sourceMappingURL=flightCache.js.map