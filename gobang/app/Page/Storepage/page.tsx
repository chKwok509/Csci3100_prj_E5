import React from 'react';
import styles from './storepage.module.css';
import Image from 'next/image';
import mainimage from '../../../public/Store.png';
import playericon from '../../../public/meme.png';


export default function StorePage() {
    return (
        <body className={styles.body}>
            <div className={styles.center_image}>
                <Image src={mainimage} alt="Main Image" className={styles.center_image_img} />
            </div>
            
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Store</h1>
      <div className={styles.imageContainer}>
      </div>
      <p className={styles.description}>Browse and purchase items from our store.</p>
      {/* Add your store content here */}
    </div>
    </body>
  );
}