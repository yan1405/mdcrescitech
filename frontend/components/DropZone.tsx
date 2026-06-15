"use client";

import { useCallback, useRef, useState } from "react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const ACCEPTED_EXTENSIONS = [
  "pdf", "docx", "pptx", "xlsx", "html", "csv", "json", "xml",
];
const ACCEPT_STRING = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",");

export default function DropZone({ onFileSelect, selectedFile }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (ACCEPTED_EXTENSIONS.includes(extension)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      aria-label="Área de upload de arquivo"
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors select-none
        ${
          isDragging
            ? "border-brand-turquoise bg-cyan-50"
            : "border-brand-turquoise bg-brand-gray hover:bg-cyan-50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_STRING}
        className="hidden"
        onChange={handleInputChange}
      />
      {selectedFile ? (
        <div>
          <p className="text-brand-deep font-semibold">{selectedFile.name}</p>
          <p className="text-xs text-gray-400 mt-1">
            Clique ou arraste para substituir o arquivo
          </p>
        </div>
      ) : (
        <div>
          <p className="text-brand-text font-medium">
            Arraste um arquivo aqui ou{" "}
            <span className="text-brand-turquoise font-semibold underline">
              clique para selecionar
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Formatos aceitos: {ACCEPTED_EXTENSIONS.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
