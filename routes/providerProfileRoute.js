const express = require('express');
const { createProfile, getProfile } = require('../controllers/providerProfileController');
const router = express.Router();
const {authanticateToken,authorizeRole} = require('../middlewares/authMiddleware')


//............. Update/Create Provider Profile............//
router.post('/add-profile',authanticateToken,authorizeRole('provider'),createProfile);

//................ Get Profile ...........................//
router.get("/get-profile",authanticateToken,authorizeRole('provider'),getProfile)


module.exports = router