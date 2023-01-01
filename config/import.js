const fs = require('fs')
const readline = require('readline')

console.log('importing data...')

const parseTrips = fileName => {
  /*
    Input: path of the file parsed
    Output: [ true | false ] whether the line was valid and added to db

    This function parses and validates the csv-file and adds
    its valid rows to database
  */
  let trips_total = 0
  let trips_denied = 0

  const readStream = fs.createReadStream(fileName)
  let rl = readline.createInterface({ input: readStream })

  rl.on('line', line => {
    const vals = line.split(',')

    trips_total++

    const isValid = validateTrip(vals)

    if(isValid) {
      addToDb(vals)
    } else {
      trips_denied++
    }
  })
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


const addToDb = (line) => {

}

parseTrips('data/trips_05.csv')

// TODO: unit tests for functions
