const express = require("express");
const http = require("http");
const messages = require('./public/javascripts/messages.js');

console.log(messages);


const port = process.argv[2] || 3000;
const app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);
  console.log('listening on *: ' + port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/splashScreen.html');
});

