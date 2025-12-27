import axios from "axios";
import { saveLiveFlight, addActiveFlight } from "../cache/flightCache";
import { triggerAnomalyCheck } from "./anomalyTrigger";
import FlightSnapshot from "../models/FlightSnapshot";
import Flight from "../models/Flight";

const openSkyAPI = process.env.OPENSKY_URL!;
const OPENSKY_TOKEN_URL =
  "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

async function getOpenSkyToken(): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.OPENSKY_CLIENT_ID!);
  params.append("client_secret", process.env.OPENSKY_CLIENT_SECRET!);

  const res = await axios.post(OPENSKY_TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data.access_token;
}

export const fetchAndStoreFlights = async () => {
    try{
        const token = await getOpenSkyToken();

        const response = await axios.get(openSkyAPI, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        timeout: 15000
       });

       const states = response.data.states;

       if(!states || !Array.isArray(states)) {
        console.log("No flight data recieved from OpenSky");
        return;
       }

       for(let i = 0; i < states.length; i++){
        const flight = states[i];

        const flightData = {
            flightIcao24: flight[0], //icao24 unique Id
            callsign: flight[1] ? flight[1].trim(): "",
            longitude: flight[5] ?? null,
            latitude: flight[6] ?? null,
            speed: flight[9] != null ? Math.floor(flight[9]*1.94384): null, //converting from m/s to kts
            heading: flight[10] != null ? Math.floor(flight[10]): null,
            verticalSpeed: flight[11] != null ? Math.floor(flight[11]*196.85): null, //converting from m/s to ft/min
            altitude: flight[13] != null ? Math.floor(flight[13]*3.28084): null,
            timestamp: Date.now()
        };
        
        await saveLiveFlight(flight[0], flightData);
        await addActiveFlight(flight[0]);

        const snapshot = await FlightSnapshot.create({
            ...flightData,
           timestamp: new Date(flightData.timestamp),
          });

        triggerAnomalyCheck(snapshot);
       }
       console.log("Flight data loaded successfully!");
    }
    catch(error){
        console.error("Error fetching flight data:", error);
       }
};
