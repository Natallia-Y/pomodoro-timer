const startBtn = document.querySelector('#start');
const timer = document.querySelector('#pomodoro-time');

let time = 1500;
let timerId = null;

function clearTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = "start";
}

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  timer.innerHTML = `${minutes}:${seconds}`;
}

startBtn.addEventListener('click', function () {
  if (!timerId) {
    startBtn.textContent = "stop";
    timerId = setInterval(() => {
      time--;
      updateTimer();

      if (time < 0) {
        clearTimer();
        timer.innerHTML = "25:00";
        time = 1500;
      }
    }, 200)
  } else {
    clearTimer();
  }
})
