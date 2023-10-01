import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const refs = {
  inputData: document.querySelector('input#datetime-picker'),
  buttonEl: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;
let currentDate = null;

refs.buttonEl.disabled = true;
refs.buttonEl.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates);
    onSetData(selectedDates);
  },
};

flatpickr('input#datetime-picker', options);

function onSetData(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  if (selectedDate < currentDate) {
    refs.buttonEl.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    refs.buttonEl.disabled = false;
  }
}

function onStart() {
  Notify.success('Timing is started ⏲️');
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    const promoTime = selectedDate - currentDate;
    timerContent(convertMs(promoTime));
    refs.buttonEl.disabled = true;

    if (selectedDate - currentDate < 1000) {
      clearInterval(intervalId);
      refs.buttonEl.disabled = false;
    }
  }, 1000);
}

function timerContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
