const {user} = require('../models');
const bcrypt = require('bcrypt');
const generateToken = require("../utils/jwt")

//.......... Register User/Providers...........//
const registerUser = async(req , res)=>{
    try {
        const {name,email,password,role} = req.body
        if(!name || !email || !password){
            return res.status(403).json({
                message:"All fields are required"
            })
        }

        const existingUser = await user.findOne({where:{email}});
        if(existingUser){
            return res.status(403).json({
                message:"Email already Registered"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const User = await user.create({
            name,
            email,
            password:hashPassword,
            role
        });

        return res.status(200).json({
            message:"User Created Successfully",
            name:User.name,
            email:User.email,
            role:User.role
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//.......... Login User/Providers ............//
const logUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await user.findOne({where:{email}});
        if(!existingUser){
            return res.status(404).json({
                message:"Email not Registerd"
            })
        }

        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Email or password is correct"
            })
        }

        const token = generateToken(existingUser);

        return res.status(200).json({
            name:existingUser.name,
            email:existingUser.email,
            role:existingUser.role,
            token
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports ={registerUser, logUser}