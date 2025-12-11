import mongoose, { Document, Schema } from "mongoose";

export interface flightDocument extends Document {
    flightNumber: string;
    airline: string;
    aircraftModel: string;
    tailNumber: string;
    origin: string;
    destination: string;
    flightStatus: string;
    flightTime: string;
    lastUpdated: Date;
}

const flightSchema = new Schema<flightDocument>({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    aircraftModel: {type: String, required: true},
    tailNumber: {type: String, required: true},
    origin: { type: String, required: true},
    destination: { type: String, required: true},
    flightStatus: { type: String, default: "Scheduled"},
    flightTime: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now}
}, { timestamps: true });

export default mongoose.model<flightDocument>("Flight", flightSchema);