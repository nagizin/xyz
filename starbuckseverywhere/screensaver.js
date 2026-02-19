let idleTimer;
const idleTime = 40000;
let screensaverActive = false;

const images = ["img/iced_americano.png", "img/hot_americano.png"];

function resetTimer() {
  clearTimeout(idleTimer);

  if (screensaverActive) {
    removeScreensaver();
    screensaverActive = false;
  }

  idleTimer = setTimeout(startScreensaver, idleTime);
}

function startScreensaver() {
  screensaverActive = true;
  createRandomImage();
}

function createRandomImage() {
  if (!screensaverActive) return;

  const img = document.createElement("img");

  // 🔥 랜덤 이미지 선택
  const randomImage = images[Math.floor(Math.random() * images.length)];
  img.src = randomImage;

  img.classList.add("screensaver-img");

  const maxX = window.innerWidth - 400;
  const maxY = window.innerHeight - 400;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  img.style.left = randomX + "px";
  img.style.top = randomY + "px";

  document.body.appendChild(img);

  setTimeout(createRandomImage, 7000);
}

function removeScreensaver() {
  document.querySelectorAll(".screensaver-img").forEach((img) => img.remove());
}

["mousemove", "keydown", "click", "scroll"].forEach((event) => {
  document.addEventListener(event, resetTimer);
});

resetTimer();
