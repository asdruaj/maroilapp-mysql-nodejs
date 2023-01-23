module.exports = {
  getReport: async function (cn, func) {
    cn.query("SELECT * FROM `tbl-reports` ORDER BY `id` DESC", func);
  },

  insertReport: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-reports` (`terminal`,`vessel`, `vesselName`, `equipment`, `specialty`, `failure`, `startTime`, `endTime`, `timeElapsed`, `report`, `actionsTaken`, `status`, `user`, solution) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.terminal,
        data.vessel,
        data.vesselName,
        data.equipment,
        data.specialty,
        data.failure,
        data.startTime,
        data.endTime,
        data.timeElapsed,
        data.report,
        data.actionsTaken,
        data.status,
        data.user,
        data.solution
      ],
      func
    );
  },

  deleteReport: async function (cn, id, func) {
    await cn.query("DELETE FROM `tbl-reports` WHERE id=?", [id], func);
  },

  returnIdData: async function (cn, id, func) {
    cn.query("SELECT * FROM `tbl-reports` WHERE id=?", [id], func);
  },

  updateReport: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-reports` SET `terminal`=?, `vessel` = ?, `vesselName`=?, `equipment`=?, `specialty`=?, `failure`=?, `startTime`=?, `endTime`=?, `timeElapsed`=?, `report`=?, `actionsTaken`=?, `status`=?, `solution`=? WHERE `id`=?",
      [
        data.terminal,
        data.vessel,
        data.vesselName,
        data.equipment,
        data.specialty,
        data.failure,
        data.startTime,
        data.endTime,
        data.timeElapsed,
        data.report,
        data.actionsTaken,
        data.status,
        data.solution,
        data.id,
      ],
      func
    );
  },

  getLastReports: async function (cn, func) {
    cn.query("SELECT * FROM `tbl-reports` ORDER BY `id` DESC LIMIT 5", func);
  },
  insertRecentUpdates: async function (cn, data, func) {
    await cn.query(
      "INSERT INTO `tbl-recentupdates` (user, type, equipmentId, timestamp) VALUES (?,?,?,?) ",
      [data.user, data.type, data.equipmentId, data.timestamp],
      func
    );
  },
  getRecentUpdates: async function (cn, func) {
    cn.query(
      "SELECT * FROM `tbl-recentupdates` ORDER BY `id` DESC LIMIT 3",
      func
    );
  },
  getCount: async function (cn, func) {
    cn.query(
      "SELECT 'openReports' AS `countObject`, COUNT(if(status=0,1,null)) as `count` FROM `tbl-reports` UNION ALL select 'closedReports' AS `tbl-reports`, count(if(status=1,1,null)) as `count` from `tbl-reports` UNION ALL SELECT 'users' AS `tbl-users`, COUNT(*) FROM `tbl-users` UNION ALL SELECT 'equipment' AS `tbl-equipment`, COUNT(*) FROM `tbl-equipment`",
      func
    );
  },
};
