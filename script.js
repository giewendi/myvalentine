const envelope = document.getElementById("envelope");
const messageElement = document.getElementById("message");
const ambientAudio = document.getElementById("ambientAudio");
const palagiAudio = document.getElementById("palagiAudio");


const messageText = `
My wuvvy,

I want to keep making Valentine’s special for us. Even when life gets busy, even when it becomes routine. I don’t ever want to stop putting effort into loving you.

You are my favorite feeling.
My best friend.
My hooman.
`;

let index = 0;

const slideshow = document.getElementById("slideshow");
const images = [
  "images/landscape2.jpg",
  "images/landscape3.jpg",
  "images/landscape4.jpg",
  "images/landscape5.jpg",
  "images/portrait1.jpg",
  "images/portrait2.jpg",
  "images/portrait3.jpg",
  "images/portrait4.jpg",
  "images/portrait5.jpg",
  "images/portrait6.jpg"
];

const creditsScene = document.getElementById("creditsScene");
const creditsPhoto = document.getElementById("creditsPhoto");
const creditsText = document.getElementById("creditsText");
const creditImages = [...images];

const finalQuestion = document.getElementById("finalQuestion");

const yesBtn = document.getElementById("yesBtn");
const alwaysBtn = document.getElementById("alwaysBtn");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.getElementById("hearts");

let slideIndex = 0;

function startAmbient() {
  ambientAudio.volume = 0.6;

  const playPromise = ambientAudio.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If autoplay blocked, wait for first user interaction
      document.addEventListener("click", () => {
        ambientAudio.play();
      }, { once: true });
    });
  }
}

startAmbient();

function switchToPalagi() {
  let fadeOut = setInterval(() => {
    if (ambientAudio.volume > 0.05) {
      ambientAudio.volume -= 0.05;
    } else {
      clearInterval(fadeOut);
      ambientAudio.pause();
      ambientAudio.currentTime = 0;

      palagiAudio.volume = 0;
      palagiAudio.play();

      let fadeIn = setInterval(() => {
        if (palagiAudio.volume < 0.7) {
          palagiAudio.volume += 0.05;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }
  }, 200);
}


function changeBackground() {
  slideshow.style.backgroundImage = `url('${images[slideIndex]}')`;
  slideIndex = (slideIndex + 1) % images.length;
}
setInterval(changeBackground, 4000);
changeBackground();

function typeWriter() {
  if (index < messageText.length) {
    messageElement.innerHTML += messageText.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      finalQuestion.classList.add("show");
    }, 800);
  }
}

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

function explodeHearts() {
  for (let i = 0; i < 30; i++) {
    const x = window.innerWidth / 2 + (Math.random() * 200 - 100);
    const y = window.innerHeight / 2 + (Math.random() * 200 - 100);
    createHeart(x, y);
  }
}

function startCredits() {
  document.querySelector(".container").style.display = "none";
  finalQuestion.style.display = "none";

  creditsScene.classList.add("show");

  let i = 0;
  function showNextPhoto() {
    if (i < creditImages.length) {
      creditsPhoto.style.backgroundImage = `url('${creditImages[i]}')`;
      creditsPhoto.classList.add("show");

      setTimeout(() => {
        creditsPhoto.classList.remove("show");
        i++;
        setTimeout(showNextPhoto, 800);
      }, 2000);
    } else {
      setTimeout(() => {
        creditsText.style.opacity = 1;
      }, 1000);
    }
  }
  showNextPhoto();
}

function switchToPalagi() {
  ambientAudio.pause();
  ambientAudio.currentTime = 0;

  palagiAudio.volume = 0.7;
  palagiAudio.play();
}

yesBtn.addEventListener("click", () => {
  explodeHearts();
  switchToPalagi();
  setTimeout(startCredits, 1200);
});

alwaysBtn.addEventListener("click", () => {
  explodeHearts();
  switchToPalagi();
  setTimeout(startCredits, 1200);
});


let opened = false;
envelope.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");
  setTimeout(typeWriter, 1000);
});
