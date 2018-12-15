
const socket = new WebSocket("ws://simplychess.azurewebsites.net:8080");
let chessBoard;

socket.onmessage = startGameMsgHandler;

function startGameMsgHandler(event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    if(msg.type === Messages.T_GAME_START) {

        document.getElementById('modal').style.display = "none";
        chessBoard = new ChessBoard(onPieceMoved);

        let color = msg.playColor;
        chessBoard.setPlayColor(color);

        if (color === Messages.COLOR_WHITE) {
            chessBoard.allowMovement();
            socket.onmessage = moveVerifier;
        } else {
            // player is plays black
            socket.onmessage = gamePlayMsgHandler;
        }

    }
}

function moveVerifier(event) {
    console.log(event.data);
    if (event.data === Messages.ILLEGAL_MOVE) {
        chessBoard.undoMove();
    } else if (event.data === Messages.LEGAL_MOVE) {
        socket.onmessage = gamePlayMsgHandler;
    }
}

function gamePlayMsgHandler(event) {

    let msg = JSON.parse(event.data);
    console.log(msg);

    console.log(Messages.T_MOVE);
    switch(msg.type) {
        case Messages.T_MOVE:
            chessBoard.movePiece({
                origin: msg.from,
                destination: msg.to
            })
            chessBoard.allowMovement();
            break;
        case Messages.T_GAME_END:
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