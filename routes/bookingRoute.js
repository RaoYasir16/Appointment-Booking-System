const express = require('express');
const router = express.Router();

const {authanticateToken,authorizeRole} = require("../middlewares/authMiddleware");
const { createBooking, viewAppointments, cancelAppointment } = require('../controllers/bookingController');

// User Routes
router.post("/create-booking/:id",authanticateToken,authorizeRole('user'),createBooking);


router.get("/view-appointments",authanticateToken,authorizeRole('user'),viewAppointments);


router.post("/cancel-appointment/:id",authanticateToken,authorizeRole('user'),cancelAppointment)


module.exports = router