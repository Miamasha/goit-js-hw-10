// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let delay = form.elements["delay"].value;
    let state = form.elements["state"].value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled'){
                resolve(delay);
            }
            else{
                reject(delay);
            }
        }, delay);
      });

      promise.then((delay) => {
            iziToast.success({message: `Fulfilled promise in ${delay}ms`, position: 'topRight'});
      }, (delay) => {
        iziToast.error({message: `Rejected promise in ${delay}ms`, position: 'topRight'});
      });
})