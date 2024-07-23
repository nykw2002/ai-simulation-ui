import React, { useState } from 'react';
import '../styles/DocumentViewer.css';

function DocumentViewer() {
  const [activeDocument, setActiveDocument] = useState(null);
  
  const documents = [
    { id: 1, name: 'PDF 1', type: 'pdf', path: 'C:\\Users\\vasil\\Desktop\\demoUI\\src\\filestodisplay\\PNNR.pdf' },
    { id: 2, name: 'PDF 2', type: 'pdf', path: 'C:/path/to/your/pdf2.pdf' },
    { id: 3, name: 'PDF 3', type: 'pdf', path: 'C:/path/to/your/pdf3.pdf' },
    { id: 4, name: 'PDF 4', type: 'pdf', path: 'C:/path/to/your/pdf4.pdf' },
    { id: 5, name: 'PDF 5', type: 'pdf', path: 'C:/path/to/your/pdf5.pdf' },
    { id: 6, name: 'Excel 1', type: 'excel', path: 'C:\\Users\\vasil\\Desktop\\demoUI\\src\\filestodisplay\\Book1.csv' },
    { id: 7, name: 'Excel 2', type: 'excel', path: 'C:/path/to/your/excel2.xlsx' },
    { id: 8, name: 'Excel 3', type: 'excel', path: 'C:/path/to/your/excel3.xlsx' },
  ];

  const handleDocumentClick = (doc) => {
    setActiveDocument(doc);
  };

  const renderDocumentContent = (doc) => {
    if (doc.type === 'pdf') {
      return (
        <iframe
          src={doc.path}
          title={doc.name}
          width="100%"
          height="600px"
          frameBorder="0"
        >
          This browser does not support PDFs. Please download the PDF to view it.
        </iframe>
      );
    } else if (doc.type === 'excel') {
      return (
        <div className="excel-preview">
          <p>Excel preview is not available. File path: {doc.path}</p>
          <p>You can open this file using Microsoft Excel or a compatible spreadsheet application.</p>
        </div>
      );
    }
  };

  return (
    <div className="document-viewer">
      <div className="document-list">
        {documents.map(doc => (
          <button 
            key={doc.id} 
            onClick={() => handleDocumentClick(doc)}
            className={activeDocument === doc ? 'active' : ''}
          >
            {doc.name}
          </button>
        ))}
      </div>
      <div className="document-display">
        {activeDocument && (
          <div className="document-preview">
            <h3>{activeDocument.name}</h3>
            {renderDocumentContent(activeDocument)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentViewer;