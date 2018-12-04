// var board;
// var game;

// var socket = io();

// window.onload = function () { initGame(); };
// var initGame = function () {
//     var cfg = {
//         draggable: true,
//         position: 'start',
//         onDrop: handleMove,
//     };
//     board = new ChessBoard('gameBoard', cfg);
//     game = new Chess();

// };

// // called when a player makes a move on the board UI
// var handleMove = function(source, target) {
//     var move = game.move({from: source, to: target});
    
//     if (move === null)  return 'snapback';
//     else socket.emit('move', move);
    
// };

// // called when the server calls socket.broadcast('move')
// socket.on('move', function (msg) {
//     game.move(msg);
//     board.position(game.fen()); // fen is the board layout
// });

function allowDrop(ev) {
    ev.preventDefault();
}

let el;
function drag(ev) {
    ev.dataTransfer.setData("text", null);
    ev.dataTransfer.dropEffect = "move";
    el = ev.target;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(el);
}