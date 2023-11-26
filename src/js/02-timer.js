import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const flatpickrInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartReadout);

let intervalId = null;
let selectedDate = null;
let currentDate = null;

startBtn.classList.add("timer-button");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      window.alert("Please choose a date in the future");
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};

const fpInpt = flatpickr(flatpickrInput, options);

function onStartReadout() {
   countdown.start();
}
  
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const countdown = {
   start() {
     intervalId = setInterval(() => {
       currentDate = Date.now();
       const deltaTime = selectedDate - currentDate;
       updateСountdown(convertMs(deltaTime));
       startBtn.disabled = true;
       flatpickrInput.disabled = true;

       if (deltaTime <= 1000) {
         this.stop();
         }
     }, 1000);
   },

   stop() {
     startBtn.disabled = true;
     flatpickrInput.disabled = false;
     clearInterval(intervalId);
     return;
   },
}

function updateСountdown({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}