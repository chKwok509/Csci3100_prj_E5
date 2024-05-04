import { useState, useEffect } from 'react';
import styles from './game.module.css';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';

let socket: any;
let i = 0;

const initialBoardState: number[][] = Array(19).fill(0).map(() => Array(19).fill(0));
//basic game logic
export default function Game() {
    const [board, setBoard] = useState<number[][]>(initialBoardState);
    const [winner, setWinner] = useState(0);
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //Design of server-client communication
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
                    console.log('Regret request received');
                    setIsOpen(true);
                });
                socket.on('You have been matched with another player', () => {
                    console.log('You have been matched with another player');
                    if (confirm('You have been matched with another player')) {
                        socket.emit('confirmation', { response: true });
                    } else {
                        socket.emit('confirmation', { response: false });
                    }
                });
                socket.on('retract_response', ({ response }: { response: boolean }) => {
                    console.log(response);
                    if (response) {
                        console.log('Regret accepted');
                        socket.emit('retract');
                    } else {
                        console.log('Regret denied');
                    }
                });
                socket.on('chat', ({ newMessage }: { newMessage: { text: string, timestamp: string } }) => {
                    console.log(newMessage);
                });
                socket.on('not_your_turn', () => {
                    console.log('Not your turn');
                    alert('Not your turn');
                });
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
                socket.on('noretract', () => {
                    console.log('Not correct timing');
                    alert('U can not retract now');
                })
            }
        })();
    }, []);

    const handleCellClick = (x: number, y: number) => {
        try {
            if (winner === 0) {
                console.log('Move made at', x, y);
                socket.emit('move', { x, y });
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
        } catch (error) {
            alert((error as Error).message);
        }
    }

    const handleAccept = () => {
        // Handle accept logic here
        socket.emit('retract_response_answer', { response: true });
        setIsOpen(false);
    };

    const handleDecline = () => {
        // Handle decline logic here
        socket.emit('retract_response_answer', { response: false });
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSendClick = () => {
        if (inputText.trim() !== '') {
            const newMessage = {
                text: inputText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setChatHistory([...chatHistory, newMessage]);
            setInputText('');
        }
    };

    // Design the layout of the gameboard and game logic
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
            <div className={styles.chatroom}>
                <div className={styles.chat_history}>
                    {chatHistory.map((message, index) => (
                        <p key={index}>
                            <span className={styles.message}>You: {message.text}</span>
                            <span className={styles.timestamp}> {message.timestamp}</span>
                        </p>
                    ))}
                </div>
                <div className={styles.input_area}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={handleInputChange}
                    />
                    <button className={styles.butsend} onClick={handleSendClick}>
                        Send
                    </button>
                </div>
            </div>
            <div>
                {isOpen && (
                    <div className={styles.confirmation_popup}>
                        <p className={styles.confirmation_popup_p}>1. Do you want to accept the regret request?</p>
                        <br></br>
                        <button onClick={handleAccept} className={styles.confirmation_button}>Yes</button>
                        <button onClick={handleDecline} className={styles.confirmation_button}>No</button>
                    </div>
                )}
            </div>
        </div>
    );
}
