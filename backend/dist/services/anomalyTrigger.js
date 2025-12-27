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
exports.triggerAnomalyCheck = void 0;
const Anomaly_1 = __importDefault(require("../models/Anomaly"));
const anomalyBroadcaster_1 = require("./anomalyBroadcaster");
const ANOMALY_COOLDOWN_MS = 2 * 60 * 1000;
//REMINDER: ADD SINGLE SNAPSHOT HANDLING SERVICE TO CENTRALIZE SIDE EFFECTS
const triggerAnomalyCheck = (snapshot) => __awaiter(void 0, void 0, void 0, function* () {
    const anomalies = [];
    if (snapshot.altitude !== null && snapshot.altitude < 500 && snapshot.speed !== null && snapshot.speed == 200) {
        anomalies.push({
            type: "LOW ALTITUDE",
            message: `Aircraft below safe altitude: ${snapshot.altitude} ft`
        });
    }
    if (snapshot.verticalSpeed !== null && snapshot.verticalSpeed > 4500 && snapshot.altitude !== null && snapshot.altitude < 2500) {
        anomalies.push({
            type: "EXTREME VERTICAL SPEED",
            message: `Extreme Vertical Speed Detected: ${snapshot.verticalSpeed}`
        });
    }
    if (snapshot.speed !== null && snapshot.speed > 650) {
        anomalies.push({
            type: "OVERSPEED",
            message: `Overspeed Detected: ${snapshot.speed}`
        });
    }
    if (anomalies.length === 0) {
        return;
    }
    for (let i = 0; i < anomalies.length; i++) {
        console.log("Anomaly Detected:", snapshot.flightIcao24, anomalies[i]);
        const anomaly = anomalies[i];
        const recentAnomaly = yield Anomaly_1.default.findOne({
            flight: snapshot._id,
            type: anomaly.type,
            createdAt: {
                $gte: new Date(Date.now() - ANOMALY_COOLDOWN_MS)
            }
        });
        if (recentAnomaly) {
            continue;
        }
        yield Anomaly_1.default.create({
            flight: snapshot._id,
            type: anomaly.type,
            message: anomaly.message
        });
        (0, anomalyBroadcaster_1.broadcastAnomaly)({
            flightIcao24: snapshot.flightIcao24,
            type: anomaly.type,
            message: anomaly.message,
            timestamp: Date.now()
        });
    }
});
exports.triggerAnomalyCheck = triggerAnomalyCheck;
//# sourceMappingURL=anomalyTrigger.js.map