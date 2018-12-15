const express = require("express");
const http = require("http");
const websocket = require("ws");
const Chess = require("chess.js").Chess;
const Messages = require('./public/javascripts/messages.js');

//const port = process.argv[2] || 3000;
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/gameScreen.html');
});

const wss = new websocket.Server({server});

// games is the object containing all the games that are in progress
// the key is the gameId of each game, the value is a gameObj.
let games = {}; 

// example gameObj:
// gameObj = {
// 	chess: new Chess(),
// 	w: // ws object of white player
// 	b: // ws object of black player
// 	getOpponent: function(myPlayColor) {
// 		return this[myPlayColor == 'w' ? 'b' : 'w'];
// 	}
// };

let nextGameId = 0;

wss.on('connection', function(ws) {

  ws.gameId = nextGameId;
  if (games.hasOwnProperty(nextGameId)) {
    // if this is the case, this game is currently waiting for a partner
    nextGameId++;
    // the second player always plays black
    ws.playColor = 'b';

    games[ws.gameId].b = ws;
    startGame(games[ws.gameId]);

  } else {
    games[ws.gameId] = {
      chess: new Chess(),
      w: ws,
      b: null,
      getOpponent: function(myPlayColor) {
        return this[myPlayColor == 'w' ? 'b' : 'w'];
      }
    }
    // the first player always plays white
    ws.playColor = 'w';
  }

  ws.on('message', function(message) {
      let msg = JSON.parse(message);
      console.log(msg);
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
          
          if (game.chess.in_checkmate()) {
            let obj = Messages.O_GAME_END;
            obj.result = Messages.GAME_WON;
            ws.send(JSON.stringify(obj));
            obj.result = Messages.GAME_LOST;
            game.getOpponent(ws.playColor).send(JSON.stringify(obj));
          } else if (game.chess.in_stalemate()) {
            let obj = Messages.O_GAME_END;
            obj.result = Messages.GAME_DRAW;
            ws.send(JSON.stringify(obj));
            game.getOpponent(ws.playColor).send(JSON.stringify(obj));
          }
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
}




server.listen(port);