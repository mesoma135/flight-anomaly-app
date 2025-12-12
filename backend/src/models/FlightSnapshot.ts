import mongoose, {Document, Schema} from "mongoose";
import Flight from "./Flight";
import { timeStamp } from "console";

export interface flightSnapshotDocument extends Document {
    flight: mongoose.Types.ObjectId;
    altitude: number;
    speed: number;
    heading: number;
    verticalSpeed: number;
    latitude: number;
    longitude: number;
    timestamp: Date;
}

const flightSnapshotSchema = new Schema<flightSnapshotDocument>({
    flight: { type: Schema.Types.ObjectId, ref: Flight, required: true, index: true},
    altitude: Number,
    speed: Number,
    heading: Number,
    verticalSpeed: Number,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now, index:true },
});

//TTL to auto-delete snapshots after 5h
flightSnapshotSchema.index(
    { timeStamp: 1 },
    { expireAfterSeconds: 60 * 60 * 5}
);

export default mongoose.model<flightSnapshotDocument>("FlightSnapshot", flightSnapshotSchema);