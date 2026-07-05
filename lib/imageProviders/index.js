import * as pollinations from "./pollinations";
import * as openai from "./openai";

const providers = {
  pollinations,
  openai,
};

export function getImageProvider() {
  const key = process.env.IMAGE_PROVIDER || "pollinations";
  const provider = providers[key];

  if (!provider) {
    throw new Error(
      `Unknown IMAGE_PROVIDER "${key}". Use "pollinations" or "openai".`
    );
  }

  return provider;
}