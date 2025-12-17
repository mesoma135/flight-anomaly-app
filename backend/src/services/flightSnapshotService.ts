import { snapshot } from "node:test";
import { FlightSnapshotDocument } from "../models/FlightSnapshot";
import { triggerAnomalyCheck } from "./anomalyTrigger";

export const handleNewFlightSnapshot = async (
    snapshot: FlightSnapshotDocument
) => {
    await triggerAnomalyCheck(snapshot);
};