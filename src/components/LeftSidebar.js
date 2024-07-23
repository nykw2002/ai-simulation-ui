import React from 'react';
import KnowledgeBase from './KnowledgeBase';
import AgentInstructions from './AgentInstructions';
import FileAttachment from './FileAttachment';
import '../styles/Sidebar.css';

function LeftSidebar({ activeChat }) {
  return (
    <div className="sidebar left-sidebar">
      <KnowledgeBase />
      {activeChat === 'team' && (
        <>
          <div className="sidebar-section">
            <h2>Team Files</h2>
            <FileAttachment onFileAttach={(files) => console.log('Team files:', files)} />
          </div>
          <AgentInstructions />
        </>
      )}
    </div>
  );
}

export default LeftSidebar;