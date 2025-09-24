import mongoose,{Schema} from 'mongoose'


const bookingSchema  = new Schema({
   userId :{
    type: mongoose.Types.ObjectId,
    ref : 'User',
    required : true,
   },
   providerId : {
    type : mongoose.Types.ObjectId,
    ref : 'User',
    required : true,
   },
   status :{
    type : String,
    enum : ['pending' , 'cancelled', 'confirmed','completed'],
    default : 'pending',
    required : true,
   },
   BookingTime :{
    type : Date,
    required : true,
   },
   serviceDetails:{
    name :{
        type : String,
        required : true,
    },
    price :{
        type:Number,
        required : true,
    }
   }
},{timestamps})

const Booking = mongoose.model("Booking" , bookingSchema);
export default Booking