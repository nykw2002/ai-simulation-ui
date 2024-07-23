import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatArea.css';

function AgentsChat({ setIsThinking }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('Agent 1');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const simulateTyping = async (message) => {
    setIsTyping(true);
    setIsThinking(true);
    let displayedMessage = '';
    for (let i = 0; i < message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      displayedMessage += message[i];
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = { text: displayedMessage, sender: 'agent' };
        return newMessages;
      });
    }
    setIsTyping(false);
    setIsThinking(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      setMessages(prev => [...prev, { text: '', sender: 'agent' }]);
      await simulateTyping(`This is a simulated response from ${selectedAgent} in the Agents Chat.`);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        <div className="messages-container">
          <div className="agent-selector">
            <label htmlFor="agent-select">Select an agent: </label>
            <select 
              id="agent-select"
              value={selectedAgent} 
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              <option value="Agent 1">Agent 1</option>
              <option value="Agent 2">Agent 2</option>
              <option value="Agent 3">Agent 3</option>
              <option value="Agent 4">Agent 4</option>
            </select>
          </div>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Agent is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Type your message for ${selectedAgent}...`}
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default AgentsChat;