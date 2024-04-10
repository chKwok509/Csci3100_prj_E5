'use client'
import Image from 'next/image';
import styles from './mainpage.module.css';
import mainimage from '../../../public/2.png';
import playericon from '../../../public/meme.png';
import Chatroom from '../../Component/Popup//Chatroom';
import { useRouter } from 'next/navigation';



export default function MainPage() {
    const router = useRouter();

    return (
        <body className={styles.body}>
            <div className={styles.center_image}>
                <Image src={mainimage} alt="Main Image" className={styles.center_image_img} width={600} height={120}/>
                </div>
            <div className={styles.playerInfo}>
                <Image src={playericon} alt="Player Icon" className={styles.playerInfo_img} width={600} height={120}/>
                <div>
                    <p className={styles.playerID}>ID: 12345</p>
                    <p className={styles.playerName}>Wilson Lui</p>
                </div>
            </div>
        <br></br>
        <button className={styles.button} onClick={() => window.location.href = '/Page/Gamepage'}>PVP</button>
        <button className={styles.button} >PVC</button>
        
        <button className={styles.button} onClick={() => router.push('/Page/Storepage')}>Store</button>
        <button className={styles.button} onClick={() => router.push('/Page/Communitypage')}>Community</button>
        <button className={styles.button} onClick={() => confirm("Quit?") && router.push('/')}>Quit</button>
        <div className={styles.version}>V0.0.0</div>
        <Chatroom/>
        </body>
    );
}