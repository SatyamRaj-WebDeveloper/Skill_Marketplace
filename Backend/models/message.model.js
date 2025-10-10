import mongoose , {Schema} from 'mongoose'; 

const messageSchema = new Schema({
    conversation :{
        type:mongoose.Types.ObjectId,
        ref : 'Conversation',
        required : true
    },
    Sender : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    text :{
        type:String,
        required : true,
    }
},{timestamps:true})

messageSchema.index({conversation:1});
const Message = mongoose.model("Message" , messageSchema);

export default Message;