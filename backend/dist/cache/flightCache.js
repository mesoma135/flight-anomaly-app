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
const saveLiveFlight = (flightId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.hSet(`flight: ${flightId}`, data);
});
exports.saveLiveFlight = saveLiveFlight;
const getLiveFlight = (flightId) => __awaiter(void 0, void 0, void 0, function* () {
    (yield redisClient_1.client.hGetAll(`flight: ${flightId}`)) || null;
});
exports.getLiveFlight = getLiveFlight;
const addActiveFlight = (flightId) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.sAdd("activeFlights", flightId);
});
exports.addActiveFlight = addActiveFlight;
const getActiveFlights = () => __awaiter(void 0, void 0, void 0, function* () {
    (yield redisClient_1.client.sMembers("activeFlights")) || null;
});
exports.getActiveFlights = getActiveFlights;
const removeActiveFlight = (flightId) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient_1.client.sRem("activeFlights", flightId);
});
exports.removeActiveFlight = removeActiveFlight;
//# sourceMappingURL=flightCache.js.map