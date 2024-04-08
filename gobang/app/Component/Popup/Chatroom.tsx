import React, { useState } from 'react';
import styles from './Chatroom.module.css';

const Chatroom = () => {
  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [showChatBox, setShowChatBox] = useState(false);
  const [friendMessages, setFriendMessages] = useState({}); // Store messages for each friend
  const [newMessage, setNewMessage] = useState('');

  const handleOpenChat = () => {
    setShowFriends(true);
  };

  const handleFriendSelection = (friendName) => {
    setSelectedFriend(friendName);
    setShowChatBox(true);
  };

  const closeChatBox = () => {
    setShowChatBox(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    const message = {
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
    };

    setFriendMessages((prevMessages) => ({
      ...prevMessages,
      [selectedFriend]: [...(prevMessages[selectedFriend] || []), message],
    }));
    setNewMessage('');
  };

  const friends = ['Peter33446', 'Amy_is_fat', 'Nicker','天水圍墮天地獄獸']; // Replace with your list of friends

  return (
    <div>
      <button className={styles['chatroom-button']} onClick={handleOpenChat}>
        Open Chatroom
      </button>
      {showFriends && (
        <div className={styles['friend-list']}>
          <h2>Friends</h2>
          {friends.map((friend) => (
            <button
              key={friend}
              className={styles['friend-button']}
              onClick={() => handleFriendSelection(friend)}
            >
              {friend}
            </button>
          ))}
        </div>
      )}
      {showChatBox && (
        <div className={styles['chat-box']}>
          <h2>{selectedFriend}</h2>
          <button className={`${styles['close-button']} ${styles['top-right']}`} onClick={closeChatBox}>
            X
          </button>
          <div className={styles['message-container']}>
            {friendMessages[selectedFriend]?.map((message, index) => (
              <div key={index} className={styles['message']}>
                <div className={styles['message-content']}>
                  <span className={styles['message-sender']}>{message.sender}: </span>
                  {message.content}&nbsp;
                  <span className={styles['message-timestamp']}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles['input-container']}>
            <input
              type="text"
              className={styles['chat-input']}
              placeholder=" Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className={styles['send-button']} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatroom;