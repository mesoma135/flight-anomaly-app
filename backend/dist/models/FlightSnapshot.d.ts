import { Document, Model } from "mongoose";
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
declare const FlightSnapshot: Model<FlightSnapshotDocument>;
export default FlightSnapshot;
//# sourceMappingURL=FlightSnapshot.d.ts.map