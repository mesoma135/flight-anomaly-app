import { Request, Response } from "express";
import Anomaly from "../models/Anomaly";

export const getAnomalyHistory = async(req: Request, res: Response) => {
    try{
        const { flightIcao24, type, limit } = req.query;
        const query: Record<string, any> = {};

        if (flightIcao24 && type){
            query.flightIcao24 = flightIcao24;
            query.type = type;
        }
        const anomalies = await Anomaly.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit) || 10);

        res.json({
            count: anomalies.length,
            data:anomalies
        });
    }
    catch(error){
        res.status(500).json({error: "Server Error"});
    }
};