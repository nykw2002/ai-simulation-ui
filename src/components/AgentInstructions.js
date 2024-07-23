import React, { useState } from 'react';
import '../styles/AgentInstructions.css';

function AgentInstructions() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agent 1', instructions: '' },
    { id: 2, name: 'Agent 2', instructions: '' },
    { id: 3, name: 'Agent 3', instructions: '' },
    { id: 4, name: 'Agent 4', instructions: '' }
  ]);

  const handleInstructionChange = (id, newInstructions) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, instructions: newInstructions } : agent
    ));
  };

  return (
    <div className="agent-instructions">
      <h2>Agent Instructions</h2>
      {agents.map((agent) => (
        <div key={agent.id} className="agent-instruction">
          <h3>{agent.name}</h3>
          <textarea
            value={agent.instructions}
            onChange={(e) => handleInstructionChange(agent.id, e.target.value)}
            placeholder={`Enter instructions for ${agent.name}`}
            rows={4}
          />
        </div>
      ))}
    </div>
  );
}

export default AgentInstructions;