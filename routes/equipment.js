var express = require('express');
const equipmentController = require('../controllers/equipmentController');
var router = express.Router();
const passport = require('passport')
const {isLoggedIn, isAdmin} = require("../lib/auth")

/* GET equipment listing. */
router.get('/', isLoggedIn, isAdmin, equipmentController.index);

// // Create, delete and edit view
router.post("/", isLoggedIn, isAdmin, equipmentController.saveEquipment);
router.post("/specialty", isLoggedIn, isAdmin, equipmentController.saveSpecialty);
router.post("/failure", isLoggedIn, isAdmin, equipmentController.saveFailure);
router.post("/deleteEquipment/:id", isLoggedIn, isAdmin, equipmentController.deleteEquipment)
router.post("/deleteSpecialty/:id", isLoggedIn, isAdmin, equipmentController.deleteSpecialty)
router.post("/deleteFailure/:id", isLoggedIn, isAdmin, equipmentController.deleteFailure)
router.post("/editEquipment/:id", isLoggedIn, isAdmin, equipmentController.updateEquipment)
router.post("/editSpecialty/:id", isLoggedIn, isAdmin, equipmentController.updateSpecialty)
router.post("/editFailure/:id", isLoggedIn, isAdmin, equipmentController.updateFailure)


module.exports = router;
