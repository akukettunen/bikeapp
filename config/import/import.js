const fs = require('fs')
const readline = require('readline')
const mysql = require('mysql')
const { isIsoDate, isInt, isString, validateTrip, validateStation } = require('./importHelpers.js')
require('dotenv').config()

console.log('Starting data import...')

// Configure the mysql connection
const conf = {
  host: 'localhost',
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_DOCKER_PORT
}

console.log(conf)

let connection = mysql.createPool(conf);

const parseFiles = async (fileName, isStations) => {
  /*
    Input: path of the file parsed
    Output: [ true | false ] whether the line was valid and added to db

    This function parses and validates the csv-file and adds
    its valid rows to database
  */
  console.log(`Validating data on file ${fileName}`)

  const readStream = fs.createReadStream(fileName)
  let rl = readline.createInterface({ input: readStream, crlfDelay: Infinity })
  let lines = 0
  let validLines = []

  for await (const line of rl) {
    const vals = line.split(',')
    const isValid = isStations ? validateStation(vals) : validateTrip(vals);

    if(isValid) {
      validLines.push(vals)
    }

    lines++
  }
  
  console.log(`File contained ${lines} lines`)
  console.log(`Valid were ${validLines.length}`)
  console.log(`Adding lines to db`)

  if(isStations) addToDbStation(validLines)
  else addToDb(validLines)

  return
}

const addToDb = (values) => {
  console.log(values.length)
  connection.query(`
    INSERT INTO trips( departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, distance, duration )
    VALUES ?;
  `,
  [values.slice(0, 1000)]
  , (error, results, fields) => {
    if (error) throw error;
    console.log('Added to db!');
  });
}

const addToDbStation = (values) => {
  connection.query(`
    INSERT INTO stations( fid, id, name_fi, name_sv, name_en, addr_fi, addr_en, city_fi, city_sv, operator, capacity, x, y )
    VALUES ?;
  `,
  [values]
  , (error, results) => {
    if (error) throw error;
    console.log('Added to db!');
  });
}

addFiles = async () => {
  await parseFiles('data/stations.csv', true)
  await parseFiles('data/trips_05.csv', false)
  await parseFiles('data/trips_06.csv', false)
  await parseFiles('data/trips_07.csv', false)

  connection.end()
}

addFiles()

module.export = { isIsoDate, isInt, isString }
