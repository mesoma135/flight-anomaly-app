import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { connectDB } from "./config/db";
import { connectRedis } from "./cache/redisClient";
import { initWebSocket } from "./services/websocketService";
import express, { Application } from "express";
import flightRoutes from "./routes/flightRoutes";
import openSkyAPIRoutes from "./routes/openSkyAPIRoutes";
import anomalyRoutes from "./routes/anomalyRoutes";
import { fetchAndStoreFlights } from "./services/openSkyAPI";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5050;

(async() => {
    try{
        await connectDB();
    const server = http.createServer(app);
    server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
console.log("Connecting to Redis");
await connectRedis();

console.log("WebSocket Initializing...")
initWebSocket(); //Initialize Websocket Server

const INGEST_INTERVAL_MS = 60_000; // 1 minute

async function runIngestionCycle() {
  const now = new Date().toISOString();
  console.log(`[${now}] Ingestion cycle started`);

  try {
    const count = await fetchAndStoreFlights();
    console.log(`[${now}] ${count} flights ingested`);
  } catch (error) {
    console.error(`[${now}] Cycle failed`, error);
  }
}

// run immediately
runIngestionCycle();

// run repeatedly
setInterval(runIngestionCycle, INGEST_INTERVAL_MS);
    }
    catch(error){
        console.error("Failed to start server: ", error);
    }
})();

app.use(cors());
app.use(express.json());
app.use("/api/flight", flightRoutes);
app.use("/api/opensky", openSkyAPIRoutes);
app.use("/api/anomalies", anomalyRoutes);