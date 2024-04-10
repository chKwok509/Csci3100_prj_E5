'use client';
import React, { useState, useEffect } from 'react';
import styles from './storepage.module.css';
import Image from 'next/image';
import mainimage from '../../../public/Store.png';
import playericon from '../../../public/meme.png';
import skin1 from '../Storepage/skin/skin1.svg';
import skin2 from '../Storepage/skin/skin2.svg';
import skin3 from '../Storepage/skin/skin3.svg';
import skin4 from '../Storepage/skin/skin4.svg';
import skin5 from '../Storepage/skin/skin5.svg';
import skin6 from '../Storepage/skin/skin6.svg';
import skin7 from '../Storepage/skin/skin7.svg';
import skin8 from '../Storepage/skin/skin8.svg';
import { useRouter } from 'next/navigation';

export default function StorePage() {
  const router = useRouter();
  const [coin, setcoin] = useState(300);
  const [owned, setowned] = useState<string[]>([]);
  const items = ['Board1', 'Board2', 'Board3', 'Board4'];

  const handleBuyItem = (item: string) => {
    if (coin >= 100 && !owned.includes(item)) {
      setcoin(coin - 100);
      owned.push(item);
      setowned(owned);
    } else if (owned.includes(item)) {
      alert('You already OWNED this!! Buy something else!!');
    } else if (coin < 100) {
      alert('Not enough money!!!!');
    }
  };
  return (
    <body className={styles.body}>
      <div className={styles.playerInfo}>
        <Image src={playericon} alt="Player Icon" className={styles.playerInfo_img} width={600} height={120} />
        <div>
          <p className={styles.playerID}>ID: 12345</p>
          <p className={styles.playerName}>Wilson Lui</p>
        </div>
      </div>
      <div className={styles.remainingCoins}>Remaining coins: {coin}</div>
      <div className={styles.center_image}>
        <Image src={mainimage} alt="Main Image" className={styles.center_image_img} />
      </div>
      <div className={styles.container}>
        <div className={styles.boxRow}>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin1} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Green Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Green Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Green Board');
                }}
              >
                {owned.includes('Green Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin2} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Red Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Red Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Red Board');
                }}
              >
                {owned.includes('Red Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin3} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Hell Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Hell Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Hell Board');
                }}
              >
                {owned.includes('Hell Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin4} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Ocean Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Ocean Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Ocean Board');
                }}
              >
                {owned.includes('Ocean Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.boxRow}>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin5} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Creeper Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Creeper Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Creeper Board');
                }}
              >
                {owned.includes('Creeper Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin6} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>BNW Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('BNW Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('BNW Board');
                }}
              >
                {owned.includes('BNW Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin7} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Gay Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('Gay Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('Gay Board');
                }}
              >
                {owned.includes('Gay Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.skins}>
              <Image src={skin8} alt="SVG Image" width={160} height={160} />
            </div>
            <p className={styles.description}>Missing Texture Board</p>
            <p className={styles.description}>Price: $100</p>
            <div className={styles.container2}>
              <button
                className={`${styles.buyButton} ${owned.includes('MT Board') ? styles.owned : ''}`}
                onClick={() => {
                  handleBuyItem('MT Board');
                }}
              >
                {owned.includes('MT Board') ? 'Owned' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className={styles.backbutton} onClick={() => router.back()}>
        Back
      </button>
    </body>
  );
}
