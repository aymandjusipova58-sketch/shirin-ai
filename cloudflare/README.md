# Shirin AI Gemini tutor backend

This Worker keeps the Gemini API key on the server; never put it in `config.js`, HTML, or the Android app.

## Deploy once
1. Create/sign in to a Cloudflare account.
2. From this repository root, install Wrangler and authenticate:
   `npm install --global wrangler`
   `wrangler login`
3. Deploy:
   `wrangler deploy cloudflare/worker.js --name shirin-ai-tutor`
4. Add the Gemini key as a server-side secret:
   `wrangler secret put GEMINI_API_KEY --name shirin-ai-tutor`
   Paste the separate Shirin-AI Gemini key only into the terminal prompt. Never send it in chat or commit it.
5. Copy the deployed Worker URL (normally `https://shirin-ai-tutor.<your-account-subdomain>.workers.dev`).

## Connect the website and APK
Set `window.SHIRIN_CONFIG.tutorEndpoint` in `config.js` to the deployed URL. Commit that change; the GitHub Pages site updates and the Android APK workflow rebuilds automatically.

The Worker accepts POST JSON `{ "message": "...", "history": [] }`, limits message length, uses Gemini `gemini-2.5-flash`, and permits the GitHub Pages and Capacitor app origins only.
