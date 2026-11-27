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
  const extraMath = [
    ["Half of 18 is …",["8","9","10"],1,"Yarim — ikkiga bo‘lish: 18 ÷ 2 = 9."],
    ["What is 10% of 50?",["5","10","15"],0,"10% — o‘ndan bir qism: 50 ÷ 10 = 5."],
    ["Which fraction is equal to one half?",["1/3","2/4","3/4"],1,"2/4 qisqartirilsa 1/2 bo‘ladi."],
    ["What is the perimeter of a square with side 3 cm?",["9 cm","12 cm","6 cm"],1,"Perimetr = 4 × tomon = 4 × 3 = 12 cm."],
    ["Round 47 to the nearest ten.",["40","50","60"],1,"Birlar xonasi 7, shuning uchun 50 ga yaxlitlanadi."],
    ["Which number is even?",["13","17","24"],2,"Juft son 2 ga qoldiqsiz bo‘linadi."],
    ["Solve: 5 + 2 × 3.",["21","11","15"],1,"Avval ko‘paytirish: 2×3=6, so‘ng 5+6=11."],
    ["How many minutes are in 2 hours?",["60","100","120"],2,"Bir soat 60 daqiqa; 2×60=120."],
    ["A triangle has how many sides?",["3","4","5"],0,"Uchburchakning 3 tomoni bor."],
    ["What is 3/4 of 20?",["10","15","18"],1,"20 ÷ 4 = 5; 5 × 3 = 15."]
  ];
  extraMath.forEach(x=>math.push(x));
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
  // Expanded lessons for all five learning tracks.
  const makeLessons = rows => rows.map(([title,lesson,homework,review,game])=>({title,time:'20 daqiqa',lesson,homework:'10 daqiqa: '+homework,review,game}));
  window.SHIRIN_CURRICULUM.english.push(...makeLessons([["Ko‘plik otlar","Ko‘plikda odatda -s: book—books; -s, -sh, -ch, -x dan keyin ko‘pincha -es: box—boxes.","10 ta birlik otni ko‘plikka aylantir.","book/books, box/boxes.","Birlik va ko‘plik juftlarini top."],["Have / has","I/you/we/they have; he/she/it has. Misol: I have a book. She has a pen.","Have/has bilan 8 ta gap yoz.","I have; he has; they have.","Kimda nima borligini ayt."],["Present Simple","Odatlar uchun: I study every day. He studies every day. He/she/it bilan fe’lga -s qo‘shiladi.","Kundalik tartibing haqida 6 gap yoz.","Every day, usually, always.","Kun tartibini 5 gapda ayt."],["Do / does savollari","I/you/we/they bilan do; he/she/it bilan does: Do you read? Does she work?","5 ta do va 5 ta does savoli tuz.","Do they play? Does he study?","Savollarga qisqa javob ber."],["Inkor gaplar","Present Simple inkori don’t yoki doesn’t bilan: I don’t swim. She doesn’t drive.","5 ta gapni inkor shakliga o‘tkaz.","He doesn’t work; we don’t know.","Xato inkor gaplarni tuzat."],["Present Continuous","Hozir davom etayotgan ish: am/is/are + fe’l-ing. She is reading now.","Hozir sodir bo‘layotgan 5 ishni yoz.","I am learning; they are playing.","What are they doing? savoliga javob ber."],["Joy predloglari","In — ichida, on — ustida, under — ostida, next to — yonida, behind — orqasida.","Xonang haqida 8 gap yoz.","The book is on the table.","Buyum joylashuvini tasvirla."],["Sifatlar va taqqoslash","Qisqa sifatlarda -er: tall—taller; uzun sifatlarda more: more interesting. Eng yuqori daraja: the tallest.","5 juft narsani taqqosla.","small/smaller; beautiful/more beautiful.","Ikki narsani 3 jihatdan taqqosla."],["Past Simple: was / were","I/he/she/it was; you/we/they were. Yesterday I was at home.","Was/were bilan 8 gap yoz.","I was; they were.","Kecha haqida 5 gap tuz."],["Past Simple fe’llar","Muntazam fe’llarga -ed: work—worked; noto‘g‘ri fe’llar: go—went, see—saw.","10 ta fe’lning o‘tgan zamonini yoz.","go/went; play/played.","Hozirgi va o‘tgan shakllarni juftla."],["Kelasi zamon: will","Will kelajak taxmini, va’da yoki tezkor qaror uchun: I will help you.","Kelajak haqida 6 gap yoz.","Tomorrow, next year, will.","Kelajak rejangni ayt."],["Going to","Am/is/are going to oldindan rejalashtirilgan ish uchun: I am going to study tonight.","Hafta rejang haqida 6 gap yoz.","I am going to read.","Rasmga qarab reja tuz."],["Can va must","Can qobiliyat/ruxsat; must zarurat: I can swim. You must follow the rules.","Can va must bilan 5 tadan gap yoz.","Can you help? We must learn.","Vaziyatga mos modal fe’lni tanla."],["Savol so‘zlari","Who—kim, what—nima, where—qayerda, when—qachon, why—nega, how—qanday.","Har bir so‘z bilan bittadan savol yoz.","Where do you live?","6 ta savol tuz."]]));
  window.SHIRIN_CURRICULUM.math.push(...makeLessons([["Xona qiymati","4,582 da 4 minglik, 5 yuzlik, 8 o‘nlik, 2 birlik. Har raqam o‘z xonasiga ega.","10 ta sonni xona qiymatiga ajrat.","46≈50; 42≈40.","Sonni kengaytirilgan shaklda yoz."],["Amallar tartibi","Avval qavs, keyin ko‘paytirish/bo‘lish, so‘ng qo‘shish/ayirish. 5+2×3=11.","10 ta aralash amal yech.","(5+2)×3=21.","To‘g‘ri yechimni izohla."],["Kasrlar","Kasr butunning teng qismini bildiradi. Surat yuqorida, maxraj pastda: 3/4 — to‘rtdan uch.","1/2, 1/3, 3/4 ni rasmda ko‘rsat.","1/2 — yarim; 1/4 — chorak.","Rasmga mos kasrni tanla."],["Kasrni qisqartirish","Surat va maxrajni bir xil songa bo‘lsak qiymat o‘zgarmaydi: 2/4=1/2.","10 ta kasrni qisqartir.","3/6=1/2; 4/8=1/2.","Teng kasr juftlarini top."],["O‘nli kasrlar","Verguldan keyingi xona o‘ndan bir, yuzdan birni bildiradi. 0.5=5/10=1/2.","O‘nli kasrlarni oddiy kasrga aylantir.","0.25=1/4.","Sonlarni tartibla."],["Foizlar","Foiz yuzdan bir qism. 25%=25/100=1/4. Sonning 10 foizi — sonni 10 ga bo‘lish.","5 ta sonning 10%, 25%, 50% ini top.","50 ning 20 foizi 10.","Chegirma masalasini yech."],["Nisbat va proporsiya","Nisbat miqdorlarni taqqoslaydi. 2:4=1:2. Proporsiya ikki nisbat tengligini bildiradi.","3 ta nisbatni soddalashtir.","2:4=1:2.","Retsept miqdorini ikki baravar qil."],["Manfiy sonlar","Nolning chapidagi sonlar manfiy. Son chizig‘ida o‘ngga yurgan sari qiymat ortadi.","10 ta sonni tartibla.","-3<-1<2.","Harorat o‘zgarishini hisobla."],["Algebraik ifodalar","x noma’lum son. 3x — 3·x. x=4 bo‘lsa, 3x=12.","x=2,3,5 uchun 2x+1 ni hisobla.","x=3 bo‘lsa 2x+1=7.","Ifodani so‘z bilan tushuntir."],["Chiziqli tenglamalar","x+5=12 bo‘lsa ikki tomondan 5 ayiramiz: x=7. Tenglik saqlanadi.","x+4=9, 2x=14, x−3=8 ni yech.","2x=14 → x=7.","Sirli sonni top."],["Perimetr va yuza","Perimetr — chegara uzunligi. To‘g‘ri to‘rtburchak yuzi uzunlik×eni.","3 ta shaklning perimetri va yuzini top.","5×3 yuza 15.","Katakli qog‘ozda shakl chiz."],["Burchaklar","To‘g‘ri burchak 90°. O‘tkir 90° dan kichik, o‘tmas 90° dan katta. Uchburchak burchaklari yig‘indisi 180°.","Burchaklarni turlarga ajrat.","60+60+60=180.","Burchak turini aniqlash."],["O‘rtacha va mediana","O‘rtacha — yig‘indi/soni. Mediana — tartiblangan ro‘yxat o‘rtasidagi qiymat.","5 ta son uchun o‘rtacha va medianani top.","2,4,6 ning o‘rtachasi 4.","Sonlarni tartibla."],["Ehtimollik","Ehtimollik = qulay natijalar / barcha teng imkoniyatli natijalar.","Tanga va kubik uchun misollar yech.","2 qizil, 5 jami: 2/5.","Natijani oldindan taxmin qil."]]));
  window.SHIRIN_CURRICULUM.sat=makeLessons([["SAT tuzilishi","SAT Reading and Writing hamda Math bo‘limlaridan iborat. Savol turini aniqlab, vaqtni rejalashtirish muhim.","Har bo‘lim uchun 3 ta ko‘nikma yoz.","Reading and Writing; Math.","Savol turini aniqlash."],["Asosiy fikr","Asosiy fikr matnning muhim tafsilotlarini birlashtiradi. Muallif maqsadi xabar berish yoki dalillash bo‘lishi mumkin.","Qisqa matndan asosiy fikrni top.","Xulosa matnga tayansin.","Bir jumlada xulosa qil."],["Matndan dalil","Eng yaxshi javob matnda tasdiqlanadi. Shaxsiy taxmin dalil o‘rnini bosa olmaydi.","Da’vo va uni qo‘llovchi ikki dalilni ajrat.","Dalil tekshiriladigan ma’lumot.","Dalilga mos javobni tanla."],["Kontekstdagi so‘z","Notanish so‘z ma’nosini atrofidagi gaplar, misol va qarama-qarshiliklardan topish mumkin.","5 ta so‘z ma’nosini kontekstdan taxmin qil.","Context clues — kontekst ishoralari.","Matndagi ma’noni top."],["O‘tish so‘zlari","However — qarama-qarshi fikr; therefore — natija; furthermore — qo‘shimcha; for example — misol.","Har bog‘lovchi bilan gap tuz.","Bog‘lovchi fikrlar aloqasini bildiradi.","Mantiqiy bog‘lovchini tanla."],["Grammatika","Ega va kesim mos bo‘lishi kerak: Each student is; students are.","10 ta gapda moslikni tekshir.","Each birlik hisoblanadi.","Grammatik xatoni top."],["SAT Algebra","Tenglamaning ikki tomonida bir xil amal bajariladi. 3x+4=19 → x=5.","5 ta chiziqli tenglama yech.","Noma’lumni ajrat.","Yechimni qayta tekshir."],["Funksiyalar","f(x) berilgan x ga mos natijani bildiradi. f(x)=2x+1 bo‘lsa f(3)=7.","3 ta funksiyani hisobla.","f(3)=2·3+1.","Jadvaldan qoida top."],["Foiz va grafiklar","Foiz o‘zgarishi = farq / boshlang‘ich qiymat ×100%. Jadval va grafikdagi o‘qlarni tekshir.","Grafikdan 5 ta xulosa yoz.","Boshlang‘ich qiymat maxrajda.","Grafikdan dalil top."],["Geometriya","Uchburchak burchaklari 180°. To‘g‘ri to‘rtburchak yuzi lw, aylana yuzi πr².","Asosiy formulalarni kartochkaga yoz.","Birliklarni tekshir.","Vaziyatga mos formulani tanla."]]);
  window.SHIRIN_CURRICULUM.government=makeLessons([["Konstitutsiya","Konstitutsiya davlat tuzilishi, organlar vakolatlari va shaxs huquqlarining asosiy huquqiy asosidir.","Konstitutsiya nima uchun asosiy qonunligini izohla.","Konstitutsiya va oddiy qonun farqi.","Huquqiy atamalarni mosla."],["Hokimiyatlar bo‘linishi","Qonun chiqaruvchi, ijro etuvchi va sud hokimiyati vazifalari farqlanadi. Muvozanat vakolatlar jamlanishini cheklashga xizmat qiladi.","Uch tarmoq vazifalarini jadvalda taqqosla.","Qonun chiqarish, ijro etish, nizoni ko‘rish.","Vaziyatni tegishli tarmoqqa mosla."],["Qonun ustuvorligi","Davlat organlari va fuqarolar qonunga rioya etishi, qarorlar qonuniy asosga ega bo‘lishi kerak.","Qonun ustuvorligiga 3 misol yoz.","Qonuniylik va tenglik.","Vaziyatda qonuniy tamoyilni aniqlash."],["Huquq va majburiyat","Huquq qonun bilan kafolatlangan imkoniyat, majburiyat esa bajarilishi lozim bo‘lgan vazifadir.","Huquq va majburiyatga 5 tadan misol yoz.","Huquq va majburiyat bog‘liq.","Vaziyatni tasnifla."],["Mahalliy boshqaruv","Mahalliy boshqaruv hudud ehtiyojlari va xizmatlarini muvofiqlashtiradi. Har organ qonunda belgilangan vakolat doirasida ishlaydi.","Mahalliy muammo va mas’ul organni aniqlab, taklif yoz.","Vakolat va javobgarlik.","Muammo–organ–yechim zanjiri."],["Ommaviy siyosat sikli","Siyosat jarayoni muammoni aniqlash, variantlar, qaror, amalga oshirish va baholash bosqichlaridan iborat.","Transport yoki ta’lim muammosi uchun siyosat siklini tuz.","Baholash natijani o‘lchaydi.","Bosqichlarni ketma-ket joyla."],["Davlat budjeti","Budjet daromad va xarajatlar rejasidir. Shaffoflik va audit mablag‘larning maqsadli ishlatilishini tekshiradi.","Ta’lim, sog‘liq va infratuzilma xarajatlarini asosla.","Daromad, xarajat, taqchillik, audit.","Budjet bandlarini mosla."],["Saylov va vakillik","Saylov fuqarolarga vakillarni tanlash imkonini beradi. Vakillik organlari aholi manfaatlarini muhokama qiladi.","Vakillik va jamoatchilik nazoratini izohla.","Oshkoralik va teng ishtirok.","Atamalar viktorinasi."],["Jamoatchilik ishtiroki","Fuqarolar muhokama, murojaat, ko‘ngillilik va qonuniy maslahatlashuvlarda qatnashishi mumkin.","Mahalladagi masala bo‘yicha xolis taklif yoz.","Dalil va hurmat muhim.","3 manfaatdor tomon fikrini ajrat."],["Siyosatni baholash","Dastur maqsad, natija, xarajat va ta’sir mezonlari bilan baholanadi. Bog‘liqlik har doim sababiyat emas.","Dastur uchun 3 o‘lchov mezoni taklif qil.","Natija va ta’sir farqi.","Dalilga asoslangan xulosa."]]);
  window.SHIRIN_CURRICULUM.economics=makeLessons([["Iqtisodiyot va tanlov","Resurslar cheklangan, ehtiyojlar ko‘p. Har tanlov muqobil xarajatga ega.","Kichik budjet uchun tanlov misolini yoz.","Cheklangan resurs va tanlov.","Muqobil xarajatni top."],["Talab va taklif","Talab xaridor istagi va imkoniyati; taklif sotuvchilar miqdori. Ularning o‘zaro ta’siri bozor narxiga ta’sir qiladi.","Talab oshsa narxga ta’sirini izohla.","Talab egri chizig‘i odatda pastga yo‘naladi.","Vaziyatni talab yoki taklif deb ajrat."],["Bozor muvozanati","Muvozanatda talab miqdori taklif miqdoriga teng. Narx farq qilsa tanqislik yoki ortiqcha taklif bo‘lishi mumkin.","Tanqislik va ortiqcha taklifga misol yoz.","Qd=Qs.","Muvozanatni grafikda top."],["Inflyatsiya","Inflyatsiya umumiy narxlar darajasining davomli o‘sishidir. U xarid qobiliyatiga ta’sir qilishi mumkin.","Inflyatsiyaning uy budjetiga ta’sirini yoz.","Narx indeksi va real xarid qobiliyati.","Nominal va real qiymatni farqla."],["Mehnat bozori","Mehnat bozori ishchi kuchi taklifi va ish beruvchilar talabini bog‘laydi. Ko‘nikmalar va ish o‘rinlari mosligi muhim.","Bandlikka yordam beradigan ikki chorani tahlil qil.","Bandlik, ishsizlik, ishchi kuchi.","Ko‘nikma va ish talabini mosla."],["Kambag‘allik va tengsizlik","Kambag‘allik resurs va imkoniyatlar yetishmasligi; tengsizlik daromad yoki boylik taqsimotidagi farqdir.","Daromad va imkoniyat tengsizligi farqini yoz.","Kambag‘allik ko‘p o‘lchovli.","Sabab va oqibatni ajrat."],["Soliqlar va xarajatlar","Soliqlar davlat xizmatlari va umumiy ehtiyojlarni moliyalashtiradi. Soliq tizimida adolatlilik va samaradorlik muhim.","Soliqdan moliyalanadigan xizmatlarga misol yoz.","Progressiv va proporsional soliq.","Soliq tushumini xizmatga mosla."],["YaIM va o‘sish","YaIM mamlakat hududida ishlab chiqarilgan yakuniy tovar va xizmatlar qiymatini o‘lchaydi. U farovonlikning barcha jihatini qamramaydi.","YaIM nimalarni o‘lchashi va o‘lchamasligini yoz.","Nominal va real YaIM.","Ko‘rsatkichni talqin qil."],["Pul va foiz stavkasi","Pul ayirboshlash, hisob birligi va qiymat saqlash vazifalarini bajaradi. Foiz stavkasi qarz va jamg‘armaga ta’sir qiladi.","Foiz oshishi qarz oluvchi va jamg‘aruvchiga ta’sirini taqqosla.","Markaziy bank pul-kredit siyosati.","Vaziyatni iqtisodiy tushunchaga bog‘la."],["Iqtisodiy siyosat","Subsidiya, soliq, transfer va investitsiya rag‘batlarni o‘zgartiradi. Har siyosat foyda, xarajat va kutilmagan ta’sir bilan baholanadi.","Bir dastur uchun foyda va xarajatlarni yoz.","Siyosat natijasi dalil bilan baholanadi.","Ikki variantni mezonlar bilan taqqosla."]]);

})();