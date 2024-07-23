import React, { useState, useRef, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import '../styles/ChatArea.css';

function DocumentsChat({ setIsThinking }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, showDocuments]);

  const simulateTyping = async (message) => {
    setIsTyping(true);
    setIsThinking(true);
    let displayedMessage = '';
    for (let i = 0; i < message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      displayedMessage += message[i];
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = { text: displayedMessage, sender: 'ai' };
        return newMessages;
      });
    }
    setIsTyping(false);
    setIsThinking(false);
    setShowDocuments(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setShowDocuments(false);
      
      setMessages(prev => [...prev, { text: '', sender: 'ai' }]);
      await simulateTyping("Here's the information you requested. You can view the documents below.");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="typing-indicator">AI is typing...</div>}
          {showDocuments && <DocumentViewer />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message for Documents Chat..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default DocumentsChat;