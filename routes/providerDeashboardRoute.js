const express = require('express');
const { createProfile, getProfile, getProviderAppointments, changeStatus } = require('../controllers/providerDeashboard');
const router = express.Router();
const {authanticateToken,authorizeRole} = require('../middlewares/authMiddleware')


//............. Update/Create Provider Profile............//
router.post('/add-profile',authanticateToken,authorizeRole('provider'),createProfile);

//................ Get Profile ...........................//
router.get("/get-profile",authanticateToken,authorizeRole('provider'),getProfile);

//.................. Get Appointments ............//
router.get('/appointments',authanticateToken,authorizeRole('provider'),getProviderAppointments);

//................. Change Appointment Status ...............//
router.patch("/change-status/:id",authanticateToken,authorizeRole('provider'),changeStatus);


module.exports = router