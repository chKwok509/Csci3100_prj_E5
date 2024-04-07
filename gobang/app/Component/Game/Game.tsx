import { useState } from 'react';
import makemove from './makemove';
import styles from './game.module.css';

const initialBoardState: number[ ][ ] = Array(19).fill(0).map(() => Array(19).fill(0));

export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

    const handleCellClick = (x: number, y: number) => {
        try {
            const nextPlayer = makemove(board, y, x, currentPlayer === 'X' ? 1 : 2);
            if (nextPlayer === null) {
                alert('Invalid move');
                return;
            }
            else if (nextPlayer === 3){
                alert('Player 1 wins');
                return;
            }
            else if (nextPlayer === 4){
                alert('Player 2 wins');
                return;
            }
            setCurrentPlayer(nextPlayer === 1 ? 'X' : 'O');
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const resetBoard = () => {
        setBoard(initialBoardState);
        setCurrentPlayer('X');
    };

    return (
        <div>
            <button onClick={resetBoard}>Reset Board</button>
            {board.map((row, y) => (
                <div key={y}>
                    {row.map((cell, x) => (
                        <button className={styles.button} key={x} onClick={() => handleCellClick(x, y)}>
                            {cell === 1 ? 'X' : cell === 2 ? 'O' : '.'}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}