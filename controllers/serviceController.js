const { service } = require("../models");
const fs = require('fs');
const path = require('path')

//................. Create Service ............//
const createService = async(req , res)=>{
    try {
        const userId = req.user.id
        const {title,description,price,duration} = req.body
        const image = req.file?.filename;

        if(!image){
            return res.status(400).json({
                message:"Image is require"
            })
        }

        const Service = await service.create({
            providerId:userId,
            title,
            description,
            price,
            duration,
            image

        });

        return res.status(200).json({
            message:"Service Created",
            Service
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
}

//.................View our Services ............//
const viewServices = async(req,res)=>{
    try {
        const providerId = req.user.id;
        const services = await service.findAll({where:{providerId}});
        if(services.length === 0){
            return res.status(404).json({
                message:"Service not found"
            })
        }

        return res.status(200).json({
            message:"Your Services",
            services
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//...................... Get Single Service ...............//
const singleService = async(req,res)=>{
    try {
        const providerId = req.user.id
        const  id = req.params.id

        const existingService = await service.findOne({where:{id,providerId}});
        if(!existingService){
            return res.status(404).json({
                message:"Service Not Found"
            })
        }

        return res.status(200).json({
            message:"Service Fatched Successfylly",
            existingService
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//................... Update Service ................//
const updateService = async(req,res)=>{
    try {
        const providerId = req.user.id
        const {id} = req.params
        const {title,description,price,duration,} = req.body;
        const newImage = req.file?.filename;

        const existingService = await service.findOne({where:{id,providerId}});
        if(!existingService){
            return res.status(404).json({
                message:"Service Not found, Or you not own this Service"
            })
        }

        if(newImage && existingService.image){
            const oldImagePath = path.join(__dirname,"../uploads",existingService.image);
            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath)
            }
        }

        await existingService.update({
            title,
            description,
            price,
            duration,
            image:newImage || existingService
        });

        await existingService.save()

        return res.status(200).json({
            message:"Service Updated",
            existingService
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//.................... Delete Service ..............//
const deleteService = async(req,res)=>{
    try {
        const {id} = req.params
        const providerId = req.user.id

        const existingService = await service.findOne({where:{id,providerId}});
        if(!existingService){
            return res.status(404).json({
                message:"Service Not Found"
            })
        }

        if(existingService.image){
            const oldPath = path.join(__dirname,'../uploads',existingService.image);
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath)
            }
        }

        await existingService.destroy();

        return res.status(200).json({
            message:"Service delete Successfylly"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {createService,viewServices,singleService,updateService,deleteService }