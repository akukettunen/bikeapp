const mysql = require('mysql');
const db_config = require('../config/db.config.js')

// Create connection
let conf = {
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: '3307'
}

console.log(conf)

const connect = () => {
  const db = mysql.createConnection(db_config)

  return db
}

module.exports = { connect }