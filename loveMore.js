const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");

let position = 1;

// 🔊 เสียง
const diceSound = new Audio("dice.mp3");
const winSound = new Audio("clap.mp3");

// 🐍 งู + 🪜 บันได
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

// 🧱 สร้างกระดาน
for (let i = 100; i >= 1; i--) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = "cell-" + i;
  cell.innerText = i;
  board.appendChild(cell);
}

// 👤 อัปเดตตำแหน่ง
function updatePlayer() {
  document.querySelectorAll(".cell").forEach(c => c.classList.remove("player"));
  const cell = document.getElementById("cell-" + position);
  if (cell) cell.classList.add("player");
}

// 🎲 ทอยลูกเต๋า
rollBtn.addEventListener("click", () => {
  const dice = Math.floor(Math.random() * 6) + 1;

  diceSound.currentTime = 0;
  diceSound.play().catch(()=>{});

  statusEl.innerText = `ทอยได้ ${dice}`;

  let newPos = position + dice;

  if (newPos > 100) {
    statusEl.innerText += " (เกิน 100 อดเดิน 😝)";
    return;
  }

  position = newPos;

  // 🐍 check
  if (snakesAndLadders[position]) {
    const old = position;
    position = snakesAndLadders[position];

    if (position > old) {
      statusEl.innerText += ` 🪜 ขึ้นไป ${position}`;
    } else {
      statusEl.innerText += ` 🐍 ลงไป ${position}`;
    }
  }

  updatePlayer();

  // 🎉 ชนะ
  if (position === 100) {
    statusEl.innerText = "🎉 ชนะแล้ว! 💖";

    winSound.currentTime = 0;
    winSound.play().catch(()=>{});

    rollBtn.disabled = true;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  }
});

// 🔄 รีเกม
resetBtn.addEventListener("click", () => {
  position = 1;
  rollBtn.disabled = false;
  statusEl.innerText = "เริ่มใหม่!";
  updatePlayer();
});

// start
updatePlayer();