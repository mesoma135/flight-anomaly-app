import { client } from "./redisClient";

export const saveLiveFlight = async (flightId: string, data: any) =>{
    await client.hSet(`flight: ${flightId}`, data);
};

export const getLiveFlight = async(flightId: string) => {
   return await client.hGetAll(`flight: ${flightId}`) || null;
};

export const addActiveFlight = async(flightId: string) => {
    await client.sAdd("activeFlights", flightId);
};

export const getActiveFlights = async() => {
    return await client.sMembers("activeFlights") || null;
};

export const removeActiveFlight = async (flightId: string) => {
    await client.sRem("activeFlights", flightId);
};