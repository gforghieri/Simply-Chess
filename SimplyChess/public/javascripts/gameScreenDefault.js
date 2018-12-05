let template = ''
+'<% for (let i = 8; i > 0; i--) { %>'
+    '<div class="row">'
+       '<% columns.forEach(function(col) { %>'
+           '<div class="square" id="<%= col %><%= i %>" ondrop="drop(event)" ondragover="dragOver(event)" ondragenter="enter(event)" ondragexit="exit(event)"></div>'
+       '<% }) %>'
+    '</div>'
+'<% } %>';

let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
document.getElementById("chess-board").innerHTML = ejs.render(template, {columns: columns});

let piecesArr = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

document.getElementById("chess-board").childNodes[0].childNodes.forEach(function(el, index) {
    el.appendChild(buildPiece(piecesArr[index], 'black'));
});

document.getElementById("chess-board").childNodes[7].childNodes.forEach(function(el, index) {
    el.appendChild(buildPiece(piecesArr[index], 'white'));
});

document.getElementById("chess-board").childNodes[1].childNodes.forEach(function(el, index) {
    el.appendChild(buildPiece('pawn', 'black'));
});

document.getElementById("chess-board").childNodes[6].childNodes.forEach(function(el, index) {
    el.appendChild(buildPiece('pawn', 'white'));
});

function buildPiece(pieceName, color) {
    let piece = document.createElement(pieceName);
    piece.className = color;
    piece.draggable = "true";
    piece.addEventListener('dragstart', drag);
    return piece;
}


function dragOver(ev) {
    ev.preventDefault();
}


let el;
function drag(ev) {
    ev.dataTransfer.setData("text", null);
    el = ev.target;
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.appendChild(el);
    exit(ev);
}

function enter(ev) {
    ev.currentTarget.style.border = "2px black solid";
}

function exit(ev) {
    ev.currentTarget.style.border = "0px";
}
