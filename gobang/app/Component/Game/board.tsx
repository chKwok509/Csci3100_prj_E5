import { useState } from 'react';

export default function GobangBoard(initialBoardState: any) {
    const [boardState, setBoardState] = useState(initialBoardState);
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

    const handleCellClick = (x: number, y: number) => {
        if (boardState[y][x] !== null) {
            alert('Invalid move');
            return;
        }

        const newBoardState = [...boardState];
        newBoardState[y][x] = currentPlayer;

        setBoardState(newBoardState);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    return (
        <div>
            {boardState.map((row: any[], y: number) => (
                <div key={y}>
                    {row.map((cell, x) => (
                        <button key={x} onClick={() => handleCellClick(x, y)}>
                            {cell ?? '.'}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};