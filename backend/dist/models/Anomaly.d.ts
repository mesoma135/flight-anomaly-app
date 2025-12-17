import mongoose, { Document } from "mongoose";
export interface AnomalyDocument extends Document {
    flight: mongoose.Types.ObjectId;
    type: "LOW ALTITUDE" | "OVERSPEED" | "EXTREME VERTICAL SPEED";
    message: string;
}
declare const Anomaly: mongoose.Model<AnomalyDocument, {}, {}, {}, mongoose.Document<unknown, {}, AnomalyDocument, {}, mongoose.DefaultSchemaOptions> & AnomalyDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, AnomalyDocument>;
export default Anomaly;
//# sourceMappingURL=Anomaly.d.ts.map