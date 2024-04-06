window.onload = function() {
// Get the chess board element
const chessBoard = document.getElementById('chess-board');

// Generate the grid cells
for (let i = 0; i < 19 * 19; i++) {
    const cell = document.createElement('div');
    chessBoard.appendChild(cell);
}
};