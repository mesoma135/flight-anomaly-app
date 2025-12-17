import FlightSnapshot, { FlightSnapshotDocument } from "../models/FlightSnapshot";

export const triggerAnomalyCheck = async(snapshot: FlightSnapshotDocument) => {
    const anomalies: string[] = [];
    
    if(snapshot.altitude !== null && snapshot.altitude < 500) {
        anomalies.push("LOW ALTITUDE");
    }

    if(snapshot.verticalSpeed !== null && snapshot.verticalSpeed > 4500 && snapshot.altitude !== null && snapshot.altitude < 2500 ){
        anomalies.push("EXTREME VERTICAL SPEED");
    }

    if(snapshot.speed !== null && snapshot.speed > 650 ){
        anomalies.push("OVERSPEED");
    }
    if(anomalies.length > 0){
        console.log ("Anomaly Detected: ", snapshot.flightIcao24, anomalies);
    }
};