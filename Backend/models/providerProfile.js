import mongoose , {Schema} from 'mongoose'

const providerSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref : "User"
    },
    profileImage:{
      type : String,
      default : 'default-image-url.jpg',
    },
    bio:{
        type: String,
        required : true,
        maxLength : 500,
        default  : undefined
    },
    serviceCategory:{
        type:String,
        required:true,
        default:undefined
    },
    location:{
      type:{
        type:String ,
        enum:['Point'],
      },
      coordinates :{
        type: [Number],
        required:true,
        default :[0,0],
      }
    },
    availability:[{
     day:{
        type : String,
        enum :["Monday", "Tuesday","Wednesday" , "Thursday", "Friday" ,"Saturday","Sunday"],
     },
     startTime :{
        type : String, 
     },
     endTime :{
        type : String, 
     }
    }],
    BlockedDates :[{type:Date}]
},{timestamps:true})

providerSchema.index({ location: '2dsphere' });
const provider = mongoose.model("Provider" , providerSchema)
export default provider;
