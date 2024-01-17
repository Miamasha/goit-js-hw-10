// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
let startButton = document.querySelector("[data-start]");
startButton.addEventListener('click', startButtonClick);
deactivateStartButton();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if(userSelectedDate < Date.now()){
        iziToast.warning({
            message: "Please choose a date in the future", 
            position: 'topRight'
        }); 
        deactivateStartButton();
      }
      else {
        activateStartButton();
      }
    },
  };

  flatpickr("#datetime-picker", options);

  function activateStartButton(){
    startButton.disabled = false;
    startButton.classList.add("canstart"); //js add class="canstart" while active, change button color
  }

  function deactivateStartButton(){
    startButton.disabled = true;
    startButton.classList.remove("active");
  }

  function startButtonClick(){
    deactivateStartButton();
    let interval = setInterval(() => {

        let currentDate = Date.now();
        let ms = userSelectedDate - currentDate;
        let result = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if(ms > 0) { 
            result = convertMs(ms);
        }
        else {
            clearInterval(interval);
            activateStartButton();
        }
        document.querySelector('[data-days]').innerHTML = addLeadingZero(result.days);
        document.querySelector('[data-hours]').innerHTML = addLeadingZero(result.hours);
        document.querySelector('[data-minutes]').innerHTML = addLeadingZero(result.minutes);
        document.querySelector('[data-seconds]').innerHTML = addLeadingZero(result.seconds);
    }, 1000);
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
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

  function addLeadingZero(value){
    return value.toString().padStart(2, '0');
  }