const {user, providerProfile } = require('../models');


//............Provider crate or Update our Profile ......//
const createProfile = async(req , res)=>{
    try {
        const {businessName,about,phone,location,availableDays,startTime,endTime} = req.body
        const {id} = req.user;
        const User = await user.findOne({where:{id}});
        if(!User){
            return  res.status(404).json({
                message:"User not exist"
            })
        }

        let profile = await providerProfile.findOne({where:{userId:id}});

        if(profile){
            await profile.update({
               businessName,about,phone,location,availableDays,startTime,endTime
            })
        }else{
            profile = await providerProfile.create({
                userId:id,businessName,about,phone,location,availableDays,startTime,endTime
            })
        }

        return res.status(200).json({
            message:"Profile create Successfylly",
            profile
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//................. Provider Get Our Profile ..........//
const getProfile = async(req,res)=>{
    try {
        const {id} = req.user

        const profile = await providerProfile.findOne({where:{userId:id}});
        if(!profile){
            return res.status(404).json({
                message:"Profile Not Found"
            })
        }

        return res.status(200).json({
            message:"Profile Fatched Successfylly",
            profile
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {createProfile, getProfile}