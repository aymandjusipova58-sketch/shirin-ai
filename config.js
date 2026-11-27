// Public client configuration only.
// Use the project's legacy anon JWT key here; never use service_role or AI provider keys.
// The anon key is public by design. Keep GEMINI_API_KEY only in Supabase Edge Function secrets.
window.SHIRIN_CONFIG = Object.freeze({
  supabaseUrl: "",
  supabaseAnonKey: "",
  tutorFunctionName: "shirin-tutor"
});
