
var socket = new WebSocket("ws://localhost:3000");

// socket.onmessage = function(event){
//     console.log(event.data);
//     let recievedMessage = JSON.parse(event.data);

//     if(recievedMessage.type === Messages.T_GAME_START) {

//         document.getElementById('modal').style.display = "none";
//         chessBoard = new ChessBoard(onPieceMoved);

//         let color = recievedMessage.playColor;
//         chessBoard.setPlayColor(color);

//         if (color === Messages.COLOR_WHITE)
//             chessBoard.allowMovement();
//     }
// }