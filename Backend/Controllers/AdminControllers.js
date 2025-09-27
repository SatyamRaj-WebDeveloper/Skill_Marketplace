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

        const page = parseInt(req.query.page);
        const limit  = parseInt(req.query.limit);
        const skip = (page-1)*limit;
        const users = await User.find()
        .select('-password')
        .skip(skip)
        .limit(limit);
         
        const totalUsers = await User.countDocuments();

        if(!users){
            return res.status(404).json({message:"No users Found"});
        }
        return res.status(200).json({
            message:"Users Fetched Successfully",
            data : users,
            pagination : {
                total: totalUsers,
                page: page,
                pages: Math.ceil(totalUsers / limit)
            }
        });
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
        if(user.id !== req.user.id){
            user.isActive = false;
            await user.save();
            return res.status(200).json({message:"User Suspended Succeffuly"});
        }else{
            return res.status(400).json({message:"Admin Cannot Suspend their own Account"});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}



export {
    approveRequest,
    cancelRequest,
}