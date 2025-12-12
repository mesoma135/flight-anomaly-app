import { Request, Response } from "express";
import axios from "axios";

const openSkyAPI = process.env.OPENSKY_URL || "";

export const fetchAllStates = async (req: Request, res: Response) =>{
    try{
        const response = await axios.get(
            `${openSkyAPI}/states/all`, { timeout: 10000 }
        );
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch states" });
    }
};