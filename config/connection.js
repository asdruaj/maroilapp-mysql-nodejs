var mysql = require("mysql");
const {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
} = require("./config.js");
var con = mysql.createPool({
  connectionLimit: 15,
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
});

con.getConnection((err) => {
  if (!err) {
    console.log("Conexión establecida");
  } else {
    console.log("Error de Conexión");
  }
});

module.exports = con;
