import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectDB = async () => {
    console.log("Entering try block")
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected: ${connectionInstance.connection.host}`);
    }
    
    catch(error) {
        console.log("MongoDB Connection error", error);
        process.exit(1);
    }
}


export default connectDB;