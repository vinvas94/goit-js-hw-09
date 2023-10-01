function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  pEl: document.querySelector('p'),
};

refs.buttonStart.addEventListener('click', onClick);
refs.buttonStop.addEventListener('click', ofClick);

let intervalColorChange = undefined;

function onClick() {
  intervalColorChange = setInterval(() => {
    const newColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = newColor;
  }, 1000);
  refs.buttonStart.toggleAttribute('disabled');
  refs.buttonStop.removeAttribute('disabled');
  refs.pEl.style.display = 'none';
}

function ofClick() {
  clearInterval(intervalColorChange);
  refs.buttonStart.removeAttribute('disabled');
  refs.buttonStop.toggleAttribute('disabled');
  refs.pEl.style.display = 'contents';
}

/// знаю, що це потрібно робити через стилі, але в дз пише не використовувати файл CSS🔒

refs.buttonStart.style.position = 'absolute';
refs.buttonStart.style.top = '50%';
refs.buttonStart.style.right = '50%';

refs.buttonStop.style.position = 'absolute';
refs.buttonStop.style.top = '50%';
refs.buttonStop.style.right = '45%';
