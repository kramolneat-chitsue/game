// ====== ELEMENT ======
const pages = ["landing", "game", "meme", "result"];
const noLoveBtn = document.getElementById("noLoveBtn");

const loveBtn = document.getElementById("loveBtn");
const trollText = document.getElementById("trollText");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");

// ====== DATA ======
const trollMessages = [
  "โกหกอะดิ 😏",
  "คิดดีๆนะ...",
  "กดใหม่อีกทีซิ 😂",
  "มันกดไม่ได้หรอกกก",
  "รักแหละ ดูออก 😆",
  "เมื่อกี้กดผิดปะ 🤨",
  "แน่ใจนะะะ 😏",
  "อย่าปากแข็งดิ 😜",
  "ใจเย็นๆ คิดก่อนตอบ 😂",
  "ให้คิดอีกที่นะ 😎",
  "เอาจริงดิ 😳"
];

// ====== FUNCTIONS ======

let moveCount = 0;
const MAX_MOVE = 10;

function moveButton(button) {
  if (moveCount >= MAX_MOVE) return;

  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 80);

  button.style.left = x + "px";
  button.style.top = y + "px";

  moveCount++;
}

function showTrollText() {
  const index = Math.min(moveCount, trollMessages.length - 1);

  trollText.innerText = trollMessages[index];
  trollText.classList.remove("hidden");
}


noLoveBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
});


// ไปหน้าเกม
function goToGame() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
}

// ไปหน้าจบ
function goToResult() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
}

// ไปหน้า meme
function goToMeme() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("meme").classList.remove("hidden");
}

// ====== EVENT ======
function init() {
  // หน้าแรก
  noLoveBtn.addEventListener("mouseover", () => {
    moveButton(noLoveBtn);
    showTrollText();
  });

  loveBtn.addEventListener("click", goToGame);

  // หน้าเกม
  noBtn.addEventListener("mouseover", () => {
    moveButton(noBtn);
  });

  yesBtn.addEventListener("click", goToResult);
}


// run
init();