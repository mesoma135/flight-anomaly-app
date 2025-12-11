import mongoose, { Document } from "mongoose";
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
declare const _default: mongoose.Model<flightSnapshotDocument, {}, {}, {}, mongoose.Document<unknown, {}, flightSnapshotDocument, {}, mongoose.DefaultSchemaOptions> & flightSnapshotDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, flightSnapshotDocument>;
export default _default;
//# sourceMappingURL=FlightSnapshot.d.ts.map