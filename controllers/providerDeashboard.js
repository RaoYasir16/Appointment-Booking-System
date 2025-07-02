const {user, providerProfile,appointment,service} = require('../models');


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


//............... Get Provider Appointment ............//
const getProviderAppointments = async(req,res)=>{
    try {
        const providerId = req.user.id
        const appointments = await appointment.findAll({
            where:{providerId},
            include:[
                {
                    model:user, as:'customer',attributes:['name','email'],
                },
                {
                    model:service,as:'service',attributes:['title','price','duration']
                }
            ]
        });

        if(appointments.length == 0){
            return res.status(404).json({
                message:"Appointment Not Found"
            })
        }

        return res.status(200).json({
            message:'Appointments fatched Successfylly',
            appointments
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
} 


//............... chage status of Appointment ..........//
const changeStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const {id} = req.params;
        const allowStatus =['confirmed', 'cancelled','completed'];
        if(!allowStatus.includes(status)){
            return res.status(400).json({
                message:"Invalid Status Value"
            })
        }

        const Appointment = await appointment.findOne({where:{id,providerId:req.user.id}});
        if(!Appointment){
            return res.status(404).json({
                message:"Appointment not found"
            })
        }

        Appointment.status = status;
        Appointment.save();

        return res.status(200).json({
            message:"Status Update successfylly",
            Appointment
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


module.exports = {createProfile, getProfile,getProviderAppointments,changeStatus}