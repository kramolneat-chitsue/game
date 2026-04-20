let isOpened = false;
let musicPlaying = false;

function updateCounter() {
    const startDate = new Date('2017-09-20'); // เปลี่ยนวันที่เริ่มคบตรงนี้
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

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const waves = document.getElementById('musicWaves');
    const icon = document.getElementById('musicIcon');
    
    if(!musicPlaying) {
        music.play().catch(() => {
            console.log("Music play blocked by browser");
        });
        waves.style.display = 'flex';
        icon.style.display = 'none';
        musicPlaying = true;
    } else {
        music.pause();
        waves.style.display = 'none';
        icon.style.display = 'block';
        musicPlaying = false;
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
        if(!musicPlaying) toggleMusic();
    } else {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('flipped'));
        book.classList.remove('open');
        setTimeout(() => { container.classList.remove('active'); }, 600);
        btnText.innerText = "เริ่มการเดินทาง";
        btnIcon.innerText = "📖";
        isOpened = false;
    }
}

function flip(element) {
    element.classList.toggle('flipped');
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

window.onload = () => {
    updateCounter();
    createBgHearts();
};