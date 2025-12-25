import mongoose from "mongoose";
import 'dotenv/config'

const URI = process.env.MONGO_URI;

if(!URI){
    throw new Error("MONGO_URI is not defined!");
}

 export const connect = async() => {
    try{
        await mongoose.connect(URI);
        console.log("Database Successfully Connected");
    }catch(error){
        console.log(error);
        console.log("Error connecting to database!");
        process.exit
    }
} 