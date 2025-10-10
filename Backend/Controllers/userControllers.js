
import User from '../models/user_model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sendMail from '../utilities/sendEmail.js'
import applicationTemplate from '../utilities/applicationTemplate.js';
import Review from '../models/reviews_model.js'
import provider from '../models/providerProfile.js'
import Booking from '../models/bookings_model.js';
import service from '../models/serviceModel.js';
import { generateToken } from '../utilities/generateTokens.js';
import Conversation from '../models/conversation.model.js'


const registerUser = async(req , res)=>{
    console.log(req.body)
    const {username , email , password } = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({message:"All Fields are Required"});
        }
        if(await User.findOne({email})){
            return res.status(400).json({message:"User Already exists"});
        }
        const hashedpassword  = await bcrypt.hash(password , 10)
        const user = new User({
            username,
            email,
            password : hashedpassword,
        })
        await user.save()
        console.log(user);
        const accessToken = generateToken(res,user._id);
         return res.status(201).json({message:"User Registration Successfull", data: {
            _id:user._id,
            username:user.username,
            email : user.email,
            accessToken,
         }});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", error : error.message})
    }

}

const loginUser = async(req,res)=>{
    console.log(req.body);
    const {email , password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const user = await User.findOne({email});
        if(user){
            if(await bcrypt.compare(password , user.password)){
                const accessToken = generateToken(res , user._id)
                return res.status(200).json({message:"User loggedIn Successfully", data:{
                    _id:user._id,
                    username : user.username,
                    email:user.email,
                    role:user.role,
                    accessToken,
                }});
            }
        }else{
            return res.status(404).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : "Internal Server Error" , data:error.message})
    }
}

const getCurrentUser =  async(req,res)=>{
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"user Not Found"})
        }else{
            return res.status(200).json({message:"User Fetched Successfully" , data :{
                _id:user._id,
                username : user.username,
                email :user.email,
                providerStatus : user.providerStatus,
                role:user.role
            }})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error", data:error.message});
    }
}

const updateProfile = async(req,res)=>{
    console.log(req.body);
    const {newusername , email } = req.body;
    const userId = req.user.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId , {
            username:newusername,
            email:email
         },{new:true}).select('-password');
         if(!updatedUser){
            return res.status(404).json({message:"User Not Found"})
         }
        return res.status(200).json({message:"User Updation Successfull " , data:{updatedUser}})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error" , data:error.message});
    }
}

const resetPassword  = async(req,res) =>{
    console.log(req.body);
    const{OldPassword , password} = req.body;
    const userId = req.user.id;
    try {
        const  user = await User.findById(userId);
        if(await bcrypt.compare(OldPassword , user.password)){
            user.password = await bcrypt.hash(password , 10);
            await user.save();
            return res.status(200).json({message:"Password Updation Successfull" , data:{
            username : user.username,
            email : user.email,
        }})
        }else{
            return res.status(400).json({message:"Previous Password Does not match"})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error" ,  data:error.message})
    }
}

const providerRequest = async(req,res) => {
    console.log(req.body);
   const userId = req.user.id;
    const {message} =req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        if(user.providerStatus == 'pending'){
            return res.status(400).json({message:"Request Already Under Process" , data:{
                username:user.username,
                email : user.email,
            }})
        }else{
        user.providerStatus = 'pending';
        await user.save();
        }
        const dashboardLink = process.env.DASHBOARD_LINK
        const htmlContent = applicationTemplate({user , message , dashboardLink});
   await sendMail({
    to : process.env.ADMIN_EMAIL,
    subject : `Provider Application from ${user.username}`,
    html : htmlContent,
    replyTo : user.email
   })
   return res.status(200).json({
            message: 'Your application has been submitted and is pending review.'
   });     
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }

}

const createReview = async(req,res)=>{
    const userId = req.user.id;
    const {providerId} = req.params;
    const {comment , rating} = req.body;
    try {
        const rev = new Review({
            userId,
            providerId,
            review:comment,
            rating
        })
        await rev.save();
        return res.status(201).json({message:"Review Created Successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }
}

const reviewForProvider = async(req,res)=>{
    const userId = req.user.id;
    const {providerId} = req.params;
    try {
        const reviews = await Review.find({
            userId,
            providerId,
        }).populate('user','username');
        return res.status(200).json({message:"Reviews Fetched Successfully" , data: reviews});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }
}

const getProviderById = async(req,res)=>{
    const {providerId} = req.params;
    try {
        const Provider = await provider.findOne({user:providerId}).select('-password');
        if(!Provider){
            return res.status(404).json({message:"No Provider found for the ID"});
        }
        return res.status(200).json({message:"Provider Fetched Successfully" , data:Provider})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }
}

const createBooking = async(req, res)=>{
    const {providerId , serviceId} = req.params;
    const userId = req.user.id;
    const {bookingTime }= req.body;
    try {
        if (!bookingTime || !serviceId) {
        return res.status(400).json({ message: "Service and booking time are required." });
        }    
         const Service = await service.findById(serviceId);
        if (!Service) {
            return res.status(404).json({ message: "Service not found." });
        }
        if (Service.provider.toString() !== providerId) {
            return res.status(400).json({ message: "This service is not offered by this provider." });
        }
        const booking = new Booking({
            userId,
            providerId,
            bookingTime: new Date(bookingTime),
            service: service._id,    
            serviceDetails: {      
                name: service.name,
                price: service.price
            }
        });
        await booking.save();
        return res.status(201).json({message:"Order Placed" , data:booking})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }
}

const cancelBooking = async(req,res)=>{
    const {bookingId} = req.params;
    const userId = req.user.id;
    try {
        const order = await Booking.findOne({_id:bookingId , userId});
        if(!order){
            return res.status(404).json({message:"Booking not found or you are not authorized to cancel it."});
        }
        order.status = "cancelled";
        await order.save();
        return res.status(200).json({message:"Order Cancelled Succefully" , data:order});
    } catch (error) {
         console.log(error.message);
        return res.status(500).json({message :"Internal Server Error", data:error.message});
    }
}

const findOrCreateAConversation = async(req, res) =>{
    const {otheruserId} = req.params;
    const currentuser = req.user.id;
    try {
        if(!otheruserId || !currentuser){
            return res.status(404).json({message:"Error : User or Provider not found"});
        }
        let conversation = await Conversation.findOne({
            participants : {$all :[otheruserId , currentuser]},
        })
        if(!conversation){
            conversation = new Conversation({
                participants : [otheruserId , currentuser]
            })
            await conversation.save();
        }
        return res.status(200).json({message:"Conversation established " , data:conversation});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error ",data:error.message})
    }
}



export {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    resetPassword,
    providerRequest,
    createReview,
    reviewForProvider,
    getProviderById,
    createBooking,
    cancelBooking,
    findOrCreateAConversation,
}