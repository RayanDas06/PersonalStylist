// ChatBot.tsx
import React, { useState } from 'react';
import '../style/chatbot.css'; // Import the chatbot styles
import { TextField, Button } from '@mui/material';

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  
  // Function to handle sending messages
  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add the user's message to the message list
      setMessages([...messages, `You: ${userInput}`]);
      setUserInput('');

      // Simulate chatbot response (can replace with AI response later)
      setMessages((prevMessages) => [...prevMessages, `Chatbot: I'm processing that...`]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      
      <div className="chatbot-input">
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
