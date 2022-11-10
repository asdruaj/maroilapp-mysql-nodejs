var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const MemoryStore = require('memorystore')(session)

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reportsRouter = require("./routes/reports");
var equipmentRouter = require("./routes/equipment");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require("./lib/passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: true,
    rolling: true,
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    saveUninitialized: false,
    secret: "moi-pass",
    //cookie expires after 1 hour of inactivity
    cookie: { expires: 3600000}, 
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reports", reportsRouter);
app.use("/equipment", equipmentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = {app: app, server: server};
