(() => {
  "use strict";
  const views = ["home", "english", "math", "sat", "government", "economics", "tutor", "progress"];
  const titles = {
    home: "Xush kelibsiz!", english: "Ingliz tili", math: "Matematika",
    sat: "SAT tayyorgarlik", government: "Government & Politics",
    economics: "Political Economy", tutor: "AI Ustoz", progress: "O‘quv natijalari"
  };
  const taskNames = { english: "English Foundation", math: "Mathematics", thinking: "Critical Thinking" };
  const storageKey = "shirin-ai-progress-v2";
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
    syncProgressToCloud();
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
    if (list) {
      const tasks = keys.map((key) => '<div class="progress-item">' + (progress[key] ? "✓ " : "○ ") + taskNames[key] + "</div>").join("");
      const scores = progress.quizScores || {};
      const quizRows = Object.entries(scores).map(([key, result]) => '<div class="progress-item">' +
        (result.correct ? "✓ " : "↻ ") + ({ english: "English", math: "Math", sat: "SAT", government: "Government", economics: "Political Economy" }[key] || key) +
        " — " + (result.correct ? "to‘g‘ri" : "qayta mashq") + "</div>").join("");
      list.innerHTML = tasks + (quizRows ? '<div class="progress-subtitle">FAN MASHQLARI</div>' + quizRows : "");
    }
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
  const quizData = window.SHIRIN_QUESTION_BANK || {};
  $$("[data-quiz]").forEach((button) => {
    button.addEventListener("click", () => {
      const bank = quizData[button.dataset.quiz];
      if (!Array.isArray(bank) || !bank.length) { toast("Bu fan uchun savollar topilmadi."); return; }
      const quiz = bank[Math.floor(Math.random() * bank.length)];
      const [question, options, answerIndex, explanation] = quiz;
      const choice = window.prompt(question + "\\n\\nA) " + options[0] + "\\nB) " + options[1] + "\\nC) " + options[2] + "\\n\\nA, B yoki C javobini yozing.");
      if (choice === null) return;
      const index = ({ A: 0, B: 1, C: 2 })[choice.trim().toUpperCase()];
      if (index === undefined) { toast("A, B yoki C javobidan birini kiriting."); return; }
      const correct = index === answerIndex;
      progress.quizScores = progress.quizScores || {};
      const previous = progress.quizScores[button.dataset.quiz] || { attempts: 0, correctCount: 0 };
      const attempts = (previous.attempts || 0) + 1;
      const correctCount = (previous.correctCount || 0) + (correct ? 1 : 0);
      progress.quizScores[button.dataset.quiz] = { correct, answer: options[answerIndex], attempts, correctCount, at: new Date().toISOString() };
      save();
      toast((correct ? "To‘g‘ri! " : "To‘g‘ri javob: " + options[answerIndex] + ". ") + explanation + " (" + correctCount + "/" + attempts + " to‘g‘ri)");
    });
  });

  function renderCurriculum() {
    const curriculum = window.SHIRIN_CURRICULUM || {};
    [["english", "englishCurriculum"], ["math", "mathCurriculum"]].forEach(([subject, targetId]) => {
      const target = document.getElementById(targetId);
      if (!target || !Array.isArray(curriculum[subject])) return;
      target.innerHTML = '<div class="curriculum-heading"><span class="lesson-label">KUNLIK DARS REJASI</span><b>20 daqiqa dars + 10 daqiqa uyga vazifa</b><small>Har mavzuda tushuntirish, takrorlash, bilim o‘yini va 50 ta mashq.</small></div>' +
        curriculum[subject].map((lesson, index) => {
          const key = subject + "-" + index;
          const done = progress.completedLessons && progress.completedLessons[key];
          return '<details class="curriculum-card"><summary><span class="curriculum-number">' + (index + 1) + '</span><span><b>' + lesson.title + '</b><small>' + lesson.time + (done ? ' • Bajarildi ✓' : '') + '</small></span><span class="curriculum-chevron">＋</span></summary>' +
            '<div class="curriculum-body"><h4>📘 20 daqiqalik dars</h4><p>' + lesson.lesson + '</p><h4>📝 10 daqiqalik uyga vazifa</h4><p>' + lesson.homework + '</p><h4>🔁 Takrorlash</h4><p>' + lesson.review + '</p><h4>🎮 Bilimni mustahkamlash o‘yini</h4><p>' + lesson.game + '</p>' +
            '<div class="curriculum-actions"><button type="button" class="secondary-btn curriculum-practice" data-subject="' + subject + '">50 ta mashqni boshlash</button><button type="button" class="secondary-btn curriculum-done" data-lesson="' + key + '">Darsni tugatdim ✓</button></div></div></details>';
        }).join("");
    });
  }
  let practiceSession = null;
  function startFullPractice(subject) {
    const source = quizData[subject];
    if (!Array.isArray(source) || !source.length) { toast("Bu fan uchun savollar topilmadi."); return; }
    const questions = source.slice().sort(() => Math.random() - 0.5);
    practiceSession = { subject, questions, index: 0, score: 0, answered: false };
    let modal = document.getElementById("practiceModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "practiceModal";
      modal.className = "practice-modal";
      modal.innerHTML = '<section class="practice-dialog" role="dialog" aria-modal="true" aria-labelledby="practiceTitle"><button type="button" class="practice-close" aria-label="Yopish">×</button><div class="practice-kicker">SHIRIN AI • BILIMNI MUSTAHKAMLASH</div><h2 id="practiceTitle">Fan mashqi</h2><div class="practice-progress"><span id="practiceProgressFill"></span></div><div class="practice-meta" id="practiceMeta"></div><h3 id="practiceQuestion"></h3><div id="practiceOptions" class="practice-options"></div><p id="practiceExplanation" class="practice-explanation"></p><button type="button" id="practiceNext" class="primary-btn" disabled>Keyingi savol →</button></section>';
      document.body.appendChild(modal);
      modal.querySelector(".practice-close").addEventListener("click", () => { modal.classList.remove("open"); practiceSession = null; });
      modal.addEventListener("click", (event) => { if (event.target === modal) { modal.classList.remove("open"); practiceSession = null; } });
      modal.querySelector("#practiceNext").addEventListener("click", () => {
        if (!practiceSession || !practiceSession.answered) return;
        practiceSession.index += 1;
        if (practiceSession.index >= practiceSession.questions.length) {
          const finished = practiceSession;
          const previous = (progress.quizScores || {})[finished.subject] || { attempts: 0, correctCount: 0 };
          const attempts = (previous.attempts || 0) + finished.questions.length;
          const correctCount = (previous.correctCount || 0) + finished.score;
          progress.quizScores = progress.quizScores || {};
          progress.quizScores[finished.subject] = { correct: finished.score === finished.questions.length, answer: finished.score + "/" + finished.questions.length, attempts, correctCount, lastScore: finished.score, lastTotal: finished.questions.length, at: new Date().toISOString() };
          save();
          modal.querySelector(".practice-dialog").innerHTML = '<button type="button" class="practice-close" aria-label="Yopish">×</button><div class="practice-kicker">MASHQ YAKUNLANDI</div><h2>Natijang</h2><div class="practice-result">' + finished.score + ' / ' + finished.questions.length + '</div><p class="practice-explanation">To‘g‘ri javoblar: ' + Math.round(finished.score / finished.questions.length * 100) + '%. Xatolarni qayta ko‘rib, yana mashq qil.</p><button type="button" class="primary-btn" id="practiceFinish">Yakunlash</button>';
          modal.querySelector(".practice-close").addEventListener("click", () => modal.classList.remove("open"));
          modal.querySelector("#practiceFinish").addEventListener("click", () => modal.classList.remove("open"));
          return;
        }
        renderPracticeQuestion();
      });
    }
    modal.classList.add("open");
    renderPracticeQuestion();
  }
  function renderPracticeQuestion() {
    const modal = document.getElementById("practiceModal");
    const session = practiceSession;
    if (!modal || !session) return;
    const [question, options, answerIndex, explanation] = session.questions[session.index];
    modal.querySelector("#practiceTitle").textContent = session.subject === "english" ? "English mashqi" : "Matematika mashqi";
    modal.querySelector("#practiceMeta").textContent = "Savol " + (session.index + 1) + " / " + session.questions.length + " • To‘g‘ri: " + session.score;
    modal.querySelector("#practiceProgressFill").style.width = ((session.index) / session.questions.length * 100) + "%";
    modal.querySelector("#practiceQuestion").textContent = question;
    modal.querySelector("#practiceExplanation").textContent = "";
    const choices = modal.querySelector("#practiceOptions");
    choices.replaceChildren();
    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "practice-option";
      button.textContent = String.fromCharCode(65 + index) + ". " + option;
      button.addEventListener("click", () => {
        if (session.answered) return;
        session.answered = true;
        const correct = index === answerIndex;
        if (correct) session.score += 1;
        Array.from(choices.children).forEach((item, i) => {
          item.disabled = true;
          if (i === answerIndex) item.classList.add("is-correct");
          else if (i === index) item.classList.add("is-wrong");
        });
        modal.querySelector("#practiceExplanation").textContent = (correct ? "To‘g‘ri! " : "To‘g‘ri javob: " + options[answerIndex] + ". ") + explanation;
        modal.querySelector("#practiceNext").disabled = false;
        modal.querySelector("#practiceNext").textContent = session.index === session.questions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol →";
        modal.querySelector("#practiceMeta").textContent = "Savol " + (session.index + 1) + " / " + session.questions.length + " • To‘g‘ri: " + session.score;
      });
      choices.appendChild(button);
    });
    session.answered = false;
    modal.querySelector("#practiceNext").disabled = true;
    modal.querySelector("#practiceNext").textContent = "Javobni tanlang";
  }

  document.addEventListener("click", (event) => {
    const practice = event.target.closest(".curriculum-practice");
    if (practice) startFullPractice(practice.dataset.subject);
    const done = event.target.closest(".curriculum-done");
    if (done) {
      progress.completedLessons = progress.completedLessons || {};
      progress.completedLessons[done.dataset.lesson] = true;
      save();
      renderCurriculum();
      toast("Dars bajarildi. Barakalla!");
    }
  });

  const tutorHistory = [];
  let tutorStep = 0;
  let tutorTopic = "english";
  const tutorLessons = {
    english: {
      title: "To be: am / is / are",
      intro: "“To be” fe’li “bo‘lmoq” ma’nosini beradi. Hozirgi zamonda uch shakli bor: am, is, are. I bilan am; he, she, it bilan is; you, we, they bilan are ishlatiladi.",
      examples: "Misollar:\n• I am a student. — Men o‘quvchiman.\n• She is happy. — U xursand.\n• We are ready. — Biz tayyormiz.",
      question: "Endi sen urinib ko‘r: “We ___ students.” Bo‘sh joyga am, is yoki are dan qaysi biri mos?",
      answers: ["are", "we are", "we are students"],
      explain: "To‘g‘ri javob — are. We bilan are ishlatiladi: We are students."
    },
    math: {
      title: "Tenglama: x + 3 = 7",
      intro: "Tenglama — noma’lum qiymatni topish vazifasi. x + 3 = 7 da x ni yolg‘iz qoldirish uchun ikkala tomondan ham 3 ni ayiramiz.",
      examples: "7 − 3 = 4, demak x = 4. Tekshirish: 4 + 3 = 7.",
      question: "Mashq: x + 5 = 9 bo‘lsa, x nechaga teng? Faqat sonni yoz.",
      answers: ["4"],
      explain: "To‘g‘ri! 9 − 5 = 4. Tekshirish: 4 + 5 = 9."
    },
    sat: {
      title: "SAT bilan tanishuv",
      intro: "SAT ikki asosiy bo‘limdan iborat: Reading and Writing hamda Math. Tayyorgarlikni ingliz tili, algebra va matnni tahlil qilishdan boshlaymiz.",
      examples: "Reading and Writing — matn, dalil, grammatika. Math — algebra, funksiyalar, geometriya va masalalar.",
      question: "SAT Math bo‘limida qaysi fan ko‘nikmalari ko‘proq kerak bo‘ladi: algebra yoki tarix?",
      answers: ["algebra"],
      explain: "To‘g‘ri — algebra SAT Math uchun muhim asoslardan biri."
    },
    government: {
      title: "Davlat va jamoat siyosati",
      intro: "Government davlat institutlari, qonunlar va qarorlar qanday qabul qilinishini o‘rganadi. Public policy esa jamiyat muammolarini hal qilishga qaratilgan siyosat va dasturlarni tahlil qiladi.",
      examples: "Masalan, ta’lim sifatini oshirish uchun budjet, o‘qituvchi tayyorlash va maktab infratuzilmasi birgalikda ko‘rib chiqiladi.",
      question: "Seningcha, ta’lim sifatini oshirishda qaysi omil muhimroq? O‘z fikringni bir-ikki gapda yoz.",
      answers: [],
      explain: "Yaxshi tahlil! Fikringni dalil va misol bilan asoslashga harakat qil."
    },
    economics: {
      title: "Political Economy asoslari",
      intro: "Political Economy siyosiy qarorlar va iqtisodiyot o‘rtasidagi aloqani o‘rganadi. Davlat budjeti, ish o‘rinlari, ta’lim va kambag‘allik bir-biriga ta’sir qiladi.",
      examples: "Masalan, kasb-hunar ta’limiga sarmoya kiritish odamlarning ish topish imkoniyatini oshirishi mumkin.",
      question: "Kasbiy ta’limga sarmoya kiritish nima sababdan kambag‘allikni kamaytirishga yordam berishi mumkin?",
      answers: [],
      explain: "Mantiqli fikr. Kasbiy ko‘nikmalar ish topish va daromad olish imkoniyatlarini kengaytirishi mumkin."
    }
  };
  const normalizeAnswer = (value) => value.toLowerCase().trim().replace(/[.!?,]/g, "");
  function startTutorLesson(topic) {
    tutorTopic = tutorLessons[topic] ? topic : "english";
    tutorStep = 0;
    const lesson = tutorLessons[tutorTopic];
    appendBubble("Dars: " + lesson.title + "\\n\\n" + lesson.intro + "\\n\\n" + lesson.examples + "\\n\\n" + lesson.question, "tutor-bubble");
    tutorStep = 1;
  }
  function respondTutor(message) {
    const text = normalizeAnswer(message);
    if (/^(salom|assalom|hello|hi)$/.test(text)) {
      return "Salom! Men Shirin-AI o‘quv ustoziman. English, matematika, SAT, Government yoki Political Economy bo‘yicha yordam beraman. Qaysi mavzuni boshlaymiz?";
    }
    if (tutorStep === 1) {
      const lesson = tutorLessons[tutorTopic];
      if (lesson.answers.length === 0) {
        tutorStep = 2;
        return lesson.explain + "\\n\\nYana qaysi jihatini chuqurroq tushuntirib beray?";
      }
      if (lesson.answers.includes(text)) {
        tutorStep = 2;
        return "Barakalla! " + lesson.explain + "\\n\\nYana bitta mashq yoki boshqa mavzuni boshlashimiz mumkin.";
      }
      return "Hali to‘g‘ri emas. Shoshilma, misolga qaytamiz. " + lesson.explain + "\\n\\nYana bir marta urinib ko‘r: " + lesson.question;
    }
    const routes = [
      { keys: ["english", "ingliz", "to be", "am", "is", "are", "grammar"], topic: "english" },
      { keys: ["matematika", "algebra", "tenglama", "math"], topic: "math" },
      { keys: ["sat"], topic: "sat" },
      { keys: ["government", "davlat", "siyosat", "huquq"], topic: "government" },
      { keys: ["econom", "iqtisod", "kambag", "poverty", "budjet"], topic: "economics" }
    ];
    const route = routes.find((item) => item.keys.some((key) => text.includes(key)));
    if (route) {
      const lesson = tutorLessons[route.topic];
      tutorTopic = route.topic;
      tutorStep = 1;
      return "Albatta! " + lesson.title + "\\n\\n" + lesson.intro + "\\n\\n" + lesson.examples + "\\n\\n" + lesson.question;
    }
    return "Savolingni oldim. Uni aniqroq tushunishim uchun qaysi fan bilan bog‘liqligini yoz: English, Math, SAT, Government yoki Political Economy. Masalan, “kambag‘allik sabablari”, “kvadrat tenglama” yoki “demokratiya nima?”";
  }
  const config = window.SHIRIN_CONFIG || {};
  let firebaseReady = false;
  let cloudUser = null;
  let cloudDb = null;
  async function initializeCloud() {
    if (!config.firebaseConfig || !config.firebaseConfig.apiKey || !window.firebase) return;
    try {
      if (!window.firebase.apps.length) window.firebase.initializeApp(config.firebaseConfig);
      const auth = window.firebase.auth();
      cloudDb = window.firebase.firestore();
      const credential = await auth.signInAnonymously();
      cloudUser = credential.user;
      firebaseReady = true;
      const snapshot = await cloudDb.collection("learners").doc(cloudUser.uid).get();
      if (snapshot.exists && snapshot.data().progress) {
        progress = { ...progress, ...snapshot.data().progress };
        try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch {}
        renderProgress();
      }
      toast("Shirin-AI bulut xotirasiga ulandi.");
    } catch (error) {
      console.warn("Firebase ulanishi hozircha mavjud emas:", error);
    }
  }
  async function syncProgressToCloud() {
    if (!firebaseReady || !cloudUser || !cloudDb) return;
    try {
      await cloudDb.collection("learners").doc(cloudUser.uid).set({
        progress, updatedAt: window.firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.warn("Bulutga saqlash amalga oshmadi:", error);
    }
  }
  async function askTutor(message) {
    if (config.tutorEndpoint) {
      const response = await fetch(config.tutorEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: tutorHistory.slice(0, -1).slice(-8) })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.answer) throw new Error(data.error || "AI xizmatidan javob kelmadi.");
      return data.answer;
    }
    return respondTutor(message);
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
      if (window.speechSynthesis && $("#voiceReply")?.checked) speakTutor(reply);
    } catch (error) {
      appendBubble(error instanceof Error ? error.message : "Noma’lum xatolik yuz berdi.", "tutor-bubble");
    } finally {
      if (submit) submit.disabled = false;
      input.focus();
    }
  });
  function speakTutor(message) {
    if (!("speechSynthesis" in window)) { toast("Bu brauzer ovozli javobni qo‘llamaydi."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "uz-UZ";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  }
  $("#stopVoice")?.addEventListener("click", () => window.speechSynthesis?.cancel());
  $$("[data-tutor-topic]").forEach((button) => button.addEventListener("click", () => {
    startTutorLesson(button.dataset.tutorTopic);
  }));
  $("#voiceInput")?.addEventListener("click", () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.isSecureContext) {
      toast("Ovozli kiritish uchun sayt HTTPS orqali ochilishi kerak.");
      return;
    }
    if (!SpeechRecognition) {
      toast("Bu brauzer ovozli kiritishni qo‘llamaydi. Saytni Chrome brauzerida oching.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "uz-UZ";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => toast("Mikrofon tinglayapti. Hozir gapiring…");
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (!transcript) { toast("Ovoz aniqlanmadi. Yana urinib ko‘ring."); return; }
      $("#tutorInput").value = transcript;
      $("#tutorInput").focus();
      toast("Ovoz matnga aylantirildi. Yuborish tugmasini bosing.");
    };
    recognition.onnomatch = () => toast("Nutq aniqlanmadi. Sekinroq va aniqroq gapirib ko‘ring.");
    recognition.onerror = (event) => {
      const messages = {
        "not-allowed": "Mikrofon ruxsati bloklangan. Chrome sayt sozlamalaridan mikrofonni yoqing.",
        "service-not-allowed": "Brauzer ovoz xizmatiga ruxsat bermadi. Chrome orqali qayta urinib ko‘ring.",
        "audio-capture": "Mikrofon topilmadi yoki boshqa ilova foydalanmoqda.",
        "network": "Ovoz xizmati tarmoqqa ulana olmadi. Internetni tekshiring.",
        "language-not-supported": "O‘zbekcha ovoz tanish bu qurilmada qo‘llanmasligi mumkin.",
        "no-speech": "Ovoz eshitilmadi. Tugmani bosgach darhol gapiring."
      };
      toast(messages[event.error] || ("Ovozli kiritish xatosi: " + event.error));
    };
    try {
      recognition.start();
    } catch (error) {
      toast("Mikrofonni ishga tushirib bo‘lmadi. Sahifani yangilab, qayta urinib ko‘ring.");
      console.warn("Speech recognition start error:", error);
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
  renderCurriculum();
  showView((location.hash || "#home").slice(1));
  initializeCloud();
})();