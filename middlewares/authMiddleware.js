const jwt = require('jsonwebtoken');
const { user } = require("../models");


// Token verification
const authanticateToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
          message: "Unauthorized: No token provided",
        });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const foundUser = await user.findByPk(decoded.id); 
      if (!foundUser || foundUser.isBanned) {
        return res.status(403).json({
          message: "Access denied or User Banned",
        });
      }
  
      req.user = foundUser;
      next();
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  };

// Role Verification
const authorizeRole = (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            return res.status(403).json({
                message:"Access denied"
            })
        }
        next()
    }
}


module.exports ={authanticateToken,authorizeRole}