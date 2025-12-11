import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try{
        const uri = process.env.MONGO_URI as string;
        if (!uri){
            throw new Error("MONGO_URI missing");
        }

        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    }
    catch (error){
        console.error("MongoDB Connection: ", error);
        
    }
}
