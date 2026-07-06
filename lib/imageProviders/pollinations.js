const BASE_URL = "https://image.pollinations.ai/prompt";
const REQUEST_TIMEOUT_MS = 20000; // each attempt gets 20s
const MAX_ATTEMPTS = 2; // one retry, kept well under the 60s function limit

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateImage(prompt, { width = 1024, height = 1024 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const seed = Math.floor(Math.random() * 1_000_000);
    const params = new URLSearchParams({
      width: String(width),
      height: String(height),
      seed: String(seed),
      nologo: "true",
    });
    const url = `${BASE_URL}/${encodeURIComponent(prompt)}?${params.toString()}`;

    try {
      const res = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);

      if (!res.ok) {
        throw new Error(`Image provider returned status ${res.status}.`);
      }

      return { imageUrl: url };
    } catch (err) {
      lastError = err;
      const isTimeout = err.name === "AbortError";
      console.error(
        `Pollinations attempt ${attempt} failed:`,
        isTimeout ? "timed out after 20s" : err.message
      );

      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw new Error(
    lastError?.name === "AbortError"
      ? "The image provider took too long to respond. Please try again."
      : "Image generation failed. Please try again."
  );
}