import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { connectDB } from "./config/db";
import { connectRedis } from "./cache/redisClient";
import { initWebSocket } from "./services/websocketService";
import express, { Application } from "express";

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

}
    catch(error){
        console.error("Failed to start server: ", error);
    }
})();

app.use(cors());
app.use(express.json());