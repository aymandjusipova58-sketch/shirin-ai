/* Shirin-AI beginner curriculum: original offline practice items. */
(() => {
  const bank = window.SHIRIN_QUESTION_BANK || (window.SHIRIN_QUESTION_BANK = {});
  const english = [];
  const add = (q, opts, answer, why) => english.push([q, opts, answer, why]);
  const toBe = [
    ["I ___ a student.",["am","is","are"],0,"I bilan am ishlatiladi."],
    ["She ___ my friend.",["am","are","is"],2,"She bilan is ishlatiladi."],
    ["They ___ happy.",["is","am","are"],2,"They bilan are ishlatiladi."],
    ["We ___ at school.",["are","is","am"],0,"We bilan are ishlatiladi."],
    ["He ___ a teacher.",["are","is","am"],1,"He bilan is ishlatiladi."],
    ["You ___ kind.",["am","are","is"],1,"You bilan are ishlatiladi."],
    ["It ___ a book.",["are","is","am"],1,"It bilan is ishlatiladi."],
    ["My parents ___ at home.",["is","are","am"],1,"Ko‘plikdagi parents bilan are."],
    ["The cat ___ small.",["am","are","is"],2,"Bitta narsa: it → is."],
    ["I ___ ready.",["is","am","are"],1,"I am ready — Men tayyorman."]
  ];
  toBe.forEach(x=>add(...x));
  const pronouns = [
    ["___ am from Uzbekistan.",["I","He","They"],0,"I — men."],
    ["Ali is a boy. ___ is kind.",["She","He","It"],1,"Ali uchun he ishlatiladi."],
    ["Malika is a girl. ___ is clever.",["He","She","We"],1,"Malika uchun she ishlatiladi."],
    ["The dog is small. ___ is cute.",["It","They","I"],0,"Hayvon yoki narsa uchun it."],
    ["My friends are here. ___ are happy.",["We","They","He"],1,"Friends ko‘plik, shuning uchun they."],
    ["You and I are students. ___ are students.",["We","They","She"],0,"You and I = we."],
    ["This is my book. ___ is new.",["He","It","They"],1,"Book — narsa, it."],
    ["My mother is a doctor. ___ works here.",["He","She","It"],1,"Mother uchun she."],
    ["The boys are tall. ___ play football.",["He","They","It"],1,"Boys ko‘plik, they."],
    ["I have a sister. ___ is ten.",["She","He","We"],0,"Sister uchun she."]
  ];
  pronouns.forEach(x=>add(...x));
  const articles = [
    ["I have ___ apple.",["a","an","the"],1,"Apple unli tovush bilan boshlanadi: an apple."],
    ["He is ___ teacher.",["an","a","the"],1,"Teacher undosh tovush bilan boshlanadi: a teacher."],
    ["She has ___ orange.",["a","an","are"],1,"Orange oldidan an ishlatiladi."],
    ["This is ___ book.",["a","an","am"],0,"Book oldidan a."],
    ["It is ___ egg.",["a","an","the"],1,"Egg unli tovush bilan boshlanadi: an egg."],
    ["I see ___ cat.",["an","a","are"],1,"Cat oldidan a."],
    ["He eats ___ banana.",["a","an","is"],0,"Banana undosh tovush bilan boshlanadi."],
    ["She is ___ honest person.",["a","an","the"],1,"Honest so‘zida h talaffuz qilinmaydi."],
    ["This is ___ umbrella.",["a","an","am"],1,"Umbrella unli tovush bilan boshlanadi."],
    ["I need ___ pen.",["an","a","is"],1,"Pen oldidan a."]
  ];
  articles.forEach(x=>add(...x));
  const vocabulary = [
    ["What does 'book' mean?",["kitob","maktab","qalam"],0,"Book — kitob."],
    ["What does 'water' mean?",["non","suv","uy"],1,"Water — suv."],
    ["What does 'school' mean?",["maktab","do‘st","oila"],0,"School — maktab."],
    ["What does 'friend' mean?",["ustoz","do‘st","shahar"],1,"Friend — do‘st."],
    ["What does 'family' mean?",["oila","dars","kun"],0,"Family — oila."],
    ["What does 'beautiful' mean?",["tez","chiroyli","qiyin"],1,"Beautiful — chiroyli."],
    ["What does 'small' mean?",["katta","kichik","uzun"],1,"Small — kichik."],
    ["What does 'learn' mean?",["o‘rganmoq","uxlamoq","yugurmoq"],0,"Learn — o‘rganmoq."],
    ["What does 'happy' mean?",["xafa","xursand","och"],1,"Happy — xursand."],
    ["What does 'today' mean?",["kecha","ertaga","bugun"],2,"Today — bugun."]
  ];
  vocabulary.forEach(x=>add(...x));
  const present = [
    ["She ___ English every day.",["study","studies","studying"],1,"She/he/it bilan Present Simple fe’liga -s yoki -es qo‘shiladi."],
    ["I ___ breakfast at seven.",["eat","eats","eating"],0,"I bilan fe’lning asosiy shakli ishlatiladi."],
    ["He ___ football on Sundays.",["play","plays","playing"],1,"He bilan plays."],
    ["They ___ to school by bus.",["go","goes","going"],0,"They bilan go."],
    ["My brother ___ books.",["read","reads","reading"],1,"My brother = he, shuning uchun reads."],
    ["We ___ Uzbek and English.",["speaks","speak","speaking"],1,"We bilan speak."],
    ["The sun ___ in the east.",["rise","rises","rising"],1,"The sun — it, shuning uchun rises."],
    ["You ___ very well.",["sing","sings","singing"],0,"You bilan sing."],
    ["A teacher ___ students.",["help","helps","helping"],1,"A teacher — he/she/it, helps."],
    ["My friends ___ music.",["likes","like","liking"],1,"Friends ko‘plik, like."]
  ];
  present.forEach(x=>add(...x));
  const math = [];
  const m = (q, opts, ans, why) => math.push([q,opts,ans,why]);
  for(let i=1;i<=10;i++){const a=i+2,b=i+4,v=a+b;m(`Solve: ${a} + ${b} = ?`,[String(v-1),String(v),String(v+1)],1,`${a} + ${b} = ${v}.`);}
  for(let i=1;i<=10;i++){const a=i+12,b=i,v=a-b;m(`Solve: ${a} − ${b} = ?`,[String(v),String(v+2),String(v-1)],0,`${a} − ${b} = ${v}.`);}
  for(let i=1;i<=10;i++){const a=i+1,b=2,v=a*b;m(`Solve: ${a} × ${b} = ?`,[String(v+2),String(v),String(v-1)],1,`${a} × ${b} = ${v}.`);}
  for(let i=1;i<=10;i++){const b= i+1, v=i+2, a=b*v;m(`Solve: ${a} ÷ ${b} = ?`,[String(v-1),String(v),String(v+1)],1,`${a} ÷ ${b} = ${v}.`);}
  bank.english = english;
  bank.math = math;
  window.SHIRIN_CURRICULUM = {
    english: [
      {title:"1-dars: Salomlashish va tanishish",time:"20 daqiqa",lesson:"Hello — salom. My name is ... — Mening ismim ... . I am a student — Men o‘quvchiman. What is your name? — Ismingiz nima? Darsda iboralarni ovoz chiqarib 3 martadan takrorla.",homework:"10 daqiqa: 5 ta yangi iborani yodla va o‘zing haqingda 3 ta sodda gap tuz.",review:"Oldingi iboralarni tarjima qil: Hello, student, name, school, friend.",game:"So‘z topish: book, water, school, friend, family so‘zlarining ma’nosini top."},
      {title:"2-dars: I / you / he / she / it / we / they",time:"20 daqiqa",lesson:"I — men; you — sen/siz; he — u (o‘g‘il); she — u (qiz); it — u (narsa/hayvon); we — biz; they — ular. Olmosh gapda kim haqida gap ketayotganini bildiradi.",homework:"10 daqiqa: 7 ta olmosh bilan bittadan sodda gap yoz.",review:"I, she, they olmoshlarini o‘zbekchaga tarjima qil.",game:"Tez tanla: Malika = she; Ali = he; books = they."},
      {title:"3-dars: To be — am / is / are",time:"20 daqiqa",lesson:"I am; he/she/it is; you/we/they are. To be kim yoki qanday ekanini aytadi. I am happy — Men xursandman. She is a student — U o‘quvchi. They are ready — Ular tayyor.",homework:"10 daqiqa: am, is, are qatnashgan 10 ta gap tuz.",review:"I bilan am, she bilan is, they bilan are ishlatilishini esla.",game:"Bo‘sh joyni to‘ldir: We __ ready; He __ kind; I __ here."},
      {title:"4-dars: A / an artikllari va sodda so‘zlar",time:"20 daqiqa",lesson:"A va an bitta sanaladigan narsani bildiradi. Undosh tovushdan oldin a: a book, a pen. Unli tovushdan oldin an: an apple, an egg. Talaffuzga e’tibor ber.",homework:"10 daqiqa: uy atrofidagi 10 ta narsani a yoki an bilan yoz.",review:"Book, apple, egg, pen so‘zlarini takrorla.",game:"A yoki an tanla: ___ orange, ___ bag, ___ umbrella."}
    ],
    math: [
      {title:"1-dars: Sonlar va qo‘shish",time:"20 daqiqa",lesson:"Son — miqdorni bildiradi. Qo‘shish ikki yoki undan ortiq miqdorni birlashtiradi. Masalan, 3 + 2 = 5. Son chizig‘ida o‘ngga yurish qo‘shishni bildiradi.",homework:"10 daqiqa: 1 dan 20 gacha sonlarni yoz va 10 ta qo‘shish misolini yech.",review:"5+2, 8+1, 10+4 misollarini qayta yech.",game:"Tez hisob: 7+3, 6+5, 9+4, 8+8."},
      {title:"2-dars: Ayirish",time:"20 daqiqa",lesson:"Ayirish — miqdordan bir qismini olib tashlash. 9 − 4 = 5. Qo‘shish ayirishni tekshirishga yordam beradi: 5 + 4 = 9.",homework:"10 daqiqa: 10 ta ayirish misoli tuz va yech.",review:"12−5, 15−7, 9−3 ni takrorla.",game:"Natijani top: 14−6, 18−9, 20−8."},
      {title:"3-dars: Ko‘paytirish va bo‘lish",time:"20 daqiqa",lesson:"Ko‘paytirish — bir xil sonni takroran qo‘shish. 3×4 = 3+3+3+3 = 12. Bo‘lish — teng guruhlarga ajratish: 12÷3 = 4.",homework:"10 daqiqa: 2, 3, 4 va 5 karra jadvalidan mashq qil.",review:"3×4, 5×2, 12÷3, 20÷5 ni qayta yech.",game:"Juftini top: 4×3 va 12; 15÷5 va 3."},
      {title:"4-dars: O‘zgaruvchi va sodda tenglama",time:"20 daqiqa",lesson:"O‘zgaruvchi noma’lum son o‘rnida ishlatiladigan harf. x + 3 = 7 bo‘lsa, x ni topish uchun 7−3 qilamiz. Demak x=4. Tekshirish: 4+3=7.",homework:"10 daqiqa: x+2=6, x−3=5, 2x=10 tenglamalarini yech.",review:"x+1=4 va x+5=9 ni takrorla.",game:"Sirli son: qaysi son ustiga 6 qo‘shilsa 11 bo‘ladi?"}
    ]
  };
})();