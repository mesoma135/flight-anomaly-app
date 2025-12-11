import mongoose, {Document, Schema} from "mongoose";
import Flight from "./Flight";

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
    flight: { type: Schema.Types.ObjectId, ref: Flight, required: true },
    altitude: { type: Number },
    speed: { type: Number },
    heading: { type: Number },
    verticalSpeed: { type: Number },
    latitude: { Number },
    longitude: { Number },
    timestamp: { type: Date, default: Date.now },
}, {timestamps: true }
);

export default mongoose.model<flightSnapshotDocument>("FlightSnapshot", flightSnapshotSchema);