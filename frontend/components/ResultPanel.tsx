"use client";

import type { ConvertResponse } from "@/lib/api";

interface ResultPanelProps {
  result: ConvertResponse;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.markdown);
    } catch {
      // Clipboard API unavailable — user can select and copy manually
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.filename.replace(/\.[^/.]+$/, "")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm text-brand-text">
          <span className="font-semibold">{result.filename}</span>
          {" — "}
          {result.char_count.toLocaleString("pt-BR")} caracteres
        </span>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="text-sm px-3 py-1.5 rounded border border-brand-turquoise text-brand-turquoise hover:bg-cyan-50 transition-colors font-medium"
          >
            Copiar Markdown
          </button>
          <button
            onClick={handleDownload}
            className="text-sm px-3 py-1.5 rounded bg-brand-deep text-white hover:opacity-90 transition-opacity font-medium"
          >
            Download .md
          </button>
        </div>
      </div>
      <textarea
        readOnly
        value={result.markdown}
        aria-label="Markdown gerado"
        className="w-full h-72 p-4 text-sm font-mono bg-brand-gray border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed"
      />
    </div>
  );
}
