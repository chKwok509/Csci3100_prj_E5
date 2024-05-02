import React, { useState } from 'react';
import styles from './Chatroom.module.css';

const Chatroom = () => {
  // State variables
  const [showFriends, setShowFriends] = useState(false); // Controls whether the list of friends is shown
  const [selectedFriend, setSelectedFriend] = useState(''); // Stores the name of the friend currently selected
  const [showChatBox, setShowChatBox] = useState(false); // Controls whether the chat box is shown
  const [friendMessages, setFriendMessages] = useState({}); // Stores messages for each friend
  const [newMessage, setNewMessage] = useState(''); // Stores the value of the input field for typing a new message

  // Function to open the chat and show the list of friends
  const handleOpenChat = () => {
    setShowFriends(true);
  };

  // Function to handle the selection of a friend
  const handleFriendSelection = (friendName) => {
    setSelectedFriend(friendName);
    setShowChatBox(true);
  };

  // Function to close the chat box
  const closeChatBox = () => {
    setShowChatBox(false);
  };

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    // Create a new message object with the sender, content, and timestamp
    const message = {
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
    };

    // Update the friendMessages state by adding the new message to the selected friend's array of messages
    setFriendMessages((prevMessages) => ({
      ...prevMessages,
      [selectedFriend]: [...(prevMessages[selectedFriend] || []), message],
    }));

    // Clear the newMessage input field
    setNewMessage('');
  };

  // Replace with your list of friends
  const friends = ['Peter33446', 'Amy_is_fat', 'Nicker', '天水圍墮天地獄獸'];

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