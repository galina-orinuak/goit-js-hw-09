import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const firstDelay = document.querySelector('input[name="delay"]');
const delatStep = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(ev) {
  ev.preventDefault();

  let delay = Number(firstDelay.value);
  let step = Number(delatStep.value);
  let amount = Number(amountEl.value);
  let position = 0;

  if (delay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.failure(`Please enter a correct value`);
  }

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}