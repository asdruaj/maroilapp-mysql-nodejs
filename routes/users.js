var express = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport')
const {isLoggedIn, isAdmin} = require("../lib/auth")
var router = express.Router();

/* GET users listing. */
router.get('/', isLoggedIn, isAdmin, usersController.index);

// Create, delete and edit view
router.get('/create', isLoggedIn, isAdmin, usersController.create);
router.post("/", isLoggedIn, isAdmin, usersController.save);
router.post("/delete", isLoggedIn, isAdmin, usersController.delete);
router.get('/edit/:id', isLoggedIn, isAdmin, usersController.edit);
router.post('/update', isLoggedIn, isAdmin, usersController.update);
router.get('/editProfile', isLoggedIn, usersController.editProfile);
router.post('/updateProfile', isLoggedIn, usersController.updateProfile);

module.exports = router;
