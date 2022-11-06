const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var cn = require("../config/connection");

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async(req, username, password, done)=>{
  await cn.query("SELECT * FROM `tbl-users` WHERE username = ?", [username], async (err, res, fields) => {
    if (res.length > 0) {
      const user = res[0];
       if(password == user.password){
        done(null, user, req.flash('success','Bienvenido' + user.username));
       }else{
        done(null, false, req.flash('message','Contraseña inválida'))
       }
    } else {
      return done(null, false, req.flash('message', 'Este usuario no existe '))
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  await cn.query("SELECT * FROM `tbl-users` WHERE id = ?", [id], (err, res, fields)=>{
    done(null, res[0])
  })
});
