//1-misol
//Bir tugma (Generate Emoji) va bo‘sh bir <div> yarating.
//Tugma bosilganda, tasodifiy emojilar ro‘yxatidan bir emoji tanlab, <div> elementga ko‘rsating.
//</div>Har safar tugma bosilganda eski emoji o‘chib, yangi emoji ko‘rinadi.

const emojis = ["😀", "🎉", "🚀", "🐱", "🍎"];

const button = document.getElementById("emoji");
const emojiDisplay = document.getElementById("emoji-display");

button &&
  button.addEventListener("click", () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    emojiDisplay.textContent = randomEmoji;
  });

//2-misol
//Bir <textarea> va bir nechta tugmalar yarating:
//Bold - Matnni qalin qilish.
//talic - Matnni kursiv qilish.
//Clear - Matnni toza

const textarea = document.getElementById("text-area");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const clearBtn = document.getElementById("clear-btn");

boldBtn &&
  boldBtn.addEventListener("click", () => {
    textarea.style.fontWeight = "bold";
  });

italicBtn &&
  italicBtn.addEventListener("click", () => {
    textarea.style.fontStyle = "italic";
  });

clearBtn &&
  clearBtn.addEventListener("click", () => {
    textarea.value = "";
  });

//3-misol
//Bir tugma (Start) va bir progress bar (<div> elementi ichida progressni ko‘rsatuvchi boshqa <div> elementi) yarating.
//Tugmani bosganda progress bar sekin-asta to‘ladi (masalan, har 100ms 5% ga o‘sib boradi).
//Progress bar 100% ga to‘lganda tugma ishlamay qoladi.

const start = document.getElementById("start-btn");
const progress = document.getElementById("progress");

let num = 0;

start &&
  start.addEventListener("click", () => {
    const interval = setInterval(() => {
      num += 5;
      progress.style.width = num + "%";
      if (num >= 100) {
        clearInterval(interval);
      }
    }, 100);
  });
