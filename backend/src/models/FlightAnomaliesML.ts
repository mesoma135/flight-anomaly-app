import mongoose, { Document, Schema, Model } from "mongoose";

const FlightAnomalySchema = new Schema({
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