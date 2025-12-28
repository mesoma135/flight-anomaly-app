"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlightAnomalySchema = new mongoose_1.Schema({
    flightIcao24: String,
    window_end_time: Date,
    anomaly_score: Number,
    model: String,
    features: {
        mean_altitude: Number,
        std_velocity: Number,
        max_vertical_speed: Number,
        heading_variance: Number
    },
    created_at: Date
});
//# sourceMappingURL=FlightAnomaliesML.js.map