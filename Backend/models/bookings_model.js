import mongoose,{Schema} from 'mongoose'

const bookingSchema  = new Schema({
   userId :{
    type: mongoose.Types.ObjectId,
    ref : 'User',
    required : true,
   },
   providerId : {
    type : mongoose.Types.ObjectId,
    ref : 'provider',
    required : true,
   },
   status :{
    type : String,
    enum : [
        'pending',
        'cancelled', 
        'confirmed',
        'completed',
        'provider_complete',
        'auto_complete',
        'disputed',
    ],
    default : 'pending',
    required : true,
   },
   paymentStatus:{
      type:String,
      enum :["Succeeded", "pending" , "failed"],
      default :'pending',
   },
   paymentIntentId:{
      type : String,
   },
   bookingTime :{
    type : Date,
    required : true,
   },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', 
        required: true
    },
    serviceDetails: {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
},{timestamps:true})

const Booking = mongoose.model("Booking" , bookingSchema);
export default Booking