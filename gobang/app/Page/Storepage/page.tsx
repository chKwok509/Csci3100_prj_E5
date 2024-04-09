import React from 'react';
import styles from './storepage.module.css';
import Image from 'next/image';
import mainimage from '../../../public/Store.png';
import playericon from '../../../public/meme.png';
import skin from '../Storepage/skin/skin1.svg'


export default function StorePage() {
  return (
    <body className={styles.body}>
      <div className={styles.center_image}>
        <Image src={mainimage} alt="Main Image" className={styles.center_image_img} />
      </div>
      <div className={styles.container}>
        <div className={styles.boxRow}>
          <div className={styles.box}>
            <div className={styles.skins}><Image src={skin} alt="SVG Image" width={160} height={160} /></div>
            <p className={styles.description}>Green Board</p>
            <p className={styles.description}>Price: $100</p>
      
          </div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
        <div className={styles.boxRow}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
    </body>
  );
}