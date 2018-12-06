
let chessBoard = new ChessBoard(onPieceMoved);

chessBoard.setPlayColor('white');
chessBoard.allowMovement();


function onPieceMoved(moveObj) {
    console.log(moveObj);
}
