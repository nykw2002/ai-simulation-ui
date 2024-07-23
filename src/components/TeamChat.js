import React, { useState, useRef, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import InteractiveGraph from './InteractiveGraph';
import '../styles/ChatArea.css';

function TeamChat({ setIsThinking }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const messagesEndRef = useRef(null);

  const agentIcons = {
    'Manager': '/path/to/manager-icon.png',
    'Data Analyst': '/path/to/analyst-icon.png',
    'Sales Rep': '/path/to/sales-icon.png',
    'Marketing Specialist': '/path/to/marketing-icon.png',
    'Finance Officer': '/path/to/finance-icon.png'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, showContent]);

  const simulateTyping = async (message, role) => {
    setIsTyping(true);
    let displayedMessage = '';
    for (let i = 0; i < message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      displayedMessage += message[i];
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = { text: displayedMessage, sender: 'team', role };
        return newMessages;
      });
    }
    setIsTyping(false);
  };

  const simulateTeamResponses = async () => {
    setIsThinking(true);
    const teamConversation = [
      { role: 'Manager', message: "Let's review the Q2 sales data. Can someone bring up the numbers?" },
      { role: 'Data Analyst', message: "Sure, I've got the Q2 sales data right here. I'll share the graph now." },
      { role: 'Sales Rep', message: "I see Product E is our top seller this quarter. That's impressive!" },
      { role: 'Marketing Specialist', message: "Yes, our recent campaign for Product E seems to have paid off." },
      { role: 'Manager', message: "Good observation. How does Product A compare to last quarter?" },
      { role: 'Data Analyst', message: "Product A is holding steady. It's our second-best performer." },
      { role: 'Finance Officer', message: "We should consider the profit margins. Product C has lower sales but higher margins." },
      { role: 'Manager', message: "Excellent point. Let's factor that into our Q3 strategy." },
      { role: 'Sales Rep', message: "Should we push Product C more in the coming quarter?" },
      { role: 'Marketing Specialist', message: "We could create a targeted campaign for Product C to boost its sales." }
    ];

    for (let entry of teamConversation) {
      setMessages(prev => [...prev, { text: '', sender: 'team', role: entry.role }]);
      await simulateTyping(entry.message, entry.role);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setIsThinking(false);
    setShowContent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setShowContent(false);
      
      await simulateTeamResponses();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'team' && (
                <div className="message-header">
                  <img src={agentIcons[message.role]} alt={message.role} className="agent-icon" />
                  <div className="team-member-role">{message.role}</div>
                </div>
              )}
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Team member is typing...</div>}
          {showContent && (
            <>
              <DocumentViewer />
              <InteractiveGraph />
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message for Team Chat..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default TeamChat;