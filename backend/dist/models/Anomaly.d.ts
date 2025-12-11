import mongoose, { Document } from "mongoose";
export interface anomalyDocument extends Document {
    flight: mongoose.Types.ObjectId;
    type: string;
    severity: string;
    message: string;
    detectedAt: string;
}
declare const _default: mongoose.Model<anomalyDocument, {}, {}, {}, mongoose.Document<unknown, {}, anomalyDocument, {}, mongoose.DefaultSchemaOptions> & anomalyDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, anomalyDocument>;
export default _default;
//# sourceMappingURL=Anomaly.d.ts.map