module.exports ={

  isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next()
    }
    return res.redirect("/")
  },

  isAdmin(req, res, next){
    if(req.user.role == "Administrador"){
      return next();
    }
    req.flash('message','No tiene los permisos necesarios para realizar esta acción')
    return res.redirect("./dashboard")
  }
};
