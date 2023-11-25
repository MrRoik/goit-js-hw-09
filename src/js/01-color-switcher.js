// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body>
// на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body")

let timerId = null;

startBtn.addEventListener("click", handleClickStart);
stopBtn.addEventListener("click", handleClickStop)

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function handleClickStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function handleClickStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}