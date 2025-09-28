import mongoose ,{Schema} from 'mongoose'

const userSchema = new Schema({
    username :{
        type :String,
        required:true,
    },
    email:{
        type:String,
        required : true,
        unique : true,
    },
    password :{
        type:String,
        required:true,
    },
    role :{
        type:String,
        enum :['user', 'provider' ,'admin'],
        default : 'user',
    },
    providerStatus:{
        type:String,
        enum :['not-provider' , 'provider', 'pending','rejected'],
        default :"not-provider",
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})


const User = mongoose.model('User' , userSchema);

export default User