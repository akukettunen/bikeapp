const express = require('express')
      app = express()
      bodyParser = require('body-parser')
      cors = require('cors')
      require("dotenv").config()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const trips = require('./routes/trips.js');
const stations = require('./routes/stations.js');

app.use(cors())

app.use('/trips', trips);
app.use('/stations', stations);

module.exports = app;