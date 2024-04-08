export default function ResetGobangBoard(initialBoardState: any) {
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
};