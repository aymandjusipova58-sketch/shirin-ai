# SHIRIN AI

A personalized learning companion for an 11th-grade learner preparing for university admission, with a long-term target of Harvard College.

## Learning path
- English Foundation from beginner level
- Mathematics foundation and algebra
- SAT Reading & Writing and Math
- Government & Politics
- Political Economy
- Daily study planner and progress tracking
- AI tutor (server endpoint to be connected)

## Backend decision
Shirin-AI uses **Firebase**, not Supabase. It is a separate project and must not reuse credentials or databases from Alien Sentinel or ARIF AI TRUCKER.

### Firebase setup (free Spark plan)
1. Create a Firebase project named `shirin-ai` at https://console.firebase.google.com/.
2. Select the **Spark (no-cost)** plan. Do not enable billing or upgrade.
3. Add a Web App and copy its Firebase web configuration into `config.js`.
4. In Authentication > Sign-in method, enable **Anonymous** sign-in.
5. Create a Cloud Firestore database.
6. Publish the included `firestore.rules` rules.
7. Host the static app using Firebase Hosting or GitHub Pages.

Firebase web config is public client configuration. Do not put Gemini API keys, Admin SDK keys, or service-account credentials in the frontend.

## AI tutor
The frontend is prepared to call a secure server endpoint configured as `tutorEndpoint`. The Gemini API key must stay in a server-side secret (for example, a Cloudflare Worker secret). Do not paste a Gemini key into `config.js` or GitHub. Until the endpoint is deployed, the tutor uses limited built-in demo explanations.

## Privacy and security
- Anonymous Firebase Auth is used; no password or personal profile is required.
- Each learner can read and write only their own Firestore document.
- Progress is also cached locally so lessons remain usable if cloud setup is incomplete.
- Do not store sensitive personal information or school records.

## Current status
- [x] Responsive learning dashboard and navigation
- [x] Starter English and algebra lessons
- [x] Local progress tracking
- [x] Firebase client integration prepared
- [x] Firestore per-user security rules prepared
- [ ] Create Firebase project and copy web config
- [ ] Enable Anonymous Authentication and Firestore
- [ ] Deploy/publish Firestore rules
- [ ] Deploy secure AI tutor endpoint
- [ ] End-to-end test on mobile
- [ ] Android packaging and device test

## Learner profile
- Grade 11; expected graduation May 2027
- English: beginner
- Mathematics: algebra foundations need strengthening
- Goal: prepare a realistic, competitive university application
- Intended academic direction: Government, with interest in Political Economy

Admission policies change. Verify requirements with official university and testing-provider sources for the intended application year. No app can guarantee admission.
