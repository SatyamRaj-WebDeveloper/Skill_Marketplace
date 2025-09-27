import mongoose,{Schema} from 'mongoose'


const serviceSchema = new Schema({
    provider:{
        type:mongoose.Types.ObjectId,
        ref:'provider',
        required:true,
    },
    name:{
       type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true,
    }
},{timestamps:true})

const service =  mongoose.model('Service' , serviceSchema);
export default service;