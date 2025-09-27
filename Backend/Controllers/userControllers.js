
import User from '../models/user_model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sendMail from '../utilities/sendEmail.js'
import applicationTemplate from '../utilities/applicationTemplate.js';

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
        await user.save();
        console.log(user);
        const payload ={username:user , _id:user._id , providerStatus:user.providerStatus , email:user.email}
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:"3d"}
        )
         return res.status(201).json({message:"User Registration Successfull", data: {
            _id:user._id,
            username:user.username,
            email : user.email,
            token,
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
        const user = await User.findOne(email);
        if(user){
            if(await bcrypt.compare(password , user.password)){
                const payload = {userId: user._id};
                const token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET,
                    {expiresIn :"3d"}
                )
                return res.status(200).json({message:"User loggedIn Successfully", data:{
                    _id:user._id,
                    username : user.username,
                    email:user.email,
                    role:user.role,
                    token,
                }});
            }
        }else{
            return res.status(404).json({message:"User Not Found !"})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : "Internal Server Error" , data:error.message})
    }
}

const getCurrentUser =  async(req,res)=>{
    const {userId} = req.user;
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
    const {userId} = req.user;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId , {
            username:newusername,
            email:email
         },{new:true}).select(-password);
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
    console.log(req,body);
    const{OldPassword , password} = req.body;
    const {userId}= req.user;
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
    const {userId} = req.user;
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



export {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    resetPassword,
    providerRequest
}