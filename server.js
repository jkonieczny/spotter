// Require our dependencies
var express = require('express'),
	http	= require('http'),
	slashes = require('connect-slashes');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

app.use("/spotter", express.static(__dirname + "/public/index.html"));
// Set /public as our static content dir
app.use("/page/*", express.static(__dirname + "/public/index.html"));
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});
