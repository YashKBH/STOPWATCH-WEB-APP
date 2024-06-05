let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let modeToggleBtn = document.getElementById('modeToggleBtn');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let millisecondsDisplay = document.getElementById('milliseconds');
let lapList = document.getElementById('lapList');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let running = false;

function startStopwatch() {
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(interval);
}

function resetStopwatch() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    running = false;
    startStopBtn.textContent = 'Start';
    lapList.innerHTML = '';
}

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    millisecondsDisplay.textContent = milliseconds < 100 ? '0' + milliseconds / 10 : milliseconds / 10;
}

function recordLap() {
    const lapTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 100 ? '0' + milliseconds / 10 : milliseconds / 10}`;
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapList.appendChild(li);
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
        startStopBtn.textContent = 'Stop';
    } else {
        stopStopwatch();
        startStopBtn.textContent = 'Start';
    }
    running = !running;
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
modeToggleBtn.addEventListener('click', toggleMode);
