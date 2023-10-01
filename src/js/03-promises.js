import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

/**
 * Submit form
 * @param {number} ev
 */

function onFormSubmit(ev) {
  ev.preventDefault();
  let newDelay = Number(formEl.delay.value);
  for (let i = 1; i <= formEl.amount.value; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay += Number(formEl.step.value);
  }
}
/**
 * Create promise
 * @param {number} position
 * @param {number} delay
 * @returns
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timeoutId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
      clearTimeout(timeoutId);
    }, delay);
  });
}

////////////////////////// Інший варіант

// const refs = {
//   form: document.querySelector('.form'),
//   submitBtn: document.querySelector('button'),
//   amount: document.querySelector('[name="amount"]'),
//   step: document.querySelector('[name="step"]'),
//   delay: document.querySelector('[name="delay"]'),
// };

// refs.submitBtn.addEventListener('click', onFormSubmit);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     const timeoutId = setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//       clearTimeout(timeoutId);
//     }, delay);
//   });
// }

// function onFormSubmit(ev) {
//   ev.preventDefault();

//   let newDelay = Number(refs.delay.value);
//   let step = Number(refs.step.value);
//   let amount = Number(refs.amount.value);

//   let promiseChain = Promise.resolve();

//   for (let i = 1; i <= amount; i += 1) {
//     promiseChain = promiseChain;
//     createPromise(i, newDelay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     newDelay += step;
//   }
// }
