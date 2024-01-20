// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
const startButton = document.querySelector("[data-start]");
startButton.addEventListener('click', startButtonClick);
deactivateStartButton();

// selectedDates[0] - константа flatpickr, що зберігає обрану дату,
// але вона не знаходиться в області видимості цього коду, тому треба let userSelectedDate.
// Oб'єкт options, підготований GoIt, потрібний для виконання завдання,
// другим аргументом функції flatpickr(selector, options):
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      // console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if(userSelectedDate < Date.now()){
        iziToast.error({
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
    startButton.classList.remove("canstart");
  }

  function startButtonClick(){
    deactivateStartButton();
    let interval = setInterval(() => {

        let ms = userSelectedDate - Date.now(); // get ms!!!!!!!!!
        let result = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if(ms >= 0) { 
            result = convertMs(ms); //при ms<0 виводитись значення перестануть, але інтервал ще функціонуватиме
        }
        else {                               
            clearInterval(interval); // щоб інтервал i функціонувати перестав, коли стане ms<0
        }
        document.querySelector('[data-days]').textContent = addLeadingZero(result.days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(result.hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(result.minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(result.seconds);
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