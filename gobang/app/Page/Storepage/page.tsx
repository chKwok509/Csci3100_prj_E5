'use client'
import React,{useState} from 'react';
import styles from './storepage.module.css';
import Image from 'next/image';
import mainimage from '../../../public/Store.png';
import playericon from '../../../public/meme.png';
import { useRouter } from 'next/navigation';


export default function StorePage() {
    const router = useRouter();
    const [coin,setcoin]=useState(777);
    const [owned,setowned]=useState<string[]>([]);
    const items = ["Board1","Board2","Board3","Board4"];


    const handleBuyItem=(item:string)=>{
      if(coin>100 && !(owned.includes(item))){
        setcoin(coin-100);
        setowned(owned.push(item));
      }
    }
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
      <div>Remaining coins: {coin}</div>
      {/* Add your store content here */}
      <div className={styles.storeitems}>
      {items.map((item) => (
            <div key={item}>
              {item}
              <button className={styles.buybutton} onClick={()=>{handleBuyItem(item)}}>Buy</button>
            </div>
          ))}
      </div>
      
    </div>
    
    <button className={styles.backbutton} onClick={()=>router.back()}>Back</button>
    </body>
  );
}