export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }
  
  export function getFileIcon(filename) {
    const extension = getFileExtension(filename).toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pdf-icon.png';
      case 'doc':
      case 'docx':
        return 'doc-icon.png';
      case 'xls':
      case 'xlsx':
        return 'xls-icon.png';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image-icon.png';
      default:
        return 'file-icon.png';
    }
  }
  
  export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  export function isAllowedFileType(file, allowedTypes) {
    const fileType = file.type.split('/')[0];
    return allowedTypes.includes(fileType);
  }