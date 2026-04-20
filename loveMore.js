// ====== ELEMENT ======
const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");

// ====== STATE ======
let position = 1;

// ====== SOUND ======
const diceSound = new Audio("sound/dice.mp3");
const winSound = new Audio("sound/win.mp3");
const kissSound = new Audio("sound/kiss.mp3");

// ====== DATA ======
const snakesAndLadders = {
  4: 14,
  9: 31,
  17: 7,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  64: 60,
  89: 26,
  95: 75,
  99: 78
};

// 💖 ข้อความน่ารัก
const moveTexts = [
  "ค่อยๆไปด้วยกันนะ 💖",
  "อีกนิดเดียวเอง 🥺",
  "ไปต่อกันนน ✨",
  "อยู่ด้วยกันแบบนี้ดีแล้ว 💕",
  "ไม่ต้องรีบก็ได้นะ 😌"
];

// ====== INIT BOARD ======
for (let i = 100; i >= 1; i--) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = "cell-" + i;

  let text = i;
  if (snakesAndLadders[i]) {
    text += i < snakesAndLadders[i] ? " 🪜" : " 🐍";
  }

  cell.innerText = text;
  board.appendChild(cell);
}

// ====== HELPERS ======
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePlayer() {
  document.querySelectorAll(".cell").forEach(c => c.classList.remove("player"));
  const cell = document.getElementById("cell-" + position);
  if (cell) cell.classList.add("player");
}

function showMoveText() {
  const msg = moveTexts[Math.floor(Math.random() * moveTexts.length)];
  statusEl.innerText = msg;
}

function showKissScene() {
  const scene = document.getElementById("kissScene");
  scene.classList.remove("hidden");

  kissSound.currentTime = 0;
  kissSound.play().catch(()=>{});
 
  setTimeout(() => {
    window.location.href = "aniversary.html"; 
  }, 2500);
}


async function moveStepByStep(steps) {
  for (let i = 0; i < steps; i++) {
    await delay(250);

    position++;
    updatePlayer();
    showMoveText();
  }
}

// ====== EVENT ======
rollBtn.addEventListener("click", async () => {
  const dice = Math.floor(Math.random() * 6) + 1;

  diceSound.currentTime = 0;
  diceSound.play().catch(()=>{});

  statusEl.innerText = `ทอยได้ ${dice}`;

  if (position + dice > 100) {
    statusEl.innerText += " (ยังไปไม่ถึงนะ 😝)";
    return;
  }

  rollBtn.disabled = true;

  await moveStepByStep(dice);

  // 🐍 / 🪜
  if (snakesAndLadders[position]) {
    const old = position;
    const target = snakesAndLadders[position];

    statusEl.innerText = position < target
      ? "🪜 โชคดีเลย ได้ไปต่อ 💕"
      : "🐍 ไม่เป็นไรนะ ไปใหม่ด้วยกัน 🥺";

    await delay(500);

    position = target;
    updatePlayer();
  }

  // 🎉 WIN
  if (position === 100) {
    statusEl.innerText = "🎉 ถึงปลายทางแล้ว 💖";

    winSound.currentTime = 0;
    winSound.play().catch(()=>{});

    setTimeout(() => {
      showKissScene();
    }, 1000);
  }

  rollBtn.disabled = false;
});

// ====== RESET ======
resetBtn.addEventListener("click", () => {
  position = 1;
  rollBtn.disabled = false;
  statusEl.innerText = "เริ่มใหม่อีกครั้งนะ 💖";
  updatePlayer();
});

// ====== START ======
updatePlayer();