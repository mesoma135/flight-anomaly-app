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
exports.getAnomalyHistory = void 0;
const Anomaly_1 = __importDefault(require("../models/Anomaly"));
const getAnomalyHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { flightIcao24, type, limit } = req.query;
        const query = {};
        if (flightIcao24 && type) {
            query.flightIcao24 = flightIcao24;
            query.type = type;
        }
        const anomalies = yield Anomaly_1.default.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit) || 10);
        res.json({
            count: anomalies.length,
            data: anomalies
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.getAnomalyHistory = getAnomalyHistory;
//# sourceMappingURL=anomalyController.js.map