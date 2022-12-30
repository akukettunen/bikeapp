const express = require('express')
      app = express()
      bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

var port = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.json({ok: 'ok'})
})

app.listen(port, process.env.IP, function() {
    console.log("Server started at port " + port)
});
