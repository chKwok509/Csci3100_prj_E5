import { Server } from 'Socket.IO'

class game {
  player1: 1;
  player2: 2;
  board: number[][];
  currentPlayer: number;
  constructor() {
    this.board = Array(19).fill(0).map(() => Array(19).fill(0));
    this.currentPlayer = 1;
  }
  makeMove(row: number, col: number) {
    // Check if the move is valid
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col] !== 0) {
      throw new Error('Invalid move');
    }

    // Place the piece
    this.board[row][col] = this.currentPlayer;

    // Check for a winner
    const winner = this.checkWinner();
    console.log(winner);
    if (winner === 1) {
      return 3; // Return the winner
    } else if (winner === 2) {
      return 4; // Return the winner
    }

    // No winner, so change the turn to the other player
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    return this.currentPlayer;
  }
  checkWinner(): number | null {
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

    const N = this.board.length;
    const M = this.board[0].length;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (this.board[i][j] !== 0) {
          for (const [dx, dy] of directions) {
            let x = i, y = j, count = 0;
            while (x >= 0 && x < N && y >= 0 && y < M && this.board[x][y] === this.board[i][j]) {
              x += dx;
              y += dy;
              count++;
            }
            if (count >= 5) {
              return this.board[i][j]; // return the winner
            }
          }
        }
      }
    }

    return null; // no winner
  }
  updateBoard(board: number[][], x: number, y: number, player: number) {
    board[x][y] = player;
    return board;
  }


  getBoard() {
    return this.board;
  }
}
const GobangGame = new game();
const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let player1: any;
    let player2: any;
    let nextPlayer = 1;

    io.on('connection', (socket) => {
      console.log("Client connected with id: " + socket.id)
      if (!player1) {
        player1 = socket
      } else if (!player2) {
        player2 = socket
      }
      socket.on('move', ({ Xpos, Ypos }) => {
        console.log('Move made at', Xpos, Ypos)
        if (socket === player1 && GobangGame.currentPlayer === GobangGame.player1) {
          nextPlayer = GobangGame.makeMove(Ypos, Xpos)
          if (nextPlayer === 3) {
            player1.emit('winner', { winner: 1 })
            player2.emit('winner', { winner: 1 })
          } else if (nextPlayer === 4) {
            player1.emit('winner', { winner: 2 })
            player2.emit('winner', { winner: 2 })
          } else {
            GobangGame.updateBoard(GobangGame.getBoard(), Xpos, Ypos, GobangGame.player1)
            const board = GobangGame.getBoard()
            GobangGame.currentPlayer = GobangGame.player2
            player2.emit('move', { Xpos, Ypos, board })
          }
        } else if (socket === player2 && GobangGame.currentPlayer === 2)
          nextPlayer = GobangGame.makeMove(Ypos, Xpos)
          if (nextPlayer === 3) {
            player1.emit('winner', { winner: 1 })
            player2.emit('winner', { winner: 1 })
          } else if (nextPlayer === 4) {
            player1.emit('winner', { winner: 2 })
            player2.emit('winner', { winner: 2 })
          } else {
            GobangGame.updateBoard(GobangGame.getBoard(), Xpos, Ypos, GobangGame.player2)
            const board = GobangGame.getBoard()
            GobangGame.currentPlayer = 1
            player1.emit('move', { Xpos, Ypos, board })
          }
        });
      socket.on('disconnect', () => {
        console.log("Client disconnected with id: " + socket.id)
      });
    });
  }
  res.end()
}

export default SocketHandler