var express = require('express');
var router = express.Router();
const passport = require('passport')
const {isLoggedIn, isAdmin} = require("../lib/auth")
const reportsController = require('../controllers/reportsController')


/* GET home page. */
router.get('/', isLoggedIn, reportsController.index);

// Create, delete and edit view
router.get('/create', isLoggedIn, reportsController.create);
router.post("/", isLoggedIn, reportsController.save);
router.post("/delete", isLoggedIn, isAdmin, reportsController.delete);
router.get('/edit/:id', isLoggedIn, reportsController.edit);
router.post('/update', isLoggedIn, reportsController.update);

module.exports = router;  