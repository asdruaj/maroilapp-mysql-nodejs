const { json } = require("body-parser");
const { signedCookie } = require("cookie-parser");
var cn = require("../config/connection");
const reportsModel = require("../model/reportsModel");
var report = require("../model/reportsModel");
var equipment = require("../model/equipmentModel");

module.exports = {
  index: async function (req, res) {
    try {
      await report.getReport(cn, async function (err, data) {
        // console.log(data);
        await res.render("reports.ejs", { reports: data });
      });
    } catch (error) {}
  },
  create: async function (req, res) {
    try {
      await equipment.getEquipment(cn, async function (err, data) {
       await equipment.getSpecialty(cn, async(err, data2)=>{
         await equipment.getFailure(cn, async(err, data3)=>{
            await res.render("createReport.ejs", {equipment: data, specialty: data2, failure: data3});
          })
        })
        
      }); 
    } catch (error) {}
  },
  save: async function (req, res) {
    try {
      await report.insertReport(cn, req.body, async function (err, fields) {
          await report.insertRecentUpdates(cn, {user: req.user.name, type: "INSERT", equipmentId: fields.insertId, timestamp: Date.now()}, async function(err){
            if(err) console.log(err)
          });
        await res.redirect("/reports");
      });

    } catch (error) {console.log(error)}
  },

  delete: async function (req, res) {
    try {
      array = req.body;
      for (let i = 0; i < array.length; i++) {
        let element = array[i];
        await report.deleteReport(cn, element, async function (err) {
          await report.insertRecentUpdates(cn, {user: req.user.username, type: "DELETE", equipmentId: element, timestamp: Date.now()}, async function(err){
            if(err) console.log(err)
          });
        });
      }
    } catch (error) {}
  },

  edit: async function (req, res) {
    try {
      await report.returnIdData(cn, req.params.id, async function (err, data) {
      await equipment.getEquipment(cn, async function (err, data2) {
        await equipment.getSpecialty(cn, async(err, data3)=>{
          await equipment.getFailure(cn, async(err, data4)=>{
            await res.render("editReport.ejs", {reports: data[0], equipment: data2, specialty: data3, failure: data4});
          })
        })
      });
      })
    } catch (error) {}
  },

  update: async function (req, res) {
    try {
      if (req.body) {
        await report.updateReport(cn, req.body, async function (err) {
          await report.insertRecentUpdates(cn, {user: req.user.username, type: "UPDATE", equipmentId: req.body.id, timestamp: Date.now()}, async function(err){
            if(err) console.log(err)
          });
          await res.redirect("/reports");
        });
      }
    } catch (error) {}
  },
  dashboard: async function (req, res) {
    try {
      await report.getLastReports(cn, async function (err, data) {
      await report.getCount(cn, async function(err, data2){
      await report.getRecentUpdates(cn,async function(err,data3){

        await res.render("dashboard.ejs", { reports: data, count: data2, updates: data3 });
      })
      })
        
      });
    } catch (error) {}
  }
};
