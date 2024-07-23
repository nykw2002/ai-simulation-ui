import React from 'react';
import '../styles/AgentSelection.css';

function AgentSelection({ selectedAgent, onAgentSelect }) {
  const agents = ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4'];

  return (
    <div className="agent-selection">
      <h2>Select an Agent</h2>
      <div className="agent-buttons">
        {agents.map((agent) => (
          <button
            key={agent}
            className={`agent-button ${selectedAgent === agent ? 'selected' : ''}`}
            onClick={() => onAgentSelect(agent)}
          >
            {agent}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AgentSelection;