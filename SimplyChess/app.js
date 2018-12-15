const express = require("express");
const http = require("http");
const websocket = require("ws");
const Messages = require('./public/javascripts/messages.js');
const port = process.env.PORT || 3000;
const Game = require("./game.js");
var cookies = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({server});


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookies());

app.get('/', function (req, res) {
  let visitCount = req.cookies.visitCount;
  if(visitCount === undefined) 
    visitCount = 0;
  
  visitCount++;
  res.cookie("visitCount", visitCount);
  res.render(__dirname + '/views/splashScreen.ejs', {
    gamesPlayed: startedGames,
    playersOnline: wss.clients.size,
    daysUntilLoan: Math.floor((new Date('2018-12-23') - new Date()) / 86400000),
    visitCount: visitCount
  });
});

app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/public/gameScreen.html');
});



// games is the object containing all the games that are in progress.
// the key is the gameId of each game, the value is a gameObj (built via new Game()).
const games = {}; 

// nextGameId keeps track of the gameId that will be assigned to the next websocket that connects
let nextGameId = 0;

// startedGames keeps track of how many games have been started in total
let startedGames = 0;

wss.on('connection', function(ws) {

  // assign this new websocket a gameId
  ws.gameId = nextGameId;
  
  if (games.hasOwnProperty(nextGameId)) {
    // if this is the case, this game is currently waiting for a partner
    nextGameId++;
    // the second player always plays black
    ws.playColor = 'b';

    games[ws.gameId].b = ws;
    startGame(games[ws.gameId]);

  } else {
    games[ws.gameId] = new Game();
    games[ws.gameId].w = ws;
    // the first player always plays white
    ws.playColor = 'w';
  }

  ws.on('message', function(message) {
    try {
      let msg = JSON.parse(message);
      if (msg.type === Messages.T_MOVE) {
        let game = games[ws.gameId];
        // check whether the player moved its own color
        let piece = game.chess.get(msg.from);
        if (!piece || piece.color !== ws.playColor || !game.chess.move(msg)) {
          // piece will be null if there is no piece on the square
          // move will return null if the move was illegal
          ws.send(Messages.ILLEGAL_MOVE);
        } else {
          ws.send(Messages.LEGAL_MOVE);
          game.getOpponent(ws.playColor).send(message);
          
          // check if this move resulted in checkmate or stalemate
          if (game.chess.in_checkmate()) {
            let msg = Messages.O_GAME_END;
            msg.result = Messages.GAME_WON;
            ws.send(JSON.stringify(msg));
            msg.result = Messages.GAME_LOST;
            game.getOpponent(ws.playColor).send(JSON.stringify(msg));
          } else if (game.chess.in_stalemate()) {
            let msg = Messages.O_GAME_END;
            msg.result = Messages.GAME_DRAW;
            ws.send(JSON.stringify(msg));
            game.getOpponent(ws.playColor).send(JSON.stringify(msg));
          }
        }

      }
    } catch(e) {
      // this happens if the client sent something that was not JSON 
      // if we don't catch that the server crashes
    }
  });

  ws.on('close', function() {
    let game = games[ws.gameId];
    if (game) {      
      let opponent = game.getOpponent(ws.playColor);
      delete games[ws.gameId];
      if (opponent) {
        let msg = Messages.O_GAME_END;
        msg.result = Messages.GAME_WON;
        opponent.send(JSON.stringify(msg));
        opponent.terminate();
      }   
    }
  });
});

function startGame(gameObj) {
  let obj = Messages.O_GAME_START;
  obj.playColor = Messages.COLOR_WHITE;
  gameObj.w.send(JSON.stringify(obj));
  obj.playColor = Messages.COLOR_BLACK;
  gameObj.b.send(JSON.stringify(obj));
  startedGames++;
}

server.listen(port);