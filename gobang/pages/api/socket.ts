import { Server } from 'Socket.IO'


const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let player1: any;
    let player2: any;


    io.on('connection', (socket) => {
      console.log("Client connected with id: " + socket.id)
      if (!player1) {
        player1 = socket
      } else if (!player2) {
        player2 = socket
      }
      socket.on('move', ({ board, currentPlayer }) => {
        if (socket === player1){
          player2.emit('move', { board, currentPlayer })
        } 
        if (socket)
        socket.broadcast.emit('move', { board, currentPlayer })
      });
      socket.on('disconnect', () => {
        console.log("Client disconnected with id: " + socket.id)
      });
    });
  }
  res.end()
}

export default SocketHandler