import OpenAI from "openai";

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is not set. Add it to .env.local to use the OpenAI provider."
      );
    }
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function generateImage(prompt, { size } = {}) {
  const openai = getClient();
  const model = process.env.OPENAI_IMAGE_MODEL || "dall-e-3";
  const imageSize = size || process.env.OPENAI_IMAGE_SIZE || "1024x1024";

  const response = await openai.images.generate({
    model,
    prompt,
    size: imageSize,
    n: 1,
    // "quality" is only a valid param for dall-e-3
    ...(model === "dall-e-3" ? { quality: "standard" } : {}),
  });

  const image = response.data?.[0];

  if (!image) {
    throw new Error("The model did not return an image.");
  }

  const imageUrl = image.url
    ? image.url
    : `data:image/png;base64,${image.b64_json}`;

  return { imageUrl };
}