
let musicPlaying = false;
let isOpened = false;      
const originalZIndices = {
    1: 50,
    2: 40,
    3: 30,
    4: 20,
    5: 10
};
const bgMusic = document.getElementById("bgMusic");
const musicWaves = document.getElementById("musicWaves");
const musicIcon = document.getElementById("musicIcon");
const video = document.getElementById('memoryVideo');

function updateCounter() {
    const startDate = new Date('2017-09-20');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('counter').innerText = `เราเดินทางร่วมกันมา ${diffDays} วันแล้ว ❤️`;
}
function createBgHearts() {
    const container = document.getElementById('bgHearts');
    for(let i=0; i<15; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.opacity = Math.random() * 0.5;
        container.appendChild(heart);
    }
}

function updateMusicUI() {
    if (!bgMusic.paused) {
        musicWaves.style.display = "flex";
        musicIcon.style.display = "none";
    } else {
        musicWaves.style.display = "none";
        musicIcon.style.display = "inline";
    }
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

function toggleBook() {
    const container = document.getElementById('bookContainer');
    const book = document.getElementById('myBook');
    const btnText = document.getElementById('text');
    const btnIcon = document.getElementById('icon');

    if (!isOpened) {
        container.classList.add('active');
        setTimeout(() => { book.classList.add('open'); }, 150);
        btnText.innerText = "ปิดสมุดภาพ";
        btnIcon.innerText = "✖️";
        isOpened = true;
        // if(!musicPlaying) toggleMusic();
    } else {
        const pages = document.querySelectorAll('.page');
        pages.forEach((p, index) => {
            p.classList.remove('flipped');
            // คืนค่า z-index เดิมตาม id
            const pageId = p.id.split('-')[1];
            p.style.zIndex = originalZIndices[pageId];
        });
        book.classList.remove('open');
        setTimeout(() => container.classList.remove('active'), 600);
        btnText.innerText = "เปิดสมุดภาพ";
        btnIcon.innerText = "📖";
        isOpened = false;
    }
}

function flip(element, pageNum) {
    const isFlippingToBack = !element.classList.contains('flipped');
    
    if (isFlippingToBack) {
        element.classList.add('flipped');
        setTimeout(() => {
            if(element.classList.contains('flipped')) {
                element.style.zIndex = pageNum;
            }
        }, 600);

        if (pageNum === 3 && video) {
            setTimeout(() => {
                video.play().catch(e => console.log("Video play failed:", e));
            }, 500); // รอให้แอนิเมชั่นพลิกหน้าไปนิดนึงก่อนค่อยเล่น
        }
    } else {
        element.classList.remove('flipped');
        element.style.zIndex = originalZIndices[pageNum];
        if (pageNum === 3 && video) {
            video.pause();
        }
    }
}

function showLoveLetter() {
    rainHearts();
    document.getElementById('loveModal').classList.add('show');
}

function closeModal() {
    document.getElementById('loveModal').classList.remove('show');
}

function rainHearts() {
    const hearts = ['❤️', '💖', '💕', '💗', '🌹', '✨'];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-fly text-2xl';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-50px';
            heart.style.transitionDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 80);
    }
}

function sendMessage() {
    const text = document.getElementById("user-message-input").value;

    if (!text.trim()) {
        alert("พิมพ์ข้อความก่อนนะ 😏");
        return;
    }

    emailjs.send("service_249229g", "template_b0jsoge", {
        message: text
    })
    .then(() => {
        alert("ส่งถึงเค้าแล้ว 💌");
        document.getElementById("user-message-input").value = "";
    })
    .catch((error) => {
        console.error(error);
        alert("ส่งไม่สำเร็จ 😢");
    });
}

function startExperience() {
    const startScreen = document.getElementById("startScreen");
    const mainContent = document.getElementById("mainContent");
    const bgMusic = document.getElementById("bgMusic");

    bgMusic.play();
    startScreen.style.display = "none";
    mainContent.style.display = "block";
}

document.getElementById("startScreen").addEventListener("click", startExperience);

window.onload = () => {
    updateCounter();
    createBgHearts();
};

window.addEventListener("load", () => {
    updateMusicUI();
});

bgMusic.addEventListener("play", updateMusicUI);
bgMusic.addEventListener("pause", updateMusicUI);