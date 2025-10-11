import mongoose , {Schema}  from 'mongoose';

const convoSchema = new Schema({
   participants :[{
    type : mongoose.Types.ObjectId,
    ref: 'User',
    required : true
   }],
   lastMessage:{
    type : mongoose.Types.ObjectId,
    ref : 'Message',
   }
},{timestamps:true})

const Conversation = mongoose.model('Coversation' , convoSchema);
export default Conversation;