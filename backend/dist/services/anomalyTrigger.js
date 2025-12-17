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
exports.triggerAnomalyCheck = void 0;
const triggerAnomalyCheck = (snapshot) => __awaiter(void 0, void 0, void 0, function* () {
    const anomalies = [];
    if (snapshot.altitude !== null && snapshot.altitude < 500) {
        anomalies.push("LOW ALTITUDE");
    }
    if (snapshot.verticalSpeed !== null && snapshot.verticalSpeed > 4500 && snapshot.altitude !== null && snapshot.altitude < 2500) {
        anomalies.push("EXTREME VERTICAL SPEED");
    }
    if (snapshot.speed !== null && snapshot.speed > 650) {
        anomalies.push("OVERSPEED");
    }
    if (anomalies.length > 0) {
        console.log("Anomaly Detected", snapshot.flightIcao24, anomalies);
    }
});
exports.triggerAnomalyCheck = triggerAnomalyCheck;
//# sourceMappingURL=anomalyTrigger.js.map