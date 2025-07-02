const express = require('express');
require('dotenv').config();

//Routes import file
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoute');
const providrProfile = require("./routes/providerProfileRoute");
const serviceRoute = require("./routes/serviceRoute");
const bookingRoute = require("./routes/bookingRoute")


const app = express();

//Middleware
app.use(express.json());


// Routes
app.use('/admin',adminRoutes);
app.use('/',authRoutes);
app.use('/',providrProfile);
app.use('/provider',serviceRoute);
app.use("/",bookingRoute)


module.exports = app 