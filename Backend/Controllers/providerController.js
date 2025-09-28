import provider from "../models/providerProfile.js";
import geocoder from "../config/geocoder.js";
import Review from "../models/reviews_model.js";
import Booking from "../models/bookings_model.js";



const updateProviderProfile = async(req,res)=>{
    console.log(req.body);
    const{bio, ServiceCategory, location , availability ,coordinates} = req.body ;
    try {
        const Provider = await provider.findOne({ user: req.user._id })
        if(!Provider){
            return res.status(404).json({message:"Provider Not Found"})
        }
        if(location){
            const geoData = await geocoder.geocode(location);
            if(!geoData || geoData.length == 0){
                return res.status(404).json({message:"Location not found"});
            }
            Provider.location={
                type : "Point",
                coordinates : [geoData[0].longitude , geoData[0].latitude]
            }
        }else if(coordinates){
            Provider.location = {
                type : 'Point',
                coordinates :[coordinates[0], coordinates[1]]
            }
        }
        if(bio) Provider.bio = bio;
        if(ServiceCategory) Provider.serviceCategory = ServiceCategory;
        if(availability) Provider.availability = JSON.parse(availability);

        if(req.file){
            Provider.profileImage = req.file.location;
        }
        const updatedProfile = await Provider.save();
        return res.status(200).json({message:"Provider Updated Successfully" , data : updatedProfile});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error", error:error.message})
    }
}


const getMyReviews = async(req,res)=>{
    const {id} = req.user;
    try {
        if(!id){
            return res.status(400).json({message:"Invalid Provider Id"});
        }
        const Provider  = await provider.findOne({user:req.user.id})
        if(!Provider){
            return res.status(400).json({message:"Provider Not Found"})
        }
        const reviews = await Review.find({
            providerId:Provider._id,
        })
        .populate('user', 'username')
        .sort({createdAt : -1});
        return res.status(200).json({
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error" , error:error.message})
    }
}

const getMyOrders = async(req,res)=>{
    const id = req.user.id;
    console.log(id)
    try {
        const Provider = await provider.findOne({user:id});
        if(!Provider || !id){
            return res.status(404).json("Provider or Id Not Found");
        }
        const orders = await Booking.find({providerId:Provider._id})
        .populate('user', 'username')
        .sort({createdAt : -1})
        return res.status(200).json({message:"Provider Orders Fetched Successfully" , data:orders})
    } catch (error) {
          console.log(error.message);
        return res.status(500).json({message:"Internal Server Error" , error:error.message})
    }
}

const updateJobStatus = async(req,res)=>{
    const {jobId} = req.params;
    const {status} = req.body;
    const id = req.user.id;
    try {
        const Provider = await provider.findOne({user:id});
        const job = await Booking.findById(jobId);

        if(job.providerId.toString() !== Provider._id.toString()){
            return res.status(403).json({message:"Forbidden Access"})
        }
        job.status = status
        await job.save();
        return res.status(200).json({message:"Job Status Updated Successfully"});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server error" , data:error.message});
    }
}

const blockedDates = async(req,res)=>{
    const{date} = req.body;
    try {
        const Provider = await provider.findOne({user:req.user.id});
        if(!Provider){
            return res.status(400).json({message:"Provider Not Found"});
        }
        await Provider.updateOne({$addToSet:{BlockedDates : new Date(date)}});
        return res.status(200).json({ message: 'Date successfully blocked.' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const cancelBooking =  async(req, res)=>{
    const {bookingId} = req.params;
    const userId = req.user.id;
    if(!bookingId || !userId){
        return res.status(404).json({message:"Invalid Booking Id or UserId"});
    }
    try {
        const Provider  = await provider.findOne({user:userId})
        if(!Provider){
            return res.status(404).json({message:"Provider Not Found"});
        }
        const order = await Booking.findOne({_id:bookingId , providerId:Provider._id});
        if(!order){
            return res.status(404).json({message:"Order Not found or you are not an Authorized Provider "});
        }
        order.status = 'cancelled';
        await order.save();
        return res.status(200).json({message:"order Cancelled Successfully" , data:order});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const confirmBooking = async(req , res)=>{
    const {bookingId} = req.params;
    const userId = req.user.id;
    if(!bookingId || !userId){
        return res.status(404).json({message:"Invalid Booking Id or UserId" });
    }
    try {
        const Provider = await provider.findOne({user:userId});
        if(!Provider){
            return res.status(404).json({message:"No Provider Found"})
        }
        const order = await Booking.findOne({_id:bookingId , providerId : Provider._id});
        if(!order){
            return res.status(404).json({message:"Order Not found or you are not an Authorized Provider "});
        }
        if (order.status !== 'confirmed') {
        return res.status(400).json({ message: `Cannot confirm a booking that is currently '${order.status}'.` });
        }
        order.status = 'confirmed';
        await order.save();
        return res.status(200).json({message:"Order Confirmed Successfully" , data:order})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const completeBooking  = async(req,res)=>{
    const id = req.user.id;
    const {bookingId} = req.params;
    if(!id || !bookingId){
        return res.status(404).json({message:"Invalid id or Booking Id"});
    }
    try {
        const Provider = await provider.findOne({user:id}) ;
        if(!Provider){
            return res.status(404).json({message:"No Provider Found"});
        }
        const order = await Booking.findOne({_id:bookingId , providerId:Provider._id});
        if(!order){
            return res.status(404).json({message:"Order Not found or you are not an Authorized Provider "});
        }
        if (order.status !== 'confirmed') {
        return res.status(400).json({ message: `Cannot complete a booking that is currently '${order.status}'.` });
       }
        order.status = "completed";
        await order.save();
        return res.status(200).json({message:"Order Completed", data:order});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}


export {
    updateProviderProfile,
    getMyReviews,
    getMyOrders,
    updateJobStatus,
    blockedDates,
    cancelBooking,
    confirmBooking,
    completeBooking,
}