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

  valid = valid && isIsoDate(dep_t)
  valid = valid && isIsoDate(ret_t)
  valid = valid && isInt(dep_station_id)
  valid = valid && isString(dep_station_name)
  valid = valid && isInt(ret_station_id)
  valid = valid && isString(ret_station_name)
  valid = valid && isInt(distance)
  valid = valid && isInt(duration)

  // Dont import short trips ( under 10m or 10s )
  valid = valid && parseInt(distance) > 10
  valid = valid && parseInt(duration) > 10

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

  valid = valid && isInt(fid)
  valid = valid && isInt(id)
  valid = valid && isString(name_fi)
  valid = valid && isString(name_sv)
  valid = valid && isString(name_en)
  valid = valid && isString(addr)
  valid = valid && isString(addr_en)
  valid = valid && isString(city_fi, true)
  valid = valid && isString(city_sv, true)
  valid = valid && isString(operator, true)
  valid = valid && isInt(capacity)

  return valid
}

module.exports = { isIsoDate, isInt, isString, validateTrip, validateStation }