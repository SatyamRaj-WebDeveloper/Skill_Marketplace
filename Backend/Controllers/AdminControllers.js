import provider from '../models/providerProfile'
import User from '../models/user_model';

const approveRequest = async(req,res)=>{
    const {providerID} = req.params;
    try {
          const user = await User.findById(providerID);
        if(!user){
            return res.status(404).json({message:"Could Not Find Provider "});
        }
        if(user.role == 'provider' && user.providerStatus == 'provider' && user.role == 'provider'){
           return res.status(200).json({message:"Already a Provider"})
        }else{
            user.providerStatus = 'provider'
            user.role = 'provider'
            await user.save();
            return res.status(200).json({message:"User is now a Provider" , data:{
                username:user.username,
                providerStatus : user.providerStatus,
                role : user.role
            }})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const cancelRequest = async(req,res) => {
    const {providerID} = req.params;
    try {
        const user  = await User.findById(providerID);
        if(!user){
            return res.status(404).json({message:"Could Not Find Provider"});
        }
        if(user.providerStatus == 'pending'){
            user.providerStatus = 'rejected';
            await user.save();
        }
        return res.status(200).json({message:"Provider Request Declined"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}



const getAllUsers = async(req , res)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({message:"No users Found"});
        }
        return res.status(200).json({message:"Users Fetched Successfully", data:users});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const suspendUser = async(req,res)=>{
    const {userId} = req.params;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"No user found"});
        }
        user.isActive = false;
        await user.save();
        return res.status(200).json({message:"User Suspended Succeffuly"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}



export {
    approveRequest,
    cancelRequest,
}