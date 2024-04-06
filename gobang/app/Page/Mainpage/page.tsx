'use client'
import Image from 'next/image';
import styles from './mainpage.module.css';
import mainimage from '../../../public/2.png';
import playericon from '../../../public/meme.png';
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
        <button className={styles.button} onClick={() => alert('PVP')}>PVP</button>
        <button className={styles.button} onClick={() => alert('PVC')}>PVC</button>
        <button className={styles.button} onClick={() => alert('Store')}>Store</button>
        <button className={styles.button} onClick={() => alert('Quit')}>Community</button>
        <button className={styles.button} onClick={() => confirm("Quit?") && router.push("/")}>Quit</button>
        <div className={styles.version}>V0.0.0</div>
        </body>
    );
}