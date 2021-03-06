const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startButton.addEventListener('click', event => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.dataset.time;
    if (Object.is(time, NaN)) return;
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

const input = document.querySelector('.time-list input');
const MIN_VALUE = 1;
const MAX_VALUE = 86400;
input.setAttribute('min', MIN_VALUE.toString());
input.setAttribute('max', MAX_VALUE.toString());
input.addEventListener('keyup', event => {
  if (input.value < MIN_VALUE) {
    input.value = MIN_VALUE;
  } else if (input.value > MAX_VALUE) {
    input.value = MAX_VALUE;
  }
  const lastButton = timeList.lastElementChild.querySelector('button');
  lastButton.innerText = input.value + ' seconds';
  lastButton.setAttribute('data-time', input.value);
})

let inv;

function startGame() {
  setTime();
  createRandomCircle();
  inv = setInterval(decreaseTime, 1000);
}

function decreaseTime() {
  if (time <= 1) {
    finishGame();
    clearInterval(inv);
  } else {
    --time;
    setTime();
  }
}

function setTime() {
  const hours = String(~~(time / 3600)).padStart(2, '0');
  const minutes = String(~~(time % 3600 / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  timeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

function finishGame() {
  timeElement.parentElement.classList.add('hide');
  board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  const size = getRandomNumber(10, 60);
  circle.style.width = size + 'px';
  circle.style.height = size + 'px';
  const {
    width,
    height
  } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = y + 'px';
  circle.style.left = x + 'px';
  circle.style.backgroundColor = getRandomColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  let color = '#';
  let colorPart;
  let isDark = true;
  for (let i = 1; i <= 2; i++) {
    colorPart = Math.round(Math.random() * 255);
    if (colorPart > 127) isDark = false;
    color += colorPart.toString(16).padStart(2, '0');
  }
  do {
    colorPart = Math.round(Math.random() * 255);
    if (colorPart > 127) isDark = false;
  } while (isDark);
  color += colorPart.toString(16).padStart(2, '0');
  return color;
}
