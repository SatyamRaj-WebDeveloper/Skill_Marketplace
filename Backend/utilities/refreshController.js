import jwt from 'jsonwebtoken';


const verifytokens = (req, res)=>{
    const refreshToken = req.cookie.jwt;
    try {
        const verified = jwt.verify(refreshToken , process.env.REFRESH_SECRET);
        if(!verified){
            return res.status(403).json({message:"Forbidden : Unauthorized Access"});
        }
        const newAccessToken = jwt.sign({id:verified.id} , process.env.JWT_SECRET , {expiresIn: "1h"});
        return res.json({newAccessToken}) ; 
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error" , data:error.message});
    }
}

export default verifytokens;