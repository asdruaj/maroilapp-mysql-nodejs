module.exports = {
  getEquipment: async function (cn, func) {
    cn.query(
      "SELECT * FROM `tbl-equipment` ORDER BY `equipmentName` ASC",
      func
    );
  },

  getSpecialty: async function (cn, func) {
    cn.query(
      "SELECT * FROM `tbl-specialty` ORDER BY `specialtyName` ASC",
      func
    );
  },

  getFailure: async function (cn, func) {
    cn.query("SELECT * FROM `tbl-failure` ORDER BY `failure` ASC", func);
  },

  insertEquipment: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-equipment` (`equipmentName`) VALUES (?)",
      [data.equipmentName],
      func
    );
  },
  insertSpecialty: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-specialty` (`specialtyName`, `equipmentId`) VALUES (?, ?);",
      [data.specialtyName, data.equipmentId],
      func
    );
  },
  insertFailure: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-failure` (`failure`, `equipmentId`, `specialtyId`) VALUES (?, ?, ?);",
      [data.failure, data.equipmentId, data.specialtyId],
      func
    );
  },
  deleteEquipment: async function (cn, id, func) {
    cn.query("DELETE FROM `tbl-equipment` WHERE `id`=?", [id], func);
  },
  deleteSpecialty: async function (cn, id, func) {
    cn.query("DELETE FROM `tbl-specialty` WHERE `id`=?", [id], func);
  },
  deleteFailure: async function (cn, id, func) {
    cn.query("DELETE FROM `tbl-failure` WHERE `id`=?", [id], func);
  },
  updateEquipment: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-equipment` SET `equipmentName`=? WHERE `id`=?",
      [data.equipmentName, data.id],
      func
    );
  },
  updateSpecialty: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-specialty` SET `specialtyName`=? WHERE `id`=?",
      [data.specialtyName, data.id],
      func
    );
  },
  updateFailure: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-failure` SET `failure`=? WHERE `id`=?",
      [data.failure, data.id],
      func
    );
  },

  getVessel: async function(cn, func){
    cn.query("SELECT * from `tbl-vessel` ORDER BY `vessel` ASC", func)
  },

  insertVessel: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-vessel` (`vessel`, `vesselId`) VALUES (?, ?);",
      [data.vessel, data.vesselId],
      func
    );
  },
  deleteVessel: async function (cn, id, func) {
    cn.query("DELETE FROM `tbl-vessel` WHERE `id`=?", [id], func);
  },
};
