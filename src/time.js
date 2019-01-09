const secondsTimer = document.getElementById("seconds");
const minutesTimer = document.getElementById("minutes");
const hourTimer = document.getElementById("hours");
let timer = null;
window.isTimerPaused = false;

function startTimer() {
  let seconds = 0;
  secondsTimer.innerHTML = 0;
  let minutes = 0;
  minutesTimer.innerHTML = 0;
  let hours = 0;
  hourTimer.innerHTML = 0;
  timer = setInterval(() => {
    if (!isTimerPaused) {
      seconds += 1;
      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
        minutesTimer.innerHTML = minutes;
      }
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
        hourTimer.innerHTML = hours;
      }
      secondsTimer.innerHTML = seconds;
    }
  }, 1000);
}

export function restartTimer() {
  if (timer) {
    clearInterval(timer);
    startTimer();
  } else {
    startTimer();
  }
}

window.togglePause = function() {
  if (loop.isStopped) {
    loop.start();
  } else {
    loop.stop();
  }
  isTimerPaused = !isTimerPaused;
};

export function pause() {
  loop.stop();
  isTimerPaused = true;
}
