export default function checkWinner(board: number[][]): number | null {
    const directions = [
        [0, -1], // 上
        [0, +1], // 下
        [-1, 0], // 左
        [+1, 0], // 右
        [-1, -1], // 左上
        [+1, +1], // 右下
        [+1, -1], // 右上
        [-1, +1], // 左下
    ];
  
    const N = board.length;
    const M = board[0].length;
  
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] !== 0) {
          for (const [dx, dy] of directions) {
            let x = i, y = j, count = 0;
            while (x >= 0 && x < N && y >= 0 && y < M && board[x][y] === board[i][j]) {
              x += dx;
              y += dy;
              count++;
            }
            if (count >= 5) {
              return board[i][j]; // return the winner
            }
          }
        }
      }
    }
  
    return null; // no winner
  }