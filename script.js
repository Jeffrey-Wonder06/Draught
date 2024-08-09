const board = document.getElementById('board');
const squares = [];
const pieces = [];
const rows = 8;
const cols = 8;
let currentPlayer = 'red';

// Initialize board
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const square = document.createElement('div');
        square.className = 'square ' + ((row + col) % 2 === 0 ? 'light' : 'dark');
        square.dataset.row = row;
        square.dataset.col = col;
        board.appendChild(square);
        squares.push(square);
    }
}

// Initialize pieces
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        if ((row + col) % 2 !== 0 && (row < 3 || row > 4)) {
            const piece = document.createElement('div');
            piece.className = 'piece ' + (row < 3 ? 'red' : 'black');
            piece.draggable = true;
            piece.dataset.row = row;
            piece.dataset.col = col;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragend', dragEnd);
            squares[row * cols + col].appendChild(piece);
            pieces.push(piece);
        }
    }
}

// Drag and drop functions
function dragStart(e) {
    e.dataTransfer.setData('text', `${this.dataset.row},${this.dataset.col}`);
}

function dragEnd(e) {
    const [fromRow, fromCol] = e.dataTransfer.getData('text').split(',').map(Number);
    const toSquare = document.elementFromPoint(e.clientX, e.clientY);
    const toRow = Number(toSquare.dataset.row);
    const toCol = Number(toSquare.dataset.col);

    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
        movePiece(fromRow, fromCol, toRow, toCol);
        if (toRow === 0 && currentPlayer === 'red' || toRow === 7 && currentPlayer === 'black') {
            promoteToKing(toRow, toCol);
        }
        currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Basic move validation: diagonal and adjacent squares
    const fromSquare = squares[fromRow * cols + fromCol];
    const toSquare = squares[toRow * cols + toCol];
    return (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1) && toSquareEmpty(toRow, toCol);
}

function toSquareEmpty(row, col) {
    return !squares[row * cols + col].hasChildNodes();
}

function movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = squares[fromRow * cols + fromCol].removeChild(squares[fromRow * cols + fromCol].firstChild);
    squares[toRow * cols + toCol].appendChild(piece);
    piece.dataset.row = toRow;
    piece.dataset.col = toCol;
}

function promoteToKing(row, col) {
    const piece = squares[row * cols + col].firstChild;
    piece.classList.add('king');
}
