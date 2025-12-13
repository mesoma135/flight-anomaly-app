import mongoose, { Document, Schema, Model } from "mongoose";

export interface FlightSnapshotDocument extends Document {
  flightIcao24: string;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
  verticalSpeed: number | null;
  latitude: number | null;
  longitude: number | null;
  timestamp: Date;
}

const flightSnapshotSchema = new Schema<FlightSnapshotDocument>({
  flightIcao24: { type: String, required: true, index: true },
  altitude: Number,
  speed: Number,
  heading: Number,
  verticalSpeed: Number,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now, index: true },
});

// TTL index (auto-delete after 5h)
flightSnapshotSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: 60 * 60 * 5 }
);

const FlightSnapshot: Model<FlightSnapshotDocument> =
  mongoose.models.FlightSnapshot || mongoose.model<FlightSnapshotDocument>("FlightSnapshot", flightSnapshotSchema);

export default FlightSnapshot;