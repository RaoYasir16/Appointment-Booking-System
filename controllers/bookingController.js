const { service, appointment, user } = require("../models");
const dayjs = require('dayjs')

//............... Create Appointment .............//
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const { appointmentDate, timeSlot, notes } = req.body;

    const formatedDate = dayjs(appointmentDate).format("YYYY-MM-DD HH:mm:ssZ")

    const existingService = await service.findOne({ where: { id } });
    if (!existingService) {
      return res.status(404).json({
        message: "Service Not found",
      });
    }

    const providerId = existingService.providerId;

    const exists = await appointment.findOne({
      where: { providerId, appointmentDate:formatedDate, timeSlot },
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const Appointment = await appointment.create({
      userId,
      providerId,
      serviceId: id,
      appointmentDate:formatedDate,
      timeSlot,
      notes,
    });

    return res.status(200).json({
      message: "Appointment Create Successfylly",
      Appointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


//................... View Appointment ...........//
const viewAppointments = async(req,res)=>{
    try {
        const userId = req.user.id 

        const appointments = await appointment.findAll({where:{userId},
        include:[
            {model:user,as:'provider',attributes:['name','email']},
            {model:service,as:'service',attributes:['title','price']}
        ],
        order:[['appointmentDate','ASC']]
        });

        if(appointments.length === 0){
            return res.status(404).json({
                message:"Appointment not Found"
            })
        }

        return res.status(200).json({
            message:"Appointment Fatched Successfully",
            appointments
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//.................... User cancel Appointment ............//
const cancelAppointment = async(req,res)=>{
  try {
    const id = req.params.id
    const userId = req.user.id

    const Appointment = await appointment.findOne({where:{id,userId}});
    if(!Appointment){
      return res.status(404).json({
        message:"Appointment Not Found"
      })
    }

    Appointment.status = 'cancelled';
    await Appointment.save();

    return res.status(200).json({
      message:"Appointment Cancelled Successfylly",
      Appointment
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

module.exports = { createBooking,viewAppointments,cancelAppointment };
