// ====== ELEMENT ======
const noLoveBtn = document.getElementById("noLoveBtn");
const askRealBtn = document.getElementById("askRealBtn");
const loveBtn = document.getElementById("loveBtn");
const loveMoreBtn = document.getElementById("loveMoreBtn");
const trollText = document.getElementById("trollText");

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


function showPopup() {
  const popup = document.getElementById("popup");
  const sound = document.getElementById("popupSound");

  popup.classList.remove("hidden");
  sound.currentTime = 0; // รีเสียงทุกครั้ง
  sound.play();
}


function init() {
  
  noLoveBtn.addEventListener("mouseover", () => {
    moveButton(noLoveBtn);
    showTrollText();
  });

  noLoveBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    showPopup();
    noLoveBtn.style.display = "none";
  });

  askRealBtn.addEventListener("click", () => {
    const crack = document.getElementById("crackEffect");
    const sound = document.getElementById("crackSound");
    crack.classList.remove("hidden");
    sound.play();

    setTimeout(() => {
      location.reload();
    }, 800);
  });

  loveBtn.addEventListener("click", () => {
    window.location.href = "love.html";
  });

  loveMoreBtn.addEventListener("click", () => {
    window.location.href = "loveMore.html";
  });

  
}


// run
init();