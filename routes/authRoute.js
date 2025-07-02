const express = require('express');
const { registerUser, logUser } = require('../controllers/authController');
const router = express.Router();


//....... Register or Login User/Providers .........//
router.post('/register-user',registerUser);

router.post('/login-user',logUser)


module.exports = router