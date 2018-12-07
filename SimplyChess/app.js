var express = require("express");
var http = require("http");
var websocket = require("ws");
const messages = require('./public/javascripts/messages.js');

var port = process.argv[2] || 3000;
var app = express();

app.use(express.static(__dirname + "/public"));
server = http.createServer(app).listen(port);
  console.log('listening on *: ' + port);


const wss = new websocket.Server({ server });


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/splashScreen.html');
});