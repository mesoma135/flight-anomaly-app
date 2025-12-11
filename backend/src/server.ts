import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import app from "./app";
import http from "http";

const PORT = process.env.PORT || 5000;

(async() => {
    try{
        await connectDB();
        console.log('Database Connected...');
    const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    }
    catch(error){
        console.error("Failed to start server: ", error);
    }
});