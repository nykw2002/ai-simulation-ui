import React from 'react';
import '../styles/Sidebar.css';

function RightSidebar({ activeChat, documents }) {
  const renderAnnotations = () => {
    return documents.map((doc, docIndex) => (
      <div key={doc.name} className="annotation-box">
        <h3>{doc.name}</h3>
        {doc.fields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="field-annotation">
            <span className="field-id">{`${doc.name}${fieldIndex + 1}`}</span>
            <span className="field-name">{field.name}</span>
            {field.value ? (
              <span className="field-value">{field.value}</span>
            ) : (
              <span className="field-not-found">not found in database</span>
            )}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="sidebar right-sidebar">
      <h2>{activeChat === 'team' ? 'Team Chat' : 'Document Chat'} Right Sidebar</h2>
      {activeChat === 'documents' && (
        <div className="annotations-container">
          <h3>Document Annotations</h3>
          {renderAnnotations()}
        </div>
      )}
      <div className="sidebar-section">
        <h3>Quick Actions</h3>
        <button className="action-button">Products</button>
        <button className="action-button">Pricing</button>
        <button className="action-button">Docs</button>
      </div>
    </div>
  );
}

export default RightSidebar;