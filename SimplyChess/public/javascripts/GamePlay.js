//const socket = new WebSocket("wss://simplychess.azurewebsites.net");
const socket = new WebSocket("ws://localhost:3000");
let chessBoard;

socket.onmessage = startGameMsgHandler;

function startGameMsgHandler(event) {
    let msg = JSON.parse(event.data);
    if (msg.type === Messages.T_GAME_START) {

        timer();

        document.getElementById('modal').style.display = "none";
        chessBoard = new ChessBoard(onPieceMoved);
        document.getElementsByClassName('timer')[0].style.visibility = "visible";
        document.getElementsByClassName('resign')[0].style.visibility = "visible";
        document.getElementsByClassName('fullscreen')[0].style.visibility = "visible";

        let color = msg.playColor;
        chessBoard.setPlayColor(color);
        alert("You are playing the " + color + " side.");

        if (color === Messages.COLOR_WHITE)
            chessBoard.allowMovement();

        socket.onmessage = gamePlayMsgHandler;
        
    }
}

function moveVerifier(event) {
    if (event.data === Messages.ILLEGAL_MOVE) {
        chessBoard.undoMove();
    } else if (event.data === Messages.LEGAL_MOVE) {
        socket.onmessage = gamePlayMsgHandler;
    }
}


function gamePlayMsgHandler(event) {

    let msg = JSON.parse(event.data);

    switch (msg.type) {
        case Messages.T_MOVE:
            chessBoard.movePiece({
                origin: msg.from,
                destination: msg.to
            })
            chessBoard.allowMovement();
            break;
        case Messages.T_GAME_END:
            switch (msg.result) {
                case Messages.GAME_WON:
                    alert('You have won the game!');
                    break;
                case Messages.GAME_LOST:
                    alert('You have lost the game!');
                    break;
                case Messages.GAME_DRAW:
                    alert('It\'s a draw!');
                    break;
            }
            window.location.replace('http://localhost:3000/');
            break;
    }
}

function onPieceMoved(moveObj) {
    let obj = Messages.O_MOVE;
    obj.from = moveObj.origin;
    obj.to = moveObj.destination;
    socket.send(JSON.stringify(obj));
    socket.onmessage = moveVerifier;
}