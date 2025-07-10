const { user, service, appointment } = require("../models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

//.............Admin Login................//
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await user.findOne({ where: { email } });

    if (!User) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }

    if (User.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized, only admin can access this route",
      });
    }

    const isCompare = await bcrypt.compare(password, User.password);
    if (!isCompare) {
      return res.status(401).json({
        message: "Email or Password incorrect",
      });
    }

    const token = generateToken(User);
    return res.status(200).json({
      name: User.name,
      email: User.email,
      role: User.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//.......................... Admin Dashboard ...........................//


//.............admin Get all User......//
const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      where: { role: "user" },
      attributes: { exclude: ["password"] },
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "User Not found",
      });
    }

    return res.status(200).json({
      message: "User Fatched successfylly",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...........Get all Providers............//
const getAllProviders = async (req, res) => {
  try {
    const provider = await user.findAll({
      where: { role: "provider" },
      attributes: { exclude: ["password"] },
    });
    if (provider.length === 0) {
      return res.status(404).json({
        message: "Providers Not found",
      });
    }

    return res.status(200).json({
      message: "Providers fatched Successfylly",
      provider,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//..........Get all Services............//
const getAllServices = async (req, res) => {
  try {
    const services = await service.findAll();
    if (services.length === 0) {
      return res.status(404).json({
        message: "Services Not Found",
      });
    }

    return res.status(200).json({
      message: "Services Fatched Successfylly",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.............Get all Appointments.......//
const getAllAppointment = async (req, res) => {
  try {
    const appointments = await appointment.findAll();
    if (appointments.length === 0) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Appointment Fatched Successfully",
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...........Delete User .......//
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findOne({ where: { id } });
    if (!User) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (User.role === "provider") {
      await service.destroy({ where: { providerId: id } });
    }

    await User.destroy();
    return res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...........Delete Service .........//
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const Service = await service.findOne({ where: { id } });
    if (!Service) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    await Service.destroy();
    return res.status(200).json({
      message: "Services Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


//........................ Admin Banned or UnBanned the user ...............//
const toggleBanUser = async(req,res)=>{
  try {
    const {id} = req.params

    const User = await user.findOne({where:{id}});
    if(!User){
      return res.status(404).json({
        message:"User Not found"
      })
    }

    User.isBanned = !User.isBanned;
    await User.save();

    return res.status(200).json({
      message:`User ${User.isBanned? 'Banned':'Unbanned'}`
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}


//..................... Get platform Stats ..............//
const getPlatformStats = async(req,res)=>{
  try {
    const totalUsers = await user.count({where:{role:'user'}});
    const totalProvider = await user.count({where:{role:'provider'}});
    const totalAppointment = await appointment.count();
    const totalBanned = await user.count({where:{isBanned:true}});
    const totalApprovedAppointment = await appointment.count({where:{status:'confirmed'}});
    const totalAppointmentComplete = await appointment.count({where:{status:'completed'}});
    const totalAppointmentCancelled = await appointment.count({where:{status:'cancelled'}})

    res.json({
      totalUsers,
      totalProvider,
      totalAppointment,
      totalBanned,
      totalApprovedAppointment,
      totalAppointmentComplete,
      totalAppointmentCancelled
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

module.exports = {
  loginAdmin,
  getAllUsers,
  getAllProviders,
  getAllServices,
  getAllAppointment,
  deleteUser,
  deleteService,
  toggleBanUser,
  getPlatformStats
};
