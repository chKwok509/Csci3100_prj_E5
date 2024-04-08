import  checkWinner  from "./checkwinner";


export default function makeMove(board: number[][], setBoard: any, row: number, col: number, player: number): number | null {
    // Check if the move is valid
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] !== 0) {
      throw new Error('Invalid move');
    }
  
    // Place the piece
    board[row][col] = player;
    setBoard((board:any) => board.map((r:any, i:any) => r.map((c:any, j:any) => i === row && j === col ? player : c)));
  
    // Check for a winner
    const winner = checkWinner(board);
    console.log(winner);
    if (winner === 1) {
        return 3; // Return the winner
    }else if (winner === 2){
        return 4;
    }
  
    // No winner, so change the turn to the other player
    const nextPlayer = player === 1 ? 2 : 1;
    return nextPlayer;
  }