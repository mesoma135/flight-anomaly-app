import Flight from "../models/Flight";
import { Request, Response } from "express";

export const getHistoricalFlights = async (res: Response) => {
    try{
        const flights = await Flight.find().sort({lastUpdated: -1}).limit(1000);
        return res.json(flights);
    }
    catch(error) {
        res.status(500).json({ Error: "Failed to fetch historical flights"});
    }
};

export const getFlightbyId = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "icao24 is required" });
          }      

        const flight = await Flight.findOne({ icao24: id });
        res.json(flight);
    }
    catch(error){
        res.status(500).json({error: "An error has occured"});
    }
};