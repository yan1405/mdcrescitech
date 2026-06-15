"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DropZone from "@/components/DropZone";
import ConvertButton from "@/components/ConvertButton";
import ResultPanel from "@/components/ResultPanel";
import Footer from "@/components/Footer";
import { convert, type ConvertResponse } from "@/lib/api";

type Status = "idle" | "uploading" | "success" | "error";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ConvertResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleConvert = async () => {
    if (!file) return;
    setStatus("uploading");
    setResult(null);
    setErrorMessage("");

    try {
      const data = await convert(file);
      setResult(data);
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao converter o arquivo."
      );
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-10 pb-24">
        <DropZone onFileSelect={setFile} selectedFile={file} />
        <div className="mt-4">
          <ConvertButton
            onClick={handleConvert}
            loading={status === "uploading"}
            disabled={!file}
          />
        </div>
        {status === "error" && (
          <p className="mt-4 text-red-600 text-sm font-medium rounded-md bg-red-50 border border-red-200 px-4 py-3">
            {errorMessage}
          </p>
        )}
        {status === "success" && result && <ResultPanel result={result} />}
      </main>
      <Footer />
    </div>
  );
}
