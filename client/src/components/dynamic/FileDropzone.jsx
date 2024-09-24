import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

const FileDropzone = ({ text, height, onFilesSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Handle the files dropped
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-sm ${height} w-full px-2 flex justify-center text-center items-center ${
        isDragActive ? "border-arfagreen" : "border-gray-300"
      }`}
      style={{ cursor: "pointer" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-sm text-gray-600">Drop the files here...</p>
      ) : (
        <div className="flex flex-col items-center">
          <CloudArrowUpIcon className="w-10 h-w-10" />
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
