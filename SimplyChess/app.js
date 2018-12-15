const express = require("express");
const http = require("http");
const websocket = require("ws");
const messages = require('./public/javascripts/messages.js');

const port = process.argv[2] || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/gameScreen.html');
});


const wss = new websocket.Server({server});

wss.on('connection', function(ws) {

  ws.on('message', function(message) {
    console.log(ws.ID);
  });

});





server.listen(port);