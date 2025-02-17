import React, { useState } from "react";
import FileUpload from "./file/FileUpload.tsx";

const ExampleUsage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesSelected = (files) => {
    setUploadedFiles(files);
    console.log("Selected files:", files);
  };

  console.log("Uploaded files:", uploadedFiles);

  return (
    <div>
      <h1>File Upload Example</h1>
      <FileUpload
        multiple
        accept="image/*, .pdf" // Allow images and PDFs
        maxSize={10 * 1024 * 1024} // 10MB
        onFilesSelected={handleFilesSelected}
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default ExampleUsage;
