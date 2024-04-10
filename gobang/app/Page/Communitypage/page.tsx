'use client'
import React, { useState } from 'react';
import styles from './communitypage.module.css';
import Image from 'next/image';
import Chatroom from '@/app/Component/Popup/Chatroom';
import mainimage from '../../../public/community.png';
import { useRouter } from 'next/navigation';



export default function CommunityPage() {
    const router = useRouter();
    const [friends,setfriends]=useState<string[]>(['Bob','Peter','Mary','Oscar'])

    const handledeletefriend=(friend:string)=>{
      const index = friends.indexOf(friend);
      if (index > -1) { 
        friends.splice(index, 1); 
      }
      setfriends(friends);
    }
    return (
        <body className={styles.body}>
            <div className={styles.center_image}>
                <Image src={mainimage} alt="Main Image" className={styles.center_image_img} />
            </div>
            
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Community</h1>
      <div className={styles.imageContainer}>
      </div>
      <p className={styles.description}>You can manage your frends and view record here.</p>
      
    </div>
    <button className={styles.backbutton} onClick={()=>router.back()}>Back</button>
    <div className={styles.storeitems}>
      {friends.map((friend) => (
            <div key={friend}>
              {friend}
              <button className={styles.buybutton} onClick={()=>{handledeletefriend(friend)}}>Remove friend</button>
            </div>
          ))}
      </div>
    </body>
  );
}