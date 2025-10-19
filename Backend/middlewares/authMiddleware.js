import jwt from 'jsonwebtoken';
import User from '../models/user_model.js'
import dotenv from 'dotenv'

dotenv.config();

const verifyjwt = async(req , res , next) =>{
    try {
        const token = await req.header('Authorization')?.replace("Bearer " , "").trim();
        if(!token ){
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decodedToken =  jwt.verify(token , process.env.JWT_SECRET);
        console.log(decodedToken);
        const user = await User.findOne({_id:decodedToken.id});
        console.log(user);
        if(!user){
            return res.status(404).json({message:"User not Found : Auth Middleware"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error" , data : error.message})
    }
}

export {verifyjwt}