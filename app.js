(() => {
  "use strict";
  const views = ["home", "english", "math", "sat", "government", "economics", "tutor", "progress"];
  const titles = {
    home: "Xush kelibsiz!", english: "Ingliz tili", math: "Matematika",
    sat: "SAT tayyorgarlik", government: "Government & Politics",
    economics: "Political Economy", tutor: "AI Ustoz", progress: "O‘quv natijalari"
  };
  const taskNames = { english: "English Foundation", math: "Mathematics", thinking: "Critical Thinking" };
  const storageKey = "shirin-ai-progress-v1";
  const safeRead = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  };
  let progress = safeRead();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const toast = (message) => {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => el.classList.remove("show"), 2600);
  };
  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(progress)); }
    catch { toast("Brauzer xotirasiga saqlab bo‘lmadi."); }
    renderProgress();
  };
  function showView(name) {
    const view = views.includes(name) ? name : "home";
    $$(".view").forEach((section) => section.classList.toggle("active", section.id === "view-" + view));
    $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
    $("#pageTitle").textContent = titles[view];
    $("#sidebar").classList.remove("open");
    if (location.hash !== "#" + view) history.replaceState(null, "", "#" + view);
    if (view === "progress") renderProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function renderProgress() {
    const keys = Object.keys(taskNames);
    const done = keys.filter((key) => progress[key] === true).length;
    const label = $("#completedLabel");
    if (label) label.textContent = done + " / " + keys.length + " bajarildi";
    const bar = $("#progressBar");
    if (bar) bar.style.width = Math.round(done / keys.length * 100) + "%";
    const text = $("#progressText");
    if (text) text.textContent = Math.round(done / keys.length * 100) + "% bajarildi";
    const list = $("#progressTasks");
    if (list) list.innerHTML = keys.map((key) => '<div class="progress-item">' +
      (progress[key] ? "✓ " : "○ ") + taskNames[key] + "</div>").join("");
    $$("[data-task]").forEach((input) => { input.checked = progress[input.dataset.task] === true; });
  }
  $$(".nav-link, [data-view]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const name = link.dataset.view;
      if (!name) return;
      event.preventDefault();
      showView(name);
    });
  });
  $("#menuToggle")?.addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $$("[data-task]").forEach((input) => {
    input.addEventListener("change", () => {
      progress[input.dataset.task] = input.checked;
      save();
      toast(input.checked ? "Vazifa bajarildi. Barakalla!" : "Vazifa qayta rejalashtirildi.");
    });
  });
  const quizData = {
    english: { question: "To‘g‘ri javobni tanlang: She ___ a student.", options: ["am", "is", "are"], answer: "is", explanation: "She bilan is ishlatiladi: She is a student." },
    math: { question: "Tenglamani yeching: x + 3 = 7. x nechaga teng?", options: ["3", "4", "10"], answer: "4", explanation: "Har ikki tomondan 3 ni ayiramiz: x = 7 − 3 = 4." }
  };
  $$("[data-quiz]").forEach((button) => {
    button.addEventListener("click", () => {
      const quiz = quizData[button.dataset.quiz];
      if (!quiz) return;
      const choice = window.prompt(quiz.question + "\n\nA) " + quiz.options[0] + "\nB) " + quiz.options[1] + "\nC) " + quiz.options[2] + "\n\nJavob sifatida A, B yoki C yozing.");
      if (choice === null) return;
      const index = ({ A: 0, B: 1, C: 2 })[choice.trim().toUpperCase()];
      if (index === undefined) { toast("A, B yoki C javobidan birini kiriting."); return; }
      const correct = quiz.options[index] === quiz.answer;
      toast((correct ? "To‘g‘ri! " : "Hali to‘g‘ri emas. ") + quiz.explanation);
    });
  });
  const tutorReplies = [
    { terms: ["hello", "salom", "assalom"], reply: "Salom! Bugun English, matematika yoki SAT bo‘yicha kichik dars qilamiz. Qaysi mavzu kerak?" },
    { terms: ["am", "is", "are", "to be"], reply: "“To be” hozirgi zamonda: I am, he/she/it is, you/we/they are. Misol: She is a student — U o‘quvchi." },
    { terms: ["algebra", "tenglama", "x +", "matematika"], reply: "Algebrada noma’lum sonni harf bilan belgilaymiz. Masalan, x + 3 = 7 bo‘lsa, x = 7 − 3 = 4. Avval ikki tomonda bir xil amal bajarishni o‘rganamiz." },
    { terms: ["sat"], reply: "SAT ikki bo‘limdan iborat: Reading and Writing hamda Math. Avval ingliz tili va algebra poydevorini mustahkamlaymiz, keyin vaqt bilan ishlash va test strategiyalariga o‘tamiz." },
    { terms: ["government", "davlat", "siyosat"], reply: "Government davlat institutlari, qonunlar va ommaviy siyosatni o‘rganadi. Boshlash uchun savol: davlat budjeti cheklangan bo‘lsa, qaysi ijtimoiy muammoni birinchi hal qilish kerak va nima uchun?" },
    { terms: ["econom", "iqtisod", "poverty", "kambag"], reply: "Political Economy siyosiy qarorlar va iqtisodiyotning jamiyatga ta’sirini o‘rganadi. Masalan, kambag‘allikni tahlil qilishda daromad, ta’lim, ish o‘rinlari va davlat siyosatini birga ko‘ramiz." }
  ];
  const tutorHistory = [];
  const config = window.SHIRIN_CONFIG || {};
  let accessToken = "";
  async function getAnonymousSession() {
    if (accessToken) return accessToken;
    const cached = safeRead();
    if (typeof cached.authToken === "string" && cached.authToken) {
      accessToken = cached.authToken;
      return accessToken;
    }
    if (!config.supabaseUrl || !config.supabaseAnonKey) return "";
    const response = await fetch(config.supabaseUrl.replace(/\\/$/, "") + "/auth/v1/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": config.supabaseAnonKey },
      body: JSON.stringify({ data: { app: "shirin-ai" } })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token) throw new Error("Anonim kirish yoqilmagan yoki Supabase sozlamasi noto‘g‘ri.");
    accessToken = data.access_token;
    progress.authToken = accessToken;
    save();
    return accessToken;
  }
  async function askTutor(message) {
    const endpointReady = Boolean(config.supabaseUrl && config.supabaseAnonKey && config.tutorFunctionName);
    if (endpointReady) {
      const token = await getAnonymousSession();
      const response = await fetch(
        config.supabaseUrl.replace(/\\/$/, "") + "/functions/v1/" + encodeURIComponent(config.tutorFunctionName),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": config.supabaseAnonKey,
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({ message, history: tutorHistory.slice(-8) })
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "AI xizmatidan javob kelmadi.");
      return data.answer;
    }
    const lower = message.toLowerCase();
    const match = tutorReplies.find((item) => item.terms.some((term) => lower.includes(term)));
    return match ? match.reply : "Bu savol uchun hozircha tayyor demo javobim yo‘q. Haqiqiy AI Ustozni ulash uchun alohida Supabase loyihasi va serverdagi AI kaliti kerak bo‘ladi.";
  }
  $("#tutorForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = $("#tutorInput");
    const message = input.value.trim();
    if (!message) return;
    if (message.length > 2000) { toast("Savol 2000 belgidan oshmasin."); return; }
    appendBubble(message, "user-bubble");
    tutorHistory.push({ role: "user", text: message });
    input.value = "";
    const submit = $('#tutorForm button[type="submit"]');
    if (submit) submit.disabled = true;
    try {
      const reply = await askTutor(message);
      appendBubble(reply, "tutor-bubble");
      tutorHistory.push({ role: "model", text: reply });
    } catch (error) {
      appendBubble(error instanceof Error ? error.message : "Noma’lum xatolik yuz berdi.", "tutor-bubble");
    } finally {
      if (submit) submit.disabled = false;
      input.focus();
    }
  });
  function appendBubble(message, className) {
    const box = $("#chatMessages");
    if (!box) return;
    const bubble = document.createElement("div");
    bubble.className = "bubble " + className;
    bubble.textContent = message;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
  }
  $("#todayLabel").textContent = new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "short", year: "numeric" }).format(new Date());
  renderProgress();
  showView((location.hash || "#home").slice(1));
})();