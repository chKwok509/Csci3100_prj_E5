'use client'
import React, { useState } from 'react';
import styles from './communitypage.module.css';
import Image from 'next/image';
import playericon from '../../../public/meme.png';
import Chatroom from '@/app/Component/Popup/Chatroom';
import mainimage from '../../../public/community.png';
import { useRouter } from 'next/navigation';

export default function CommunityPage() {
  const router = useRouter();
  const [friends, setFriends] = useState<string[]>(['Peter33446', 'Amy_is_fat', 'Nicker', '天水圍墮天地獄獸']);
  const [newFriend, setNewFriend] = useState('');
  const existingFriends = ['James', 'PeePee69', 'Jenny', '1155123456'];

  const handleAddFriend = () => {
    if (newFriend.trim() !== '') {
      // Check if the entered name exists in the list of existing friends
      if (existingFriends.includes(newFriend)) {
        if (friends.includes(newFriend)) {
          alert('Friend already exists!');
        } else {
          // Add the new friend to the list
          setFriends([...friends, newFriend]);
          setNewFriend('');
        }
      } else {
        alert('User does not exist!');
      }
    } else {
      alert("Please enter a friend's name.");
    }
  };

  return (
    <body className={styles.body}>
      {/* Player Information */}
      <div className={styles.playerInfo}>
        <Image src={playericon} alt="Player Icon" className={styles.playerInfo_img} width={600} height={120} />
        <div>
          <p className={styles.playerID}>ID: 12345</p>
          <p className={styles.playerName}>Wilson Lui</p>
        </div>
      </div>

      {/* Main Image */}
      <div className={styles.center_image}>
        <Image src={mainimage} alt="Main Image" className={styles.center_image_img} />
      </div>

      <div className={styles.container}>
        {/* Friends List */}
        <div className={styles.storeitems}>
          {friends.map((friend) => (
            <div key={friend} className={styles.friend}>
              <span className={styles.friendName}>{friend}</span>
              <button
                className={styles.removeButton}
                onClick={() => {
                  if (confirm('remove ' + friend + ' ?')) {
                    // Remove the friend from the list
                    setFriends(friends.filter((a) => a !== friend));
                  }
                }}
              >
                Remove friend
              </button>
            </div>
          ))}
        </div>

        {/* Add Friend */}
        <div className={styles.addFriend}>
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder="Enter friend's name"
            className={styles.friendInput}
          />
          <button className={styles.addButton} onClick={handleAddFriend}>
            Add Friend
          </button>
        </div>
      </div>

      {/* Back Button */}
      <button className={styles.backbutton} onClick={() => router.back()}>
        Back
      </button>
    </body>
  );
}