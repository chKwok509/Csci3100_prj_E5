import { Server } from 'Socket.IO'
import handlePVPQueue from './match';


class game {
  board: number[][];
  currentPlayer: number;
  nextPlayer: number;
  steps: [number, number][];
  constructor() {
    this.board = Array(19).fill(0).map(() => Array(19).fill(0));
    this.currentPlayer = 1;
    this.nextPlayer = 2;
  }
  push(x: number, y: number) {
    this.steps.push([x, y]);
  }
  pop(): [number, number] {
    return this.steps.pop() as [number, number];
  }
  makeMove(row: number, col: number, player: number) {
    // Check if the move is valid
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col] !== 0) {
      alert('Invalid move');
      throw new Error('Invalid move');
    }
    console.log(player);
    // Place the piece
    this.setCurrentPlayer(player)
    this.push(row, col);
    this.updateBoard(this.board, row, col, this.currentPlayer);

    // Check for a winner
    const winner = this.checkWinner();
    if (winner === 1) {
      return 3; // Return the winner
    } else if (winner === 2) {
      return 4; // Return the winner
    }

    // No winner, so change the turn to the other player
    this.nextPlayer = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    console.log(this.currentPlayer);
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
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  setCurrentPlayer(player: number) {
    this.currentPlayer = player;
  }
  resetgame() {
    this.board = Array(19).fill(0).map(() => Array(19).fill(0));
    this.currentPlayer = 1;
    this.nextPlayer = 2;
    this.steps = [];
  }
  retractrequest(currentPlayer: number, nextPlayer: number) {
    console.log(currentPlayer, nextPlayer)
    if (currentPlayer === 1 && nextPlayer === 2) {
      let [x, y] = this.pop();
      this.updateBoard(this.board, x, y, 0);
      this.currentPlayer = 2;
      return 2;
    } else if (currentPlayer === 2 && nextPlayer === 1) {
      let [x, y] = this.pop();
      this.updateBoard(this.board, x, y, 0);
      this.currentPlayer = 1;
      return 1;
    }
  }
  getnextPlayer() {
    return this.nextPlayer;
  }
}

const GobangGame = new game();
let playersConnected = 0;
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
      socket.on('joinQueue', () => {
        console.log('can u join queue')
        console.log('Player joined the queue with id: ' + socket.id)
        handlePVPQueue(socket)
      })


      playersConnected++
      if (playersConnected === 1) {
        GobangGame.resetgame()
      }
      if (!player1) {
        player1 = socket
      } else if (!player2) {
        player2 = socket
      }
      socket.on('chat', ({ newMessage }) => {
        if (socket === player1) {
          player2.emit('chat', ({ newMessage }));
        } else if (socket === player2) {
          player1.emit('chat', ({ newMessage }));
        }
      })
      socket.on('move', ({ x, y }) => {
        if (socket === player1 && GobangGame.getCurrentPlayer() === 1) {
          nextPlayer = GobangGame.makeMove(y, x, 1)
          if (nextPlayer === 3) {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
            player1.emit('winplayer', { winplayer: 1 })
            player2.emit('winplayer', { winplayer: 1 })
          } else if (nextPlayer === 4) {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
            player1.emit('winplayer', { winplayer: 2 })
            player2.emit('winplayer', { winplayer: 2 })
          } else {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
          }
        } else if (socket === player2 && GobangGame.getCurrentPlayer() === 2) {
          nextPlayer = GobangGame.makeMove(y, x, 2)
          if (nextPlayer === 3) {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
            player1.emit('winner', { winner: 1 })
            player2.emit('winner', { winner: 1 })
          } else if (nextPlayer === 4) {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
            player1.emit('winner', { winner: 2 })
            player2.emit('winner', { winner: 2 })
          } else {
            const board = GobangGame.getBoard()
            GobangGame.setCurrentPlayer(nextPlayer)
            player1.emit('move_on_board', { board })
            player2.emit('move_on_board', { board })
          }
        } else if (socket === player1 && GobangGame.getCurrentPlayer() === 2) {
          player1.emit('not_your_turn')
        } else if (socket === player2 && GobangGame.getCurrentPlayer() === 1) {
          player2.emit('not_your_turn')
        }
      })

      socket.on('retract_request', () => {
        if (socket === player1 && GobangGame.getCurrentPlayer() === 2) {
          console.log('retract request2')
          player2.emit('retract_request_other')
        } else if (socket === player2 && GobangGame.getCurrentPlayer() === 1) {
          console.log('retract request1')
          player1.emit('retract_request_other')
        }else if (socket === player1 && GobangGame.getCurrentPlayer() === 1){
          console.log('Can not retract')
          player1.emit('noretract')
        }else if (socket === player2 && GobangGame.getCurrentPlayer() === 2){
          console.log('Can not retract')
          player2.emit('noretract')
        }
      })

      socket.on('retract_response_answer', ({ response }) => {
        if (socket === player1) {
          player2.emit('retract_response', ({ response }))
        }
        else if (socket === player2) {
          player1.emit('retract_response', ({ response }))
        }
      })

      socket.on('retract', () => {
        console.log('Now retract')
        let nowplayer = GobangGame.retractrequest(GobangGame.getCurrentPlayer(), GobangGame.getnextPlayer())
        GobangGame.setCurrentPlayer(nowplayer as number)
        player1.emit('move_on_board', { board: GobangGame.getBoard() })
        player2.emit('move_on_board', { board: GobangGame.getBoard() })
      })

      socket.on('surrender', () => {
        if (socket === player1) {
          player1.emit('surrenderwinner', { winner: 2 })
          player2.emit('surrenderwinner', { winner: 2 })
        } else if (socket === player2) {
          player1.emit('surrenderwinner', { winner: 1 })
          player2.emit('surrenderwinner', { winner: 1 })
        }
      })

      socket.on('disconnect', () => {
        console.log("Client disconnected with id: " + socket.id)
        playersConnected--
        if (playersConnected === 0) {
          player1 = null
          player2 = null
          res.end()
        }
      })
    });
  }
  res.end()
}


export default SocketHandler