const express = require('express');
const { createProfile, getProfile, getProviderAppointments, changeStatus } = require('../controllers/providerDeashboard');
const router = express.Router();
const {authanticateToken,authorizeRole} = require('../middlewares/authMiddleware')


// Provider Routes 
router.post('/add-profile',authanticateToken,authorizeRole('provider'),createProfile);


router.get("/get-profile",authanticateToken,authorizeRole('provider'),getProfile);


router.get('/appointments',authanticateToken,authorizeRole('provider'),getProviderAppointments);


router.patch("/change-status/:id",authanticateToken,authorizeRole('provider'),changeStatus);


module.exports = router