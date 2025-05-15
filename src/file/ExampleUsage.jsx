import React, { useState } from "react";
import FileUpload from "./file/FileUpload";

const FileUploadExampleUsage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesSelected = (files) => {
    setUploadedFiles(files);
    console.log("Selected files:", files);
  };

  const handleError = (error) => {
    console.error("File upload error:", error);
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <FileUpload
        multiple
        accept="image/*, .pdf" // Allow images and PDFs
        maxSize={10 * 1024 * 1024} // 10MB
        onFilesSelected={handleFilesSelected}
        onError={handleError}
      />
      <div>
        <h2>Uploaded Files:</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadExampleUsage;
