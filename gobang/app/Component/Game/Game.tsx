import { useState, useEffect } from 'react';
import makemove from './makemove';
import styles from './game.module.css';
import io from 'Socket.IO-client';
let socket: any;

const initialBoardState: number[][] = Array(19).fill(0).map(() => Array(19).fill(0));

export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState(0);

    useEffect(() => {
        (async () => {
            // @ts-ignore
            if (!window.connected) {
                // @ts-ignore
                window.connected = true;
                await fetch('/api/socket')
                socket = io()
                socket.on('connect', () => {
                    console.log('Connected to server with id: ' + socket.id)
                });
                socket.on('move', ({ board, currentPlayer }: { board: number[][], currentPlayer: 'X' | 'O' }) => {
                    setBoard(board);
                    setCurrentPlayer(currentPlayer);
                });
            }
        })();
    }, []);

    const handleCellClick = (x: number, y: number) => {
        try {
            if(winner === 0){
                const nextPlayer = makemove(board, setBoard, y, x, currentPlayer === 'X' ? 1 : 2);
                if (nextPlayer === null) {
                    alert('Invalid move');
                    return;
                }
                else if (nextPlayer === 3) {
                    alert('Player 1 wins');
                    setWinner(() => 1);
                    return;
                }
                else if (nextPlayer === 4) {
                    alert('Player 2 wins');
                    setWinner(() => 1);
                    return;
                }
                const newPlayer = nextPlayer === 1 ? 'X' : 'O';
                setCurrentPlayer(nextPlayer === 1 ? 'X' : 'O');
                socket.emit('move', { board, currentPlayer: newPlayer });
            };
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <div>

            {board.map((row, y) => (
                <div key={y}>
                    {row.map((cell, x) => (
                        <button className={styles.button} key={x} onClick={() => handleCellClick(x, y)}>
                            {cell === 1 ? 'X' : cell === 2 ? 'O' : '_'}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}