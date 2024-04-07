'use client'
import styles from './gamepage.module.css';
import Game from '@/app/Component/Game/Game';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function Gamepage(){
    const router = useRouter();
    return(
        <body>
            <div className={styles.player_info}>
                <p>Player 1</p>
                <p>vs</p>
                <p>Player 2</p>
                <div id="timer">00:00:00</div>
            </div>
            <div className={styles.bottom_left_buttons1}>
                <button className={styles.bottom_left_buttons1_button}>Regret</button>
            </div>
            <div className={styles.bottom_left_buttons2}>
                <button className={styles.bottom_left_buttons2_button}>Surrender</button>
            </div>

            <div className={styles.bottom_left_buttons3}>
                <button className={styles.bottom_left_buttons3_button} onClick={() => router.push('./Mainpage')}>Exit</button>
            </div>
            
            <div className={styles.chatroom}>
                <div className={styles.chat_history}>
                </div>
                <div className={styles.input_area}>
                    <input type="text" placeholder="Type a message..."/>
                    <button className={styles.butsend}>Send</button>
                </div>
            </div>
            <div className={styles.boardpost}>
                <div id="chess-board">
                    <Game/>
                </div>
            </div>
            
        </body>
    );
}