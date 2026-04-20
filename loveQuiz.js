const questions = [
  {
    question: "เราเจอกันครั้งแรกที่ไหน?",
    choices: ["หน้าบ้านต่อ", "มหาลัย", "โรงพยาบาล"],
    answer: "มหาลัย"
  },
  {
    question: "ใครททักใครก่อน?",
    choices: ["มะเหมี่ยว", "ต่อ", "ไม่มีใครทักก่อน 😏"],
    answer: "มะเหมี่ยว"
  },
  {
    question: "เราคุยกันครั้งแรกเดือนไหน?",
    choices: ["มกราคม", "กรกฏาคม", "สิงหาคม"],
    answer: "จำไม่ได้หรอก 😏"
  },
  {
    question: "เที่ยวด้วยกันที่ไหนที่แรก?",
    choices: ["หัวหิน", "พัทยา", "เชียงใหม่"],
    answer: "หัวหิน"
  },
  {
    question: "เที่ยวต่างประเทศที่ไหนที่แรก?",
    choices: ["อเมริกา", "นครสวรรค์", "มัลดริฟส์"],
    answer: "มัลดริฟส์"
  },
  {
    question: "มะเหมี่ยวชอบกินไร?",
    choices: ["ไส้กรอก", "ก๋วยเตี๋ยว", "เคเอฟซี"],
    answer: "อะไรก้ได้จ๋า 😏"
  },
  {
    question: "ใครขี้อ้อนกว่ากัน?",
    choices: ["มะเหมี่ยว", "ต่อ", "ไม่อ้อนเลยนะ 😏"],
    answer: "มะเหมี่ยว"
  },
  {
    question: "เวลาทะเลาะ ใครง้อก่อน?",
    choices: ["มะเหมี่ยว", "ต่อ", "ปล่อยเงียบ 😆"],
    answer: "ต่อ"
  },
  {
    question: "เวลาบอกว่า 'ไม่เป็นไร' แปลว่า?",
    choices: ["ไม่เป็นไรจริงๆ", "งอนแล้ว 😏", "รอให้ง้อ"],
    answer: "งอนแล้ว 😏"
  },
  {
    question: "สิ่งที่สำคัญที่สุดในความสัมพันธ์ของเราคือ?",
    choices: ["ความเข้าใจ", "ความรัก", "การดูแลกัน", "เธอ 💖"],
    answer: "เธอ 💖"
  },
  {
    question: "ถ้าย้อนเวลาได้ อยากกลับไปตอนไหน?",
    choices: ["วันแรกที่เจอ", "วันแรกที่คุย", "ทุกวันเลย 🥺"],
    answer: "ทุกวันเลย 🥺"
  },
  {
    question: "เรารักกันมานานแค่ไหน?",
    choices: ["1 ปี", "2 ปี", "ตลอดไป 💖"],
    answer: "ตลอดไป 💖"
  },
  {
    question: "รักกันมากแค่ไหน?",
    choices: ["มาก", "มากที่สุด", "มากกว่าโลก 🌍"],
    answer: "มากกว่าโลก 🌍"
  }

];

let current = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const clapSound = new Audio("sound/clap.mp3");


function showQuestion() {
  const q = questions[current];
  questionEl.innerText = q.question;
  choicesEl.innerHTML = "";
  resultEl.innerText = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;

    btn.onclick = () => checkAnswer(choice);

    choicesEl.appendChild(btn);
  });
}

function checkAnswer(choice) {
  const correctAnswer = questions[current].answer;
  if (choice === correctAnswer) {
    handleNext("ถูกต้อง! 💖", 1000);
    return;
  }
  const answerMap = {
    "จำไม่ได้หรอก 😏": "จำไม่ได้หรอก อิอิอิอิ",
    "อะไรก้ได้จ๋า 😏": "อะไรก้ได้จ๋า 😏 ก๊ากก"
  };
  if (answerMap[correctAnswer]) {
    handleNext(answerMap[correctAnswer], 1000);
    return;
  }
  resultEl.innerText = "ผิด! ลองใหม่อีกทีนะ 💔";
}

function handleNext(message, delay) {
  resultEl.innerText = message;
  current++;

  if (current < questions.length) {
    setTimeout(showQuestion, delay);
  } else {
    setTimeout(() => {
      questionEl.innerText = "เก่งมาก! รักจริงแน่นอน ❤️";
      choicesEl.innerHTML = "";
      clapSound.currentTime = 0;
      clapSound.play().catch(() => {});
      resultEl.innerText = "";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }, delay);
  }
}

showQuestion();