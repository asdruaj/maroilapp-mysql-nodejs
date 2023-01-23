var express = require('express');
const equipmentController = require('../controllers/equipmentController');
var router = express.Router();
const passport = require('passport')
const {isLoggedIn, isAdmin} = require("../lib/auth")


router.get('/', isLoggedIn, isAdmin, equipmentController.vesselIndex);
router.post("/saveVessel", isLoggedIn, isAdmin, equipmentController.saveVessel);
router.post("/deleteVessel/:id", isLoggedIn, isAdmin, equipmentController.deleteVessel)

module.exports = router;