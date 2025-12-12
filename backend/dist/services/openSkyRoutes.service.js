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
exports.fetchFlightRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const openSkyAPI = process.env.OPENSKY_URL || "";
const fetchFlightRoute = (icao24) => __awaiter(void 0, void 0, void 0, function* () {
    if (!icao24) {
        throw new Error("A valid icao24 code is required");
    }
    const response = yield axios_1.default.get(`${openSkyAPI}/tracks/all`, { params: { icao24 }, timeout: 10000 });
    return response.data;
});
exports.fetchFlightRoute = fetchFlightRoute;
//# sourceMappingURL=openSkyRoutes.service.js.map