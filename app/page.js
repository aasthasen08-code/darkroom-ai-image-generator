"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PromptForm from "@/components/PromptForm";
import ImageDisplay from "@/components/ImageDisplay";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Try again.");
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6">
      <Header />

      <section className="flex flex-1 flex-col justify-center py-10">
        <h1 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
          Type a prompt.
          <br />
          Develop the image.
        </h1>
        <p className="mt-3 max-w-md text-muted">
          Describe what you want to see, and let the model expose it — frame
          by frame, pixel by pixel.
        </p>

        <div className="mt-8">
          <PromptForm
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </div>
      </section>

      <footer className="py-8 text-center font-mono text-xs text-muted">
        Built with Next.js · Tailwind CSS · Pollinations / OpenAI Images API
      </footer>
    </main>
  );
}
