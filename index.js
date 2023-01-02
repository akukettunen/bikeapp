const express = require('express')
      app = express()
      bodyParser = require('body-parser')
      require("dotenv").config()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const trips = require('./routes/trips.js');

app.use('/trips', trips);

app.get('/', (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/trips', (req, res) => {
  res.json({ok: 'trips'})
})

var port = process.env.NODE_DOCKER_PORT || 4040;
app.listen(port, process.env.IP, function() {
    console.log("Server started at port " + port)
});
