'use client'
import { useState } from 'react';
import styles from './gamepage.module.css';
import Game from '@/app/Component/Game/Game';
import { useRouter } from 'next/navigation';
import Timer from '@/app/Component/Game/timer';
import SystemTime from '@/app/Component/Game/systemtime';
import io from 'socket.io-client';


export default function Gamepage() {
    const router = useRouter();

    return (
        <body>
            <div className={styles.player_info}>
                <p>Player 1</p>
                <p>vs</p>
                <p>Player 2</p>
                <SystemTime />
                <Timer />
            </div>

            <div className={styles.boardpost}>
                <div id="chess-board">
                    <Game />
                </div>
            </div>
        </body>
    );
}