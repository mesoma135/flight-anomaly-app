import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import http from "http";

import express, { Application } from "express";
import cors from "cors";
import axios from "axios";

const app: Application = express();
const PORT = process.env.PORT || 5050;

(async() => {
    try{
        await connectDB();
    const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    }
    catch(error){
        console.error("Failed to start server: ", error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(axios);