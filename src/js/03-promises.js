import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]')
}

selectors.form.addEventListener("click", createPromisesClick)

const options = {
  position: 'center-bottom',
  distance: '30px',
  borderRadius: '5px',
  opacity: 0.8,
  timeout: 8000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',  //from-right
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromisesClick(evt) {
  evt.preventDefault();

  let formDelay = +selectors.delay.value;
  let formStep = +selectors.step.value;
  let formAmount = +selectors.amount.value;

  for (let i = 1; i <= formAmount; i++) {
    formDelay += formStep;
    
    createPromise(i, formDelay)
      .then(({ position, delay }) => {
         // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, options);
     })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, options);
       });
    evt.currentTarget.reset();
  }
}