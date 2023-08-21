import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('value[data-days]');
const hours = document.querySelector('value[data-hours]');
const minutes = document.querySelector('value[data-minutes]');
const seconds = document.querySelector('value[data-seconds]');

const currentTime = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };