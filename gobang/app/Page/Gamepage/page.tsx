'use client'
import styles from './gamepage.module.css';
import Game from '@/app/Component/Game/Game';
import { useRouter } from 'next/navigation';
import Timer from '@/app/Component/Game/timer';
import SystemTime from '@/app/Component/Game/systemtime';
import io from 'socket.io-client';


export default function Gamepage(){
    const router = useRouter();
    return(
        <body>
            <div className={styles.player_info}>
                <p>Player 1</p>
                <p>vs</p>
                <p>Player 2</p>
                <SystemTime/>
                <Timer/>
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
