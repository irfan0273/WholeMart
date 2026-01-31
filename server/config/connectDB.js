import mongoose from "mongoose";
import dotenv from "dotenv";
import e from "express";
dotenv.config();
 
if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URL in the .env file")
}
async function connectDB(){
    try {
      await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("monogodb connect error", error)
        process.exit(1)
    }
}

export default connectDB