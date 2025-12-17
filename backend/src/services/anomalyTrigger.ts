import FlightSnapshot, { FlightSnapshotDocument } from "../models/FlightSnapshot";
import Anomaly from "../models/Anomaly";
import { ObjectId, Types } from "mongoose";

export const triggerAnomalyCheck = async(snapshot: FlightSnapshotDocument) => {
    const anomalies: {
        type: "LOW ALTITUDE" | "OVERSPEED" | "EXTREME VERTICAL SPEED";
        message: string;
    }[] = [];
    
    if(snapshot.altitude !== null && snapshot.altitude < 500 && snapshot.speed !== null && snapshot.speed == 200) {
        anomalies.push({
        type: "LOW ALTITUDE",
        message: `Aircraft below safe altitude: ${snapshot.altitude} ft`});
    }

    if(snapshot.verticalSpeed !== null && snapshot.verticalSpeed > 4500 && snapshot.altitude !== null && snapshot.altitude < 2500 ){
        anomalies.push({
            type: "EXTREME VERTICAL SPEED",
            message: `Extreme Vertical Speed Detected: ${snapshot.verticalSpeed}`});
    }

    if(snapshot.speed !== null && snapshot.speed > 650 ){
        anomalies.push({
            type: "OVERSPEED",
        message: `Overspeed Detected: ${snapshot.speed}`
        });
    }

     if (anomalies.length === 0){
        return;
    }

    for(let i = 0; i < anomalies.length; i++){
        console.log("Anomaly Detected:", snapshot.flightIcao24, anomalies[i]);
        const anomaly = anomalies[i];

        const doc = new Anomaly({
            flight: snapshot._id,
            type: anomalies[i]?.type,
            message: anomalies[i]?.message
        });

        await doc.save();
        
    }
    
   
};