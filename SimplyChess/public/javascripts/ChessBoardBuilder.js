
/**
 * This JS script builds the chessboard and its basic functionality.
 * It exposes a supersimple API:
 * When a piece is moved, the event 'onPieceMoved' is fired on the document.
 * The event object contains the details attribute which contains the origin and the destination of the moved piece.
 */


let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let chessBoard = document.getElementById('chess-board');

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

let pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

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
    piece.src = '/images/chesspieces/' + color + '-' + pieceName +  '.png';
    piece.addEventListener('dragstart', drag);
    return piece;
}


let draggedEl;
function drag(ev) {
    ev.dataTransfer.setData('origin', ev.target.parentElement.id);
    draggedEl = ev.target;
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.appendChild(draggedEl);
    leave(ev);

    let origin = ev.dataTransfer.getData('origin');
    let destination = ev.currentTarget.id;

    if (origin !== destination) {

        document.dispatchEvent(new CustomEvent('onPieceMoved', {detail: {
            origin: origin,
            destination: destination
        }}));
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
