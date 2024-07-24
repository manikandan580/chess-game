document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chessBoard');
    const initialBoard = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    ];

    let selectedPiece = null;
    let turn = 'white';

    function renderBoard() {
        board.innerHTML = '';
        initialBoard.forEach((row, i) => {
            row.forEach((piece, j) => {
                const square = document.createElement('div');
                square.className = (i + j) % 2 === 0 ? 'white' : 'black';
                square.innerHTML = piece;
                square.addEventListener('click', () => onSquareClick(i, j));
                board.appendChild(square);
            });
        });
    }

    function onSquareClick(i, j) {
        if (turn === 'white') {
            if (selectedPiece) {
                if (movePiece(selectedPiece, {i, j})) {
                    selectedPiece = null;
                    turn = 'black';
                    setTimeout(computerMove, 500);
                }
            } else if (initialBoard[i][j] && isWhitePiece(initialBoard[i][j])) {
                selectedPiece = {i, j};
                renderBoard();
                board.children[i * 8 + j].classList.add('selected');
            }
        }
    }

    function movePiece(from, to) {
        if (isValidMove(from, to)) {
            initialBoard[to.i][to.j] = initialBoard[from.i][from.j];
            initialBoard[from.i][from.j] = '';
            renderBoard();
            return true;
        }
        return false;
    }

    function isValidMove(from, to) {
        // Add basic move validation logic here (this is a simplified example)
        return initialBoard[from.i][from.j] && !initialBoard[to.i][to.j];
    }

    function computerMove() {
        let moves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isBlackPiece(initialBoard[i][j])) {
                    for (let x = 0; x < 8; x++) {
                        for (let y = 0; y < 8; y++) {
                            if (isValidMove({i, j}, {x, y})) {
                                moves.push({from: {i, j}, to: {x, y}});
                            }
                        }
                    }
                }
            }
        }
        if (moves.length > 0) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            movePiece(move.from, move.to);
            turn = 'white';
        }
    }

    function isWhitePiece(piece) {
        return piece && '♙♖♘♗♕♔'.includes(piece);
    }

    function isBlackPiece(piece) {
        return piece && '♟♜♞♝♛♚'.includes(piece);
    }

    renderBoard();
});
