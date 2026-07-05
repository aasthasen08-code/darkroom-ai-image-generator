"use client";

import { Download } from "lucide-react";

function downloadImage(imageUrl, prompt) {
  const safeName =
    prompt
      .trim()
      .slice(0, 40)
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase() || "darkroom-image";

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = `${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ImageDisplay({ imageUrl, isLoading, error, prompt }) {
  return (
    <div className="mt-8 w-full">
      <div className="sprocket-row text-ink dark:text-paper" />

      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-ink/5 dark:border-paper/10 dark:bg-white/5">
        {isLoading && (
          <>
            <div className="absolute inset-0 animate-pulseGlow bg-safelight/10" />
            <div className="absolute inset-x-0 h-1/3 animate-develop bg-gradient-to-b from-transparent via-safelight/30 to-transparent" />
            <p className="relative font-mono text-xs uppercase tracking-widest text-muted">
              Developing…
            </p>
          </>
        )}

        {!isLoading && error && (
          <div className="px-6 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-red-500">
              Exposure failed
            </p>
            <p className="mt-2 text-sm text-muted">{error}</p>
          </div>
        )}

        {!isLoading && !error && imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={prompt || "Generated image"}
            className="h-full w-full object-cover"
          />
        )}

        {!isLoading && !error && !imageUrl && (
          <p className="px-6 text-center font-mono text-xs uppercase tracking-widest text-muted">
            Your image will appear here
          </p>
        )}
      </div>

      <div className="sprocket-row text-ink dark:text-paper" />

      {imageUrl && !isLoading && (
        <button
          onClick={() => downloadImage(imageUrl, prompt)}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 dark:border-paper/20 dark:text-paper dark:hover:bg-white/10"
        >
          <Download size={15} />
          Download
        </button>
      )}
    </div>
  );
}