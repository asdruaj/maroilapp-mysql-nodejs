module.exports = {
  getUsers: async function (cn, func) {
    cn.query("SELECT * FROM `tbl-users`", func);
  },

  insertUser: async function (cn, data, func) {
    cn.query(
      "INSERT INTO `tbl-users` (`name`, `username`, `password`, `role`) VALUES (?, ?, ?, ?)",
      [data.name, data.username, data.password, data.role],
      func
    );
  },

  deleteUser: function (cn, id, func) {
    cn.query("DELETE FROM `tbl-users` WHERE id=?", [id], func);
  },

  returnIdData: async function (cn, id, func) {
    cn.query("SELECT * FROM `tbl-users` WHERE id=?", [id], func);
  },

  updateUser: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-users` SET `name`=?, `username`=?, `password`=?, `role`=? WHERE `id`=?",
      [data.name, data.username, data.password, data.role, data.id],
      func
    );
  },

  updateProfile: async function (cn, data, func) {
    cn.query(
      "UPDATE `tbl-users` SET `username`=?, `password`=? WHERE `id`=?",
      [data.username, data.password, data.id],
      func
    );
  },
};
