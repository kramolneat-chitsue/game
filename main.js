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

function moveButton(button, event) {
    if (moveCount >= MAX_MOVE) return;

    if (event) {
        // หยุดทุกพฤติกรรมเดิมของเบราว์เซอร์
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();
    }
   
    const padding = 60;
    const availableWidth = window.innerWidth - button.offsetWidth - padding;
    const availableHeight = window.innerHeight - button.offsetHeight - padding;

    const x = Math.max(20, Math.random() * availableWidth);
    const y = Math.max(20, Math.random() * availableHeight);

    const rotate = (Math.random() - 0.5) * 20;

    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
    button.style.transform = `rotate(${rotate}deg)`;

    moveCount++;
    trollText.style.opacity = '1';
    // trollText.innerText = `จับให้ได้สิ! (${moveCount}/${MAX_MOVE})`;
     showTrollText();
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
  sound.currentTime = 0;
  sound.play();
}


function init() {
  
  noLoveBtn.addEventListener("mouseenter", () => {
    moveButton(noLoveBtn);
    // showTrollText();
  });

  // สำหรับ Mobile (ใช้ touchstart เพื่อความไว)
  noLoveBtn.addEventListener('touchstart', (e) => {
      if (moveCount < MAX_MOVE) {
        moveButton(noLoveBtn, e);
        // showTrollText();
      }
  }, { passive: false });
  
  noLoveBtn.addEventListener('click', (e) => {
      if (moveCount < MAX_MOVE) {
          moveButton(noLoveBtn, e);
      } else {
          popup.classList.remove('hidden');
      }
  });

  askRealBtn.addEventListener("click", () => {
    const crack = document.getElementById("crackEffect");
    const sound = document.getElementById("crackSound");

    crack.classList.remove("hidden");
    sound.currentTime = 0;
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