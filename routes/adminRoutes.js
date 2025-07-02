const express = require('express');
const {authorizeRole,authanticateToken} = require("../middlewares/authMiddleware")
const { loginAdmin, getAllUsers, getAllProviders, getAllServices, getAllAppointment, deleteUser, deleteService } = require('../controllers/adminController');
const router = express.Router();

// Admin Routes
router.post('/admin-login',loginAdmin);

router.get('/all-users',authanticateToken,authorizeRole('admin'),getAllUsers);

router.get('/all-providers',authanticateToken,authorizeRole('admin'),getAllProviders);

router.get('/all-services',authanticateToken,authorizeRole('admin'),getAllServices);

router.get('/all-appointmets',authanticateToken,authorizeRole('admin'),getAllAppointment);

router.delete('/delete-user/:id',authanticateToken,authorizeRole('admin'),deleteUser);

router.delete('/delete-service/:id',authanticateToken,authorizeRole('admin'),deleteService)


module.exports = router