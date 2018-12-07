
/**
 * This JS script builds the chessboard and its basic functionality.
 * It exposes a supersimple API:
 *      - Initialize the board by calling 
 *          let chessBoard = new ChessBoard(onPieceMovedCallback);
 *      - Make sure to specify a callback function in the constructor. This function will
 *        be called whenever the user moved a piece. It will be called with as its only parameter a moveObj.
 *        A moveObj has this form: let moveObj = {
 *                                      origin: 'H6',
 *                                      destination: 'G5'
 *                                 }
 *      - chessBoard.setPlayColor(color) must be called once before the game starts. 
 *        Parameter color must be 'white' or 'black'.
 *      - chessBoard.movePiece(moveObj) will move a piece according to the moveObj.
 *      - chessBoard.undoMove() will undo the latest move. 
 *      - chessBoard.allowMovement() will allow the player to make a move with his color.
 *
 */

function ChessBoard(OnPieceMovedCallback) {

    //////////////////////////////////////////////////
    /* This part is concerned with drawing the board */
    //////////////////////////////////////////////////

    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const chessBoard = document.getElementById('chess-board');

    for (let i = 8; i > 0; i--) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row-' + i;

        columns.forEach(function(col) {
            let square = document.createElement('div');
            square.className = 'square';
            square.id = col + i;
            square.addEventListener('drop', drop);
            square.addEventListener('dragover', dragOver);
            square.addEventListener('dragenter', enter);
            square.addEventListener('dragleave', leave);

            row.appendChild(square);
        })

        chessBoard.appendChild(row);
    }

    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    // build all black pieces (except pawns)
    document.getElementById('row-8').childNodes.forEach(function(el, index) {
        el.appendChild(buildPiece(pieces[index], 'black'));
    });

    // build all white pieces (except pawns)
    document.getElementById('row-1').childNodes.forEach(function(el, index) {
        el.appendChild(buildPiece(pieces[index], 'white'));
    });

    // build all black pawns
    document.getElementById('row-7').childNodes.forEach(function(el, index) {
        el.appendChild(buildPiece('pawn', 'black'));
    });

    // build all white pawns
    document.getElementById('row-2').childNodes.forEach(function(el, index) {
        el.appendChild(buildPiece('pawn', 'white'));
    });

    function buildPiece(pieceName, color) {
        let piece = document.createElement('img');
        piece.className = 'piece';
        piece.setAttribute('data-color', color);
        piece.src = '/images/chesspieces/' + color + '-' + pieceName +  '.png';
        piece.addEventListener('dragstart', drag);
        return piece;
    }


    /////////////////////////////////////////////////////////////////////////
    /* This part is concerned with operations on the board during the game */
    /////////////////////////////////////////////////////////////////////////

    let playColor;
    let movingIsAllowed = false;
    let lastMoveDeletedPiece = null;
    let lastMove = {
        origin: '',
        destination: '',

    };

    function drag(ev) {

        if (movingIsAllowed && ev.target.getAttribute('data-color') === playColor) {
            ev.dataTransfer.setData('origin', ev.target.parentElement.id);
            movingIsAllowed = false;
        } else {
            ev.preventDefault();
        }
    }

    function drop(ev) {
        ev.preventDefault();
        leave(ev);

        let origin = ev.dataTransfer.getData('origin');
        let destination = ev.currentTarget.id;

        if (origin !== destination) {
            movePiece({
                origin: origin,
                destination: destination
            })
            OnPieceMovedCallback(lastMove);
        } else {
            movingIsAllowed = true;
        }
    }

    function enter(ev) {
        ev.currentTarget.style.border = '2px black solid';
    }

    function leave(ev) {
        ev.currentTarget.style.border = '';
    }

    function dragOver(ev) {
        ev.preventDefault();
    }

    function movePiece(moveObj) {
        let piece = document.getElementById(moveObj.origin).firstChild;
        let destSquare = document.getElementById(moveObj.destination);
        lastMoveDeletedPiece = null;

        if(destSquare.hasChildNodes()) {
            lastMoveDeletedPiece = destSquare.firstChild;
            lastMoveDeletedPiece.remove();
        }

        document.getElementById(moveObj.destination).appendChild(piece);
        lastMove = moveObj;
    }

    return {
        movePiece: function (moveObj) {
            movePiece(moveObj);
        },
        undoMove: function() {
            if (lastMoveDeletedPiece) {
                document.getElementById(lastMove.destination).appendChild(lastMoveDeletedPiece);
            }
            this.movePiece({
                origin: lastMove.destination,
                destination: lastMove.origin
            });
            movingIsAllowed = true;
        },
        allowMovement: function() {
            movingIsAllowed = true;
        },
        setPlayColor: function(color) {
            playColor = color;
        }
    }
}

window.onload = function () {
    document.getElementById('button').onclick = function () {
        document.getElementById('modal').style.display = "none"
    };
};