import { useState, useCallback } from 'react';

function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFiles = useCallback(async (newFiles) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload process
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      // Simulate API call or file processing
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(prevFiles => [...prevFiles, file]);
      setUploadProgress(((i + 1) / newFiles.length) * 100);
    }

    setIsUploading(false);
    setUploadProgress(100);
  }, []);

  const removeFile = useCallback((fileToRemove) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  }, []);

  return { files, isUploading, uploadProgress, uploadFiles, removeFile };
}

export default useFileUpload;