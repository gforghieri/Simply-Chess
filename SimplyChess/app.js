var express = require("express");
var http = require("http");
var websocket = require("ws");
const messages = require('./public/javascripts/messages.js');

var port = process.argv[2] || 3000;
var app = express();

app.use(express.static(__dirname + "/public"));
server = http.createServer(app);
  console.log('listening on *: ' + port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/splashScreen.html');
});


const wss = new websocket.Server({server});
wss.on('connection', function(ws) {

  setTimeout(function(){
    let message = messages.O_GAME_START;
    message.playColor = messages.COLOR_WHITE;

    ws.send(JSON.stringify(message));

  },2000)

  ws.on('message', function(message) {
    //ws.send('hello');
  });

});

server.listen(port);