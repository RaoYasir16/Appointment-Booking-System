const express = require('express');
const router = express.Router();

const {authanticateToken,authorizeRole} = require("../middlewares/authMiddleware");
const { createBooking, viewAppointments, cancelAppointment } = require('../controllers/bookingController');

//....................... User Crate Appoinment ...............//
router.post("/create-booking/:id",authanticateToken,authorizeRole('user'),createBooking);

//..................... View Appointments ...........//
router.get("/view-appointments",authanticateToken,authorizeRole('user'),viewAppointments);

//....................Cancelled Appointment ..........//
router.post("/cancel-appointment",authanticateToken,authorizeRole('user'),cancelAppointment)


module.exports = router