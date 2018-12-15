var express = require("express");
var http = require("http");
var websocket = require("ws");
const messages = require('./public/javascripts/messages.js');
const websocket = require('ws');

const port = process.argv[2] || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/splashScreen.html');
});



let nextGameId = 0;

const wss = new websocket.Server({server});

ws.gameId = nextGameId;

wss.on('connection', function(ws) {


  
  ws.on('message', function(message) {

  });

});





server.listen(port);