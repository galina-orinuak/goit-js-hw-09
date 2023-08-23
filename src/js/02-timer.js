import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;
let timerId = false;

const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const difference = selectedDates[0].getTime() - new Date().getTime();
    if (difference > 0 && !timerId) {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        timerStart(difference);
        startBtn.disabled = true;
        timerId = true;
      });
    } else {
      startBtn.disabled = true;
      if (timerId) {
        Notiflix.Notify.failure('Timer is started');
      } else {
        Notiflix.Notify.failure('Please choose a future time');
      }
    }
  },
});


function timerStart(milliseconds) {
  let timer = setInterval(() => {
    if (milliseconds > 0) {
      const remainingTime = convertMs(milliseconds);
      printTime(remainingTime);
      milliseconds -= 1000;
    } else {
      clearInterval(timer);
      printTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      timerId = false;
    }
  }, 1000);
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


function formatTime(value) {
  return value.toString().padStart(2, '0');
}


function printTime(t) {
  daysEl.textContent = formatTime(t.days);
  hoursEl.textContent = formatTime(t.hours);
  minutesEl.textContent = formatTime(t.minutes);
  secondsEl.textContent = formatTime(t.seconds);
}
