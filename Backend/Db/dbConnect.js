import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

console.log(process.env.MONGO_URI);
const dbConnect  =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("DataBase Connected Successfully"))
    } catch (error) {
         console.log(`Error in Db Connection ${error}`);
    }
}

export {dbConnect}