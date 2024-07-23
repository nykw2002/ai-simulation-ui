import React, { useState } from 'react';
import FileAttachment from './FileAttachment';
import '../styles/KnowledgeBase.css';

function KnowledgeBase() {
  const [files, setFiles] = useState([
    { id: 1, name: 'filled_form.pdf', type: 'pdf', icon: '/path/to/pdf-icon.png' },
    { id: 2, name: '1st.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 3, name: 'php.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 4, name: 'css-3.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 5, name: 'html.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 6, name: 'java-script.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 7, name: 'python.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 8, name: 'png-file.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 9, name: 'doc.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 10, name: 'xls.png', type: 'image', icon: '/path/to/image-icon.png' },
    { id: 11, name: 'pdf.png', type: 'image', icon: '/path/to/image-icon.png' }
  ]);

  const handleFileAttach = (newFiles) => {
    const newFileObjects = newFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      type: file.type.split('/')[0],
      icon: `/path/to/${file.type.split('/')[0]}-icon.png` // Replace with actual path to your icons
    }));
    setFiles([...files, ...newFileObjects]);
  };

  return (
    <div className="knowledge-base">
      <h2>Database</h2>
      <FileAttachment onFileAttach={handleFileAttach} />
      <ul className="file-list">
        {files.map((file) => (
          <li key={file.id} className="file-item">
            <img src={file.icon} alt={file.type} className="file-icon" />
            <span className="file-name">{file.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnowledgeBase;