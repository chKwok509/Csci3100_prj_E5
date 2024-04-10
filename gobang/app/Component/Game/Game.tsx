import { useState, useEffect } from 'react';
import styles from './game.module.css';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';


let socket: any;

const initialBoardState: number[][] = Array(19).fill(0).map(() => Array(19).fill(0));

export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
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
                    socket.emit('join_Queue');
                });
                socket.on('move_on_board', ({ board }: { board: number[][] }) => {
                    setBoard(board);
                });
                socket.on('retract_request_other', () => {
                    console.log('Do you want to accept the regret request?');
                    if (confirm("Do you want to accept the regret request?")) {
                        socket.emit('retract_response_answer', { response: true });
                    } else {
                        socket.emit('retract_response_answer', { response: false });
                    }
                });
                socket.on('You have been matched with another player', () => {
                    console.log('You have been matched with another player');
                    if (confirm('You have been matched with another player')) {
                        socket.emit('confirmation', { response: true });
                    } else {
                        socket.emit('confirmation', { response: false });
                    }
                });
                socket.on('retractresponse', ({ response }: { response: boolean }) => {
                    console.log(response);
                    if (response) {
                        console.log('Regret accepted');
                        socket.emit('retract');
                    } else {
                        console.log('Regret denied');
                    }
                });
                socket.on('Welcome to the game room!', () => {
                    socket.emit('start_game');
                    console.log('Welcome to the game room!');
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
                socket.on('not_your_turn', () => {
                    console.log('Not your turn');
                    alert('Not your turn');
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
        try {
            socket.emit('retract_request');
        }
        catch (error) {
            alert((error as Error).message);
        }
    }

    const handleSurrenderClick = () => {
        try {
            socket.emit('surrender');
            socket.on('surrenderwinner', ({ winner }: { winner: number }) => {
                console.log(winner);
                if (winner === 1) {
                    console.log('Player 1 wins');
                    alert('Player 1 wins');
                    setWinner(0);
                } else if (winner === 2) {
                    console.log('Player 2 wins');
                    alert('Player 2 wins');
                    setWinner(0);
                }
            });
        } catch (error) {
            alert((error as Error).message);
        }
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
                <button className={styles.bottom_left_buttons2_button} onClick={handleSurrenderClick}>Surrender</button>
            </div>

            <div className={styles.bottom_left_buttons3}>
                <button className={styles.bottom_left_buttons3_button} onClick={handleExitClick}>Exit</button>
            </div>
        </div>
    );
}

//Fix1