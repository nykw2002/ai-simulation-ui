import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ChatArea from './ChatArea';
import DocumentsChat from './DocumentsChat';
import TeamChat from './TeamChat';
import AgentsChat from './AgentsChat';
import '../styles/App.css';

function App() {
  const [activeChat, setActiveChat] = useState('documents');
  const [isThinking, setIsThinking] = useState(false);

  const documents = [
    {
      name: 'A',
      fields: [
        { name: 'name', value: 'John Doe' },
        { name: 'phone number', value: '' },
      ]
    },
    {
      name: 'B',
      fields: [
        { name: 'address', value: '123 Main St' },
        { name: 'email', value: '' },
      ]
    }
  ];

  return (
    <Router>
      <div className="app">
        <LeftSidebar activeChat={activeChat} />
        <main className="main-content">
          <nav className="top-nav">
            <NavLink to="/documents" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"} onClick={() => setActiveChat('documents')}>Documents Chat</NavLink>
            <NavLink to="/team" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"} onClick={() => setActiveChat('team')}>Team Chat</NavLink>
            <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-button active" : "nav-button"} onClick={() => setActiveChat('agents')}>Agent's Chat</NavLink>
          </nav>
          <Routes>
            <Route path="/documents" element={<ChatArea isThinking={isThinking}><DocumentsChat setIsThinking={setIsThinking} /></ChatArea>} />
            <Route path="/team" element={<ChatArea isThinking={isThinking}><TeamChat setIsThinking={setIsThinking} /></ChatArea>} />
            <Route path="/agents" element={<ChatArea isThinking={isThinking}><AgentsChat setIsThinking={setIsThinking} /></ChatArea>} />
            <Route path="/" element={<ChatArea isThinking={isThinking}><DocumentsChat setIsThinking={setIsThinking} /></ChatArea>} />
          </Routes>
        </main>
        <RightSidebar activeChat={activeChat} documents={documents} />
      </div>
    </Router>
  );
}

export default App;