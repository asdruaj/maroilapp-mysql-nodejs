var express = require('express');
var router = express.Router();
const reportsController = require('../controllers/reportsController')
const loginController = require('../controllers/loginController')
const passport = require('passport')
const {isLoggedIn} = require("../lib/auth")
const {updatedObject} = require("../config/connection")

/* GET home page. */
router.get('/', loginController.renderLogin)

router.post('/login', (req, res, next) =>{
  passport.authenticate('local.signin',{
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout',(req,res,next)=>{
  req.logOut((err)=>{
  res.redirect("/")
  });
})

router.get('/dashboard', isLoggedIn, reportsController.dashboard, (req,res,next)=>{
  
})

module.exports = router;