"use client";

interface ConvertButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function ConvertButton({
  onClick,
  loading,
  disabled,
}: ConvertButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-live="polite"
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-brand-deep transition-opacity
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90 cursor-pointer"
        }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Convertendo...
        </span>
      ) : (
        "Converter"
      )}
    </button>
  );
}
