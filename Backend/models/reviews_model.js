import mongoose , {Schema} from "mongoose";
import User from "./user_model.js";

const reviewSchema = new Schema({
    userId : {
       type : mongoose.Types.ObjectId,
       ref : User,
    },
    review :{
        type:String ,
    },
    rating :{
        type :Number,
    }
},{timestamps:true})


const Review = new mongoose.model("Review" , reviewSchema);
export default Review