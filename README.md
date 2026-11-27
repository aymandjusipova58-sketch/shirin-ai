# SHIRIN AI

A personalized learning companion for an 11th-grade student preparing for university admission, with a long-term target of Harvard College.

## Academic direction
- Intended concentration: Government
- Academic interest: Political Economy
- Primary standardized test preparation: SAT
- English language development: beginner to academic proficiency
- Mathematics: foundations through SAT Math

## Learning modules
1. English Foundation — grammar, vocabulary, listening, reading, speaking, and writing.
2. Mathematics Foundation — arithmetic, algebra, geometry, data analysis, and statistics.
3. SAT Preparation — Reading and Writing, Math, diagnostics, practice sets, and timed mock tests.
4. Government & Politics — institutions, public policy, law, democracy, and international relations.
5. Political Economy — poverty, inequality, wages, inflation, public budgets, and evidence-based policy.
6. Study Planner — daily goals, weekly review, progress tracking, and revision.
7. AI Tutor — explanations, guided practice, hints, and feedback.

## Product principles
- Teach from the learner's demonstrated level; do not assume prior knowledge.
- Explain concepts in Uzbek first when needed, then gradually increase English immersion.
- Give step-by-step reasoning and practice rather than simply revealing answers.
- Clearly distinguish verified facts from estimates; never guarantee university admission.
- Protect the learner's privacy. Do not collect unnecessary personal data.
- Keep API keys and secrets on a secure server; never commit them to this repository.

## Initial learner profile
- Currently studying in Grade 11; expected graduation: May 2027.
- Current English level: beginner, based on school education.
- Mathematics: algebra needs strengthening.
- Interests: leadership, fairness, public service, poverty reduction, languages, reading, and creative projects.
- Goal: prepare a competitive, realistic university application.

## Development roadmap
- [x] Responsive learning dashboard and navigation
- [ ] Learner profile and baseline diagnostics
- [x] English Foundation starter lesson and quiz
- [x] Mathematics Foundation starter lesson and quiz
- [ ] SAT diagnostic and structured preparation
- [ ] Government & Political Economy learning path
- [ ] AI tutor integration with safe server-side key handling
- [x] Local progress tracking for daily tasks
- [ ] Android packaging and device testing
- [ ] Upload final app icon assets

## Important admissions note
Admission requirements and testing policies can change. Verify the official university requirements for the intended application year before making application decisions. SAT preparation does not replace strong school performance, English proficiency, meaningful activities, and a complete application.


## Secure AI tutor backend (next-stage setup)

The tutor Edge Function is prepared at `supabase/functions/shirin-tutor/index.ts`.
It calls Gemini from the server. The provider key is never placed in browser code.

### Required separate Supabase project
Do not reuse credentials or databases from Alien AI Trucker or Alien Sentinel.
Create a dedicated Supabase project named `shirin-ai`, then:

1. Enable **Anonymous Sign-Ins** in Supabase Authentication settings.
2. Deploy the Edge Function named `shirin-tutor` with JWT verification enabled.
3. Add server-side Edge Function secrets:
   - `GEMINI_API_KEY` — your Gemini API key (secret; never commit it).
   - `SHIRIN_ALLOWED_ORIGIN` — the exact HTTPS origin where Shirin AI is hosted.
   - `GEMINI_MODEL` — optional model override; default is `gemini-2.5-flash-lite`.
4. Copy the project's URL and legacy anon public key into `config.js`.
   The anon key is public; never use a service-role key in the app.
5. Test anonymous sign-in and send a short tutor question. Confirm the function responds successfully.

The frontend keeps the temporary access token in session storage for the current browser tab.
No learner chat history is saved to a database by this preview.

### Current integration status
- [x] Secure server-side Gemini request handler written
- [x] Request size validation and bounded conversation context
- [x] Server-only AI key handling
- [x] Frontend prepared for Supabase anonymous session + Edge Function
- [ ] Create a dedicated Shirin AI Supabase project
- [ ] Add secrets and deploy the Edge Function
- [ ] Configure `config.js` with project URL and anon key
- [ ] Verify a real AI tutor response end-to-end

**Cost note:** Gemini and Supabase usage may be subject to provider quotas, limits, or charges. The free tier has request limits and Google may use submitted content to improve its products. Do not send passwords, private documents, sensitive personal information, or confidential school records. Check current quotas before enabling access.
