const startBtn = document.querySelector('#start');
const timer = document.querySelector('#pomodoro-time');
const resetBtn = document.querySelector('#reset');
const pomodoroBtn = document.querySelector('#pomodoro');
const breakBtn = document.querySelector('#break');

let timeInSecondsNow = 1500;
let timerId = null;
let nowMode = null;

const timePomodoro = 1500;
const timeBreak = 300;

function clearTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = "start";
}

function updateTimer() {
  let minutes = Math.floor(timeInSecondsNow / 60);
  let seconds = timeInSecondsNow % 60;

  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  timer.innerHTML = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (!timerId) {
    startBtn.textContent = "stop";
    timerId = setInterval(() => {
      timeInSecondsNow--;
      updateTimer();

      if (timeInSecondsNow < 0) {
        clearTimer();

      }
    }, 200)
  } else {
    clearTimer();
  }
}

startBtn.addEventListener('click', toggleTimer);

resetBtn.addEventListener('click', function () {
  clearTimer();
  if(nowMode === 'pomodoro') {
    timeInSecondsNow = timePomodoro;
  } else {
    timeInSecondsNow = timeBreak;
  }
  updateTimer();
})

breakBtn.addEventListener('click', function () {
  clearTimer();
  timeInSecondsNow = timeBreak;
  updateTimer();
  breakBtn.classList.add('active');
  pomodoroBtn.classList.remove('active');

  nowMode = 'break';
})

pomodoroBtn.addEventListener('click', function () {
  clearTimer();
  timeInSecondsNow = timePomodoro;
  updateTimer();
  breakBtn.classList.remove('active');
  pomodoroBtn.classList.add('active');

  nowMode = 'pomodoro';
})