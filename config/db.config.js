module.exports = {
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_DOCKER_PORT,
}