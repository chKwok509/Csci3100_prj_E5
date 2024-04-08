import { useState, useEffect } from 'react';
import styles from './game.module.css';
import io from 'Socket.IO-client';
import { set } from 'mongoose';
let socket: any;

const initialBoardState: number[][] = Array(19).fill(0).map(() => Array(19).fill(0));

export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
    const [Xpos, setX] = useState<number>(0);
    const [Ypos, setY] = useState<number>(0);
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
                socket.on('move', ({x, y, board}: {x: number, y: number, board: number[][]}) => {
                   setBoard(board); 
                });
            }
        })();
    }, []);

    const handleCellClick = (x: number, y: number) => {
        try {
            if(winner === 0){
                setX(x);
                setY(y);
                socket.emit('move', { Xpos, Ypos });
                socket.on('winner', ({ winner }: { winner: number }) => {
                    setWinner(winner);
                });
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