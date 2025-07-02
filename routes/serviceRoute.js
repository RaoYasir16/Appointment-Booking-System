const express = require("express");
const router = express.Router();
const {createService, viewServices, singleService, updateService, deleteService} = require("../controllers/serviceController")

const uploads = require("../middlewares/upload"); 
const {authanticateToken,authorizeRole} = require("../middlewares/authMiddleware")

//.............. Create Service .................//
router.post('/create-service', authanticateToken, authorizeRole('provider'), uploads.single('image'),createService );

//.............. View our all Services ..............//
router.get("/get-our-services",authanticateToken,authorizeRole('provider'),viewServices);

//.................... view our Single service ............//
router.get("/get-single-service/:id",authanticateToken,authorizeRole("provider"),singleService);

//..................... Update Our Own Service ...........//
router.put('/update-service/:id',authanticateToken,authorizeRole('provider'),uploads.single('image'),updateService)


//................... Delete Service ................//
router.delete('/delete-service/:id',authanticateToken,authorizeRole('provider'),deleteService)

module.exports = router