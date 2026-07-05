const BASE_URL = "https://image.pollinations.ai/prompt";

export async function generateImage(prompt, { width = 1024, height = 1024 } = {}) {
  const seed = Math.floor(Math.random() * 1_000_000);

  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: "true",
  });

  const url = `${BASE_URL}/${encodeURIComponent(prompt)}?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Image provider request failed (status ${res.status}).`);
  }

  return { imageUrl: url };
}