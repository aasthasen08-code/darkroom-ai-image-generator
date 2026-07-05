# Darkroom — AI image generator

A minimal, responsive AI image generator. Type a prompt, generate an image,
and download the result. Built with Next.js 14 (App Router), Tailwind CSS,
and a Node.js API route with a swappable image-generation backend.

## Features

- Prompt input with character limit and live count
- Generate button with a "developing" loading animation
- Generated image displayed in a film-frame canvas
- One-click download of the generated image
- Fully responsive, mobile-first layout
- Dark mode with system preference detection and manual toggle (no flash on load)
- Backend API route (`/api/generate`) — your image provider's logic stays server-side
- **Swappable image provider**: free (Pollinations, no key) by default, one env var away from OpenAI
- Clean, conventional Next.js folder structure
- Zero-config deploy to Vercel

## Folder structure
darkroom-ai-image-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js       # POST /api/generate — calls the active provider
│   ├── globals.css            # Tailwind directives + film-frame utility class
│   ├── layout.jsx             # Root layout, fonts, metadata, no-flash theme script
│   └── page.jsx               # Main page — wires up form, loading, and display
├── components/
│   ├── Header.jsx              # Logo + theme toggle
│   ├── ThemeToggle.jsx         # Dark/light mode switch
│   ├── PromptForm.jsx          # Prompt textarea + generate button
│   └── ImageDisplay.jsx        # Loading animation, image canvas, download button
├── lib/
│   └── imageProviders/
│       ├── index.js            # Picks a provider based on IMAGE_PROVIDER env var
│       ├── pollinations.js     # Free provider, no API key required
│       └── openai.js           # OpenAI provider, used when IMAGE_PROVIDER=openai
├── .env.example                 # Copy to .env.local
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json

## Switching image providers

Everything routes through `lib/imageProviders/index.js`, so switching providers
is a one-line env change — no code changes needed.

**Default (free, no key):**
IMAGE_PROVIDER=pollinations

**Switch to OpenAI:**
IMAGE_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_IMAGE_MODEL=dall-e-3
OPENAI_IMAGE_SIZE=1024x1024

Get an OpenAI key at https://platform.openai.com/api-keys. Image generation
is billed per image — check current pricing before heavy use. Pollinations
has no official SLA or rate-limit guarantee, so it's best treated as a
"get started free" option rather than a production guarantee.

### Model options if using OpenAI

- `dall-e-3` (default) — highest quality, returns a hosted image URL. Sizes: `1024x1024`, `1792x1024`, `1024x1792`.
- `dall-e-2` — cheaper/faster. Sizes: `256x256`, `512x512`, `1024x1024`.
- `gpt-image-1` — always returns base64 image data (handled automatically).

## Getting started

```bash
npm install
cp .env.example .env.local   # already has free defaults, no key needed
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

1. Push the project to a GitHub/GitLab/Bitbucket repo.
2. Go to https://vercel.com/new and import the repo.
3. In Environment Variables, add `IMAGE_PROVIDER` (and `OPENAI_API_KEY` etc. if using OpenAI).
4. Deploy — Vercel detects Next.js automatically, no extra config needed.

Or from the CLI:

```bash
npm install -g vercel
vercel
```

## Notes

- The API route validates and trims the prompt (max 1000 characters) and returns clear JSON error messages either way.
- The download button works for both a hosted URL (Pollinations/dall-e-3/2) and a base64 data URL (gpt-image-1) with no extra handling.
- Tailwind's `class` dark mode strategy is used with an inline script in `app/layout.jsx`, so the correct theme applies before first paint.