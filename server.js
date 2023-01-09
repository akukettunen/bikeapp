const app = require('./app')

var port = process.env.NODE_DOCKER_PORT || 4040;

app.listen(port, process.env.IP, function() {
  console.log("Server started at port " + port)
});