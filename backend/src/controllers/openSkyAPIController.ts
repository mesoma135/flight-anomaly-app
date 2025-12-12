import { Request, Response } from "express";
import axios from "axios";

//TODO: Implement bbox feature later

const openSkyAPI = process.env.OPENSKY_URL || "";

//Global function for proper mapping by modules
const mappedStates = (flight: any[]) => ({
    icao24: flight[0] ? flight[0].toLowerCase(): "",
    callsign: flight[1] ? flight[1].trim(): "",
    origin_country: flight[2] || "",
    longitude: flight[5] ?? null,
    latitude: flight[6] ?? null,
    speed: flight[9] != null ? Math.floor(flight[9]*1.94384): null, //converting from m/s to kts
    heading: flight[10] != null ? Math.floor(flight[10]): null,
    verticalSpeed: flight[11] != null ? Math.floor(flight[11]*196.85): null, //converting from m/s to ft/min
    altitude: flight[13] != null ? Math.floor(flight[13]*3.28084): null,
  });

export const fetchAllStates = async (req: Request, res: Response) =>{
    try{
        const response = await axios.get(`${openSkyAPI}/states/all`, { timeout: 10000 });

        const mappedStates = response.data.states.map((flight: any[]) => ({
            icao24: flight[0] ? flight[0].toLowerCase(): "",
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

export const fetchStateById = async (req: Request, res: Response) =>{
    try{
        const { icao24 } = req.params;
    if(!icao24){
        return res.status(400).json({ error:"Pease enter a valid icao24 code" });
    } 
    
        const response = await axios.get(`${openSkyAPI}/states/all`, {timeout: 10000});
        const match = response.data.states.find((s: any[]) => s[0] === icao24.toLowerCase());

        if(!match){
            return res.status(400).json({ error: "Flight not found"});
        }

        res.json(mappedStates(match));
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch aircraft state"});
    }
};
