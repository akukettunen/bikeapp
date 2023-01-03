const mysql = require('mysql');
const db_config = require('../config/db.config.js')

// Create connection
let conf = {
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQLDB_DOCKER_PORT,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  connectionLimit: 20
}

const db = mysql.createPool(conf)

module.exports = { db }