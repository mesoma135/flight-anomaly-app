import Flight from "../models/Flight";

export const getHistoricalFlights = async (res: any) => {
    try{
        const flights = await Flight.find().sort({lastUpdated: -1}).limit(1000);
        return res.json(flights);
    }
    catch(error) {
        res.status(500).json({ Error: "Failed to fetch historical flights"});
    }
};

export const getFlightbyId = async (req: any, res: any) => {
    try{
        const { id } = req.params;
        const flight = await Flight.find({ icao24: id });
        res.json(flight);
    }
    catch(error){
        res.status(500).json({error: "An error has occured"});
    }
};