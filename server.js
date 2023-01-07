const app = require('./app')

app.listen(port, process.env.IP, function() {
  console.log("Server started at port " + port)
});