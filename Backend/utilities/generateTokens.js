import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateToken = (res , userId)=>{
     try {
        console.log(process.env.JWT_SECRET);
        console.log(process.env.REFRESH_SECRET)
        const accessToken = jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn:'1h'});
        const refreshToken = jwt.sign({id:userId } , process.env.REFRESH_SECRET , {expiresIn :'7d'});

        console.log("Access TOken :" , accessToken);
        console.log("RefreshTOken :" , refreshToken);
        if(!accessToken || !refreshToken){
            return res.status(400).json({message:"Tokens now generatesd"});
        }
        res.cookie('jwt' , refreshToken , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  
        })
        return accessToken;
     } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Error in Token Generation" , data:error.message})
     }
}

export {
    generateToken,
}