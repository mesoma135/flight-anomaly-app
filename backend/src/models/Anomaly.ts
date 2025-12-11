import mongoose, {Document, Schema} from "mongoose";
import FlightSnapshot from "./FlightSnapshot";

export interface anomalyDocument extends Document{
flight: mongoose.Types.ObjectId;
type: string;
severity: string;
message: string;
detectedAt: string;
}

const anomalySchema = new Schema<anomalyDocument>({
    flight: { type: Schema.Types.ObjectId, ref: FlightSnapshot, required: true },
    type: { type: String },
    severity: { type: String },
    message: { type: String },
    detectedAt: { type: String }
},
    { timestamps: true }
);

export default mongoose.model<anomalyDocument>("Anomalies", anomalySchema);