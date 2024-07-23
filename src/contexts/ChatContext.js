import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [activeChat, setActiveChat] = useState('documents');
  const [messages, setMessages] = useState({
    documents: [],
    team: [],
    agents: []
  });

  const addMessage = (chatType, message) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatType]: [...prevMessages[chatType], message]
    }));
  };

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}