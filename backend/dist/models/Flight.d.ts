import mongoose, { Document } from "mongoose";
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
declare const _default: mongoose.Model<flightDocument, {}, {}, {}, mongoose.Document<unknown, {}, flightDocument, {}, mongoose.DefaultSchemaOptions> & flightDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, flightDocument>;
export default _default;
//# sourceMappingURL=Flight.d.ts.map