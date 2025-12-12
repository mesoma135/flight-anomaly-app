import axios from "axios";

import { saveLiveFlight, addActiveFlight } from "../cache/flightCache";

const openSkyAPI = process.env.OPENSKY_URL || "";

export const fetchAndStoreFlights = async () => {
    try{
       const response = await axios.get(openSkyAPI);
       const states = response.data.states;

       if(!states || !Array.isArray(states)) {
        console.log("No flight data recieved from OpenSky");
        return;
       }

       for(let i=0 as number; i < states.length; i++){
        const flight = states[i];
        const flightId = flight[0]; //icao24 unique Id

        if(!flightId){
            continue;
        }

        const flightData = {
            callsign: flight[1] ? flight[1].trim(): "",
            origin_country: flight[2] || "",
            longitude: flight[5] != null ? Number(flight[5].toFixed(1)): null,
            latitude: flight[6] != null ? Number(flight[6].toFixed(1)): null,
            speed: flight[9] != null ? Math.floor(flight[9]*1.94384): null, //converting from m/s to kts
            heading: flight[10] != null ? Math.floor(flight[10]): null,
            verticalSpeed: flight[11] != null ? Math.floor(flight[11]*196.85): null, //converting from m/s to ft/min
            altitude: flight[13] != null ? Math.floor(flight[13]*3.28084): null,
            timestamp: Date.now()
        };
        
        await saveLiveFlight(flightId, flightData);
        await addActiveFlight(flightId);
       }
       console.log("Flight data loaded successfully!");
    }
    catch(error){
        console.error("Error fetching flight data:", error);
       }
};
