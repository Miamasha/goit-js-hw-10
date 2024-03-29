// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {

    event.preventDefault();
    event.stopPropagation();

    let delay = form.elements["delay"].value;
    let stateFulfilled = document.querySelector('input[value="fulfilled"]:checked');
    let stateRejected = document.querySelector('input[value="rejected"]:checked');

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(stateFulfilled){
                resolve(iziToast.success({message: `Fulfilled promise in ${delay}ms`, position: 'topRight'}))
            }
            else if (stateRejected){
                reject(iziToast.error({message: `Rejected promise in ${delay}ms`, position: 'topRight'}));
            }
            
        }, delay);
    });

    
})