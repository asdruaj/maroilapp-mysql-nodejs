const { json } = require("body-parser");
const { signedCookie } = require("cookie-parser");
var cn = require("../config/connection");
const usersModel = require("../model/usersModel");
var user = require("../model/usersModel");

module.exports = {
  index: async function (req, res) {

    await user.getUsers(cn, async function (err,data) {
      // console.log(data); 
      await res.render("users.ejs", { users:data });
    });
  },

  create: async function(req, res){
    await res.render('createUser.ejs');
  },
  save: async function (req,res) {
    console.log(req.body);
    
      await user.insertUser(cn, req.body, async function (err) {
        if (err && err.code === 'ER_DUP_ENTRY') {
          req.flash('message','Algo salió mal. Este usuario ya existe')
          res.redirect('/users')
        }else{
        await res.redirect('/users');
        }
      });    
  },

  delete: async function(req, res){
    console.log("Recepción de datos")
    array = req.body
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
        user.deleteUser(cn, element, function(err){
        console.log(`elemento ${element} eliminado`)
      })
    }
  },

  edit: async function (req, res){
      await user.returnIdData(cn, req.params.id, async function(err, data){
      console.log( data[0] )
      await res.render('editUser.ejs', { users:data[0]} );
    });
    
  },

  update: async function (req, res) {

    if(req.body){

    await user.updateUser(cn, req.body, async function (err) {
      if (err && err.code === 'ER_DUP_ENTRY') {
        req.flash('message','Algo salió mal. Este usuario ya existe')
        res.redirect('/users')
      }else{
      await res.redirect('/users');
      }
      });
    } 
  }
};
