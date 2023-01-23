const { json } = require("body-parser");
const { signedCookie } = require("cookie-parser");
const { response } = require("express");
var cn = require("../config/connection");
const equipmentModel = require("../model/equipmentModel");
var equipment = require("../model/equipmentModel");

module.exports = {
  index: async function (req, res) {
    try {
      equipment.getEquipment(cn, async function (err, data) {
        equipment.getSpecialty(cn, async (err, data2) => {
          equipment.getFailure(cn, async (err, data3) => {
            await res.render("equipment.ejs", {
              equipment: data,
              specialty: data2,
              failure: data3,
            });
          });
        });
      });
    } catch (error) {}
  },
  create: async function (req, res) {
    res.render("createReport");
  },
  saveEquipment: async function (req, res) {
    try {
      console.log(req.body);

      equipment.insertEquipment(cn, req.body, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {}
  },
  saveSpecialty: async function (req, res) {
    try {
      console.log(req.body);

      equipment.insertSpecialty(cn, req.body, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {
      console.log(error);
    }
  },
  saveFailure: async function (req, res) {
    try {
      console.log(req.body);

      equipment.insertFailure(cn, req.body, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteEquipment: async function (req, res) {
    try {
      console.log("Recepción de datos");
      console.log(req.params.id);
      equipment.deleteEquipment(cn, req.params.id, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {}
  },
  deleteSpecialty: async function (req, res) {
    try {
      console.log("Recepción de datos");
      console.log(req.params.id);
      equipment.deleteSpecialty(cn, req.params.id, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {}
  },
  deleteFailure: async function (req, res) {
    try {
      console.log("Recepción de datos");
      console.log(req.params.id);
      equipment.deleteFailure(cn, req.params.id, async function (err) {
        await res.redirect("/equipment");
      });
    } catch (error) {}
  },

  updateEquipment: function (req, res) {
    try {
      if (req.body) {
        equipment.updateEquipment(cn, req.body, async function (err) {
          await res.redirect("/equipment");
          console.log(req.body);
        });
      }
    } catch (error) {}
  },
  updateSpecialty: function (req, res) {
    try {
      if (req.body) {
        equipment.updateSpecialty(cn, req.body, async function (err) {
          await res.redirect("/equipment");
          console.log(req.body);
        });
      }
    } catch (error) {}
  },
  updateFailure: function (req, res) {
    try {
      if (req.body) {
        equipment.updateFailure(cn, req.body, async function (err) {
          await res.redirect("/equipment");
          console.log(req.body);
        });
      }
    } catch (error) {}
  },
  vesselIndex: async function (req, res) {
    try {
        await equipment.getVessel(cn, async function(err, data){
          await res.render("vessel.ejs", {vessel: data});
        })
    } catch (error) {}
  },
  saveVessel: async function (req, res) {
    try {
      console.log(req.body);
      await equipment.insertVessel(cn, req.body, async function (err) {
        await res.redirect("/vessel");
      });
    } catch (error) {}
  },

  deleteVessel: async function (req, res) {
    try {
      console.log("Recepción de datos");
      console.log(req.params.id);
      equipment.deleteVessel(cn, req.params.id, async function (err) {
        await res.redirect("/vessel");
      });
    } catch (error) {}
  },
};
