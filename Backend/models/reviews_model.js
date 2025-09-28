import mongoose , {Schema} from "mongoose";

const reviewSchema = new Schema({
    userId : {
       type : mongoose.Types.ObjectId,
       ref : 'User',
    },
    providerId : {
        type : mongoose.Types.ObjectId,
        ref : 'provider',
    },
    review :{
        type:String ,
        required : true,
    },
    rating :{
        type :Number,
        required: true,

    }
},{timestamps:true})


const Review = mongoose.model("Review" , reviewSchema);
export default Review