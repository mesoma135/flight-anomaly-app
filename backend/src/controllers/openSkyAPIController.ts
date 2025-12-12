import { Request, Response } from "express";
import axios from "axios";

const openSkyAPI = process.env.OPENSKY_URL || "";

export const fetchAllStates = async (req: Request, res: Response) =>{
    try{
        const response = await axios.get(
            `${openSkyAPI}/states/all`, { timeout: 10000 }
        );

        const mappedStates = response.data.states.map((flight: any[]) => ({
            callsign: flight[1] ? flight[1].trim(): "",
            origin_country: flight[2] || "",
            longitude: flight[5] ?? null,
            latitude: flight[6] ?? null,
            speed: flight[9] != null ? Math.floor(flight[9]*1.94384): null, //converting from m/s to kts
            heading: flight[10] != null ? Math.floor(flight[10]): null,
            verticalSpeed: flight[11] != null ? Math.floor(flight[11]*196.85): null, //converting from m/s to ft/min
            altitude: flight[13] != null ? Math.floor(flight[13]*3.28084): null,
          }));
          res.json({
            count: mappedStates.length,
            states: mappedStates
          })
        console.log("Flights recieved: ", response.data.states.length);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch states" });
    }
};