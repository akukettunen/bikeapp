const fs = require('fs')
const readline = require('readline')

console.log('importing data...')

function parse(fileName) {
  let counter = 0

  const readStream = fs.createReadStream(fileName)
  let rl = readline.createInterface({ input: readStream })

  rl.on('line', line => {
    console.log(line)
  })
}

parse('data/trips_1.csv')

// TODO:
// Implement validating and inserting data to db