import React, { useCallback, useState } from "react";
import "./FileUpload.css";

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  onFilesSelected?: (files: File[]) => void;
  onUploadProgress?: (progress: number) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // Default: 5MB
  onFilesSelected,
  onUploadProgress,
  onError,
  disabled = false,
  className = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
        ? Array.from(event.target.files)
        : [];
      validateFiles(selectedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files
      ? Array.from(event.dataTransfer.files)
      : [];
    validateFiles(droppedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    let errorMessage: string | null = null;

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        errorMessage = `File ${file.name} exceeds the maximum size of ${
          maxSize / 1024 / 1024
        }MB.`;
        break;
      }

      const isFileTypeValid = validateFileType(file, accept);
      if (!isFileTypeValid) {
        errorMessage = `File ${file.name} is not a valid type.`;
        break;
      }

      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } else {
      setFiles((prevFiles) =>
        multiple ? [...prevFiles, ...validFiles] : validFiles
      );
      setError(null);
      if (onFilesSelected) onFilesSelected(validFiles);
    }
  };

  const validateFileType = (file: File, accept: string) => {
    if (accept === "*") return true;

    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    return acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const category = type.split("/")[0];
        return file.type.startsWith(category);
      }

      if (file.type === type) return true;

      if (type.startsWith(".") && fileExtension === type.slice(1)) return true;

      return false;
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesSelected) onFilesSelected(updatedFiles);
  };

  return (
    <div
      className={`file-upload ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="file-upload-area">
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-upload-label">
          Drag & drop files or <span>browse</span>
        </label>
      </div>

      {error && <div className="file-upload-error">{error}</div>}

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <span>{file.name}</span>
              <button onClick={() => removeFile(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
