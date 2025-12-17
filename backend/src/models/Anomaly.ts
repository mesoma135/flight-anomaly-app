import mongoose, { Document, Schema } from "mongoose";
import FlightSnapshot from "./FlightSnapshot";

export interface AnomalyDocument extends Document{
flight: mongoose.Types.ObjectId;
type: "LOW ALTITUDE" | "OVERSPEED" | "EXTREME VERTICAL SPEED";
message: string;
}

const anomalySchema = new Schema<AnomalyDocument>({
    flight: { type: Schema.Types.ObjectId, ref: FlightSnapshot, required: true },
    type: { type: String, enum: ["LOW ALTITUDE", "OVERSPEED", "EXTREME VERTICAL SPEED"], required: true },
    message: { type: String },
},
    { timestamps: true }
);

const Anomaly = mongoose.model<AnomalyDocument>("Anomaly", anomalySchema);
export default Anomaly;