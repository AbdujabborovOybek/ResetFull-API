const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "resetfull-api",
});

db.getConnection((err, connection) => {
  if (err) return console.log(err.sqlMessage);
  connection.release();
  console.log("Connect to database successfully!");
});

module.exports = db;
