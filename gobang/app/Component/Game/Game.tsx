import { useState, useEffect } from 'react';
import styles from './game.module.css';
import io from 'Socket.IO-client';
import { useRouter } from 'next/navigation';
import { rejects } from 'assert';

let socket: any;

const initialBoardState: number[][] = Array(19).fill(0).map(() => Array(19).fill(0));

export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
    const [Xpos, setX] = useState<number>(0);
    const [Ypos, setY] = useState<number>(0);
    const [winner, setWinner] = useState(0);
    const router = useRouter();

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
                socket.on('move_on_board', ({ board }: { board: number[][] }) => {
                    setBoard(board);
                });
            }
        })();
    }, []);

    const handleCellClick = (x: number, y: number) => {
        try {
            if (winner === 0) {
                console.log('Move made at', x, y);
                socket.emit('move', { x, y });
                socket.on('winplayer', ({ winplayer }: { winplayer: number }) => {
                    console.log(winplayer)

                    if (winplayer === 1) {
                        console.log('Player 1 wins');
                        alert('Player 1 wins');
                    } else if (winplayer === 2) {
                        console.log('Player 2 wins');
                        alert('Player 2 wins');
                    }
                    setWinner(1);
                });
            };
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const handleExitClick = () => {
        socket.disconnect();
        router.push('./Mainpage');
    }

    const handleRegretClick = () => {
        socket.emit('retractrequest');
        socket.on('retract', ({ currentPlayer, nextPlayer }: { currentPlayer: number, nextPlayer: number }) => {
            if (handleRegretResponse()) {
                console.log(currentPlayer, nextPlayer);
                if (currentPlayer === 1) {
                    console.log('Player 1 regrets');
                    alert('Player 1 regrets');
                } else if (currentPlayer === 2) {
                    console.log('Player 2 regrets');
                    alert('Player 2 regrets');
                }
            }
        });
    }

    const handleRegretResponse = () => {
        socket.on('retractrequestother', () => {
            if(window.confirm("Do you want to accept the regret request?")){
                socket.emit('retractresponse', {response: true});
                return true;
            }else{
                socket.emit('retractresponse', {response: false});
                return false;
            }
        });
        return false;
    }
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
            <div className={styles.bottom_left_buttons1}>
                <button className={styles.bottom_left_buttons1_button} onClick={handleRegretClick}>Regret</button>
            </div>
            <div className={styles.bottom_left_buttons2}>
                <button className={styles.bottom_left_buttons2_button}>Surrender</button>
            </div>

            <div className={styles.bottom_left_buttons3}>
                <button className={styles.bottom_left_buttons3_button} onClick={handleExitClick}>Exit</button>
            </div>
        </div>
    );
}