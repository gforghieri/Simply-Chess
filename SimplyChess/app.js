var express = require("express");
var http = require("http");


var port = process.argv[2] || 3000;
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);
  console.log('listening on *: ' + port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/splashScreen.html');
});