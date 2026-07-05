"use client";

const MAX_LENGTH = 1000;

export default function PromptForm({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="prompt"
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
      >
        Prompt
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value.slice(0, MAX_LENGTH))}
        placeholder="A neon-lit alley in Tokyo, rain-soaked pavement, cinematic lighting"
        rows={4}
        disabled={isLoading}
        className="w-full resize-none rounded-2xl border border-ink/10 bg-white/60 px-5 py-4 text-base leading-relaxed text-ink outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60 dark:border-paper/15 dark:bg-white/5 dark:text-paper"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          {prompt.length}/{MAX_LENGTH}
        </span>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Developing…" : "Generate"}
        </button>
      </div>
    </form>
  );
}