const fs = require('fs')
const readline = require('readline')
const mysql = require('mysql')
require('dotenv').config()

console.log('Starting data import...')

// Configure the mysql connection
const conf = {
  host: 'localhost',
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_DOCKER_PORT,
}

console.log(conf)

let connection = mysql.createConnection(conf);
connection.connect();

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

const validateTrip = (vals) => {
  /*
    Input: A trip csv line split into an array
    Output: [true | false] - is the array a valid trip
  */

  if(!vals || vals.length !== 8) return false

  const [
    dep_t,
    ret_t,
    dep_station_id,
    dep_station_name,
    ret_station_id,
    ret_station_name,
    distance,
    duration
  ] = vals

  let valid = true

  valid = isIsoDate(dep_t)
  valid = isIsoDate(ret_t)
  valid = isInt(dep_station_id)
  valid = isString(dep_station_name)
  valid = isInt(ret_station_id)
  valid = isString(ret_station_name)
  valid = isInt(distance)
  valid = isInt(duration)

  // Dont import short trips ( under 10m or 10s )
  valid = parseInt(distance) > 10
  valid = parseInt(duration) > 10

  return valid
}

const validateStation = (vals) => {
  /*
    Input: A station csv line split into an array
    Output: [true | false] - is the array a valid station
  */

  if(!vals || vals.length !== 13) return false

  const [
    fid,
    id,
    name_fi,
    name_sv,
    name_en,
    addr,
    addr_en,
    city_fi,
    city_sv,
    operator,
    capacity
  ] = vals

  let valid = true

  valid = isInt(fid)
  valid = isInt(id)
  valid = isString(name_fi)
  valid = isString(name_sv)
  valid = isString(name_en)
  valid = isString(addr)
  valid = isString(addr_en)
  valid = isString(city_fi, true)
  valid = isString(city_sv, true)
  valid = isString(operator, true)
  valid = isInt(capacity)

  return valid
}

const addToDb = (values) => {
  connection.query(`
    INSERT INTO trips( departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, distance, duration )
    VALUES (?);
  `,
  values
  , (error, results, fields) => {
    if (error) throw error;
    console.log('Added to db!');
  });
}

const addToDbStation = (values) => {

  connection.query(`
    INSERT INTO stations( fid, id, name_fi, name_sv, name_en, addr_fi, addr_en, city_fi, city_sv, operator, capacity, x, y )
    VALUES (?);
  `,
  values
  , (error, results) => {
    if (error) throw error;
    console.log('Added to db!');
  });
}


/*
Functions for validating data 
*/
const isIsoDate = (str) => {
  // Validates isoDateStrings | 2021-05-31T23:57:25

  if(!str) return false

  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) return false;

  return true;
}

const isString = (str) => {
  if(!str) return false

  return !!str && typeof str === 'string' && str.length > 0
}

const isInt = (str) => {
  if(!str) return false

  if(isNaN(str) || isNaN(parseInt(str)) ) return false

  return true
}

addFiles = async () => {
  await parseFiles('data/stations.csv', true)
  await parseFiles('data/trips_05.csv', false)
  await parseFiles('data/trips_06.csv', false)
  await parseFiles('data/trips_07.csv', false)

  connection.end();
}

addFiles()

// Let's not leave the db hanging

// TODO: unit tests for functions
