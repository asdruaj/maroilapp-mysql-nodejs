var mysql = require("mysql");
const MySQLEvents = require('@rodrigogs/mysql-events');
const {DB_HOST, DB_NAME,DB_PORT,DB_USER,DB_PASSWORD} = require('./config.js')
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

const program = async () => {
  const connection = con;

  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();

  instance.addTrigger({
    name: 'TEST',
    expression: 'maroilappdb.tbl-reports',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: async (event) => { // You will receive the events here
      let updatedObject = {
        user: event.type == "DELETE"  ?  event.affectedRows[0].before.user : event.affectedRows[0].after.user,
        type: event.type,
        equipmentId: event.type == "DELETE"  ?  event.affectedRows[0].before.id : event.affectedRows[0].after.id,
        timestamp: event.timestamp,
      }
      console.log(updatedObject)
      con.query(
        "INSERT INTO `tbl-recentupdates` (user, type, equipmentId, timestamp) VALUES (?,?,?,?) ", [updatedObject.user, updatedObject.type, updatedObject.equipmentId, updatedObject.timestamp], (err, res, fields) => {
        console.log(res)
        console.log(err)
      });
    },
  });
  
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);

module.exports = con;

