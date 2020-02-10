const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'timesheet',
  port: 3306
});
con.connect();


module.exports = con;