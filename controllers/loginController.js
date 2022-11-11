const { json } = require("body-parser");
const { signedCookie } = require("cookie-parser");
const { response } = require("express");
var cn = require("../config/connection");
const equipmentModel = require("../model/equipmentModel");
var equipment = require("../model/equipmentModel");

module.exports = {
  renderLogin: async function (req, res) {
    try {
      res.render("login.ejs");
    } catch (error) {}
  },
};
