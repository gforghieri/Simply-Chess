
const Chess = require("chess.js").Chess;

const Game = function() {
    this.chess = new Chess();
    this.w = null;  // w and b will keep a reference to the websocket object of the player who plays white / black
    this.b = null; 
};

Game.prototype.getOpponent = function(myPlayColor) {
    return this[myPlayColor == 'w' ? 'b' : 'w'];
};

module.exports = Game;