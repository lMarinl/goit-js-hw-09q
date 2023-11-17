import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import 'flatpickr/dist/themes/confetti.css';
import Notiflix from "notiflix";

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  buttonStart: document.querySelector('button[data-start]'),
  inputForSelectedDate: document.querySelector("#datetime-picker"),
};


refs.inputForSelectedDate.disabled = false;
refs.buttonStart.disabled = true;

let date = null;
let currentTime = null;
let isActive = null;

 function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  };

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

 onClose(selectedDates) {
    date = flatpickr.selectedDates[0];
    currentTime = Date.now();

   checkDate(date, currentTime);
}
};

const flatpickr = flatpickr("#datetime-picker", options);




refs.buttonStart.addEventListener('click', startTimer);

function startTimer() { 

  if (isActive) return;

  isActive = true;
  refs.inputForSelectedDate.disabled = true;
  refs.buttonStart.disabled = true;
  
 const intervalId =  setInterval(() => {
  date = flatpickr.selectedDates[0];
   currentTime = Date.now();
   const difference = data - currentTime;

   if (difference <= 0) {
     if (!isActive) return;
     isActive = false;
     clearInterval(intervalId);
     render({ days: 0, hours: 0, minutes: 0, seconds: 0 });
     refs.inputForSelectedDate.disabled = false;
   } else {
     
     const time = convertMs(difference);
     render(time)
   };

    console.log(date);
   
    console.log(difference);
    
}, 1000)
};


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function render(time) {
  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
}

function checkDate() {
  if (selectedDate > currentDate) {
    Notiflix.Notify.failure("Please choose a date in the future");
    refs.buttonStart.disabled = false;
  } else {
    refs.buttonStart.disabled = true;
  };
};