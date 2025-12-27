import { client } from "./redisClient";

export const saveLiveFlight = async (flightIcao24: string, data: any) => {
    await client.hSet(
        `flight:${flightIcao24}`,
        Object.entries(data).map(([k, v]) => [k, String(v ?? "")]).flat()
        );
};

export const getLiveFlight = async (flightIcao24: string) => {
  const data = await client.get(`flight:${flightIcao24}`);
  return data ? JSON.parse(data) : null;
};

export const addActiveFlight = async (flightIcao24: string) => {
  await client.sAdd("activeFlights", flightIcao24);
};

export const getActiveFlights = async () => {
  return await client.sMembers("activeFlights");
};

export const removeActiveFlight = async (flightIcao24: string) => {
  await client.sRem("activeFlights", flightIcao24);
};