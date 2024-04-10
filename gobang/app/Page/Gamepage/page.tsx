'use client'
import { useState } from 'react';
import styles from './gamepage.module.css';
import Game from '@/app/Component/Game/Game';
import { useRouter } from 'next/navigation';
import Timer from '@/app/Component/Game/timer';
import SystemTime from '@/app/Component/Game/systemtime';

export default function Gamepage() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

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

    return (
        <body>
            <div className={styles.player_info}>
                <p>Player 1</p>
                <p>vs</p>
                <p>Player 2</p>
                <SystemTime />
                <Timer />
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
            <div className={styles.boardpost}>
                <div id="chess-board">
                    <Game />
                </div>
            </div>
        </body>
    );
}