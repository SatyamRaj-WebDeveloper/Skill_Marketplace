
import User from '../models/user_model.js'
import bcrypt from 'bcrypt'


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
        if(!user){
           return res.status(400).json({message:"User not registered"});
        }
         return res.status(201).json({message:"User Registration Successfull", data: user});
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message:"User Registration Error", error : error.message})
    }

}