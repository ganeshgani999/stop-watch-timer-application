const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const milliSecondsLabel = document.getElementById("milliseconds");

const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const stopButton = document.getElementById("stopBtn");
const resetButton = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");

/// stop watch variables

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

/// Adding Event Listeners

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

/// functions

function startTimer() {
    if(!interval) {
        interval = setInterval(updateTimer, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
    }

}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
    pauseButton.disabled = true;
    startButton.disabled = false;

}

function stopTimer() {
    clearInterval(interval);
    addToLapList();
    interval = null;
    stopButton.disabled = false;
    startButton.disabled = true;

}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    resetTimerData();
    startButton.disabled = false;
    pauseButton.disabled = true; 

}

function updateTimer() {
    milliseconds++;
    if(milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if(seconds === 60) {
            seconds = 0;
            minutes++;
            if(minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    displayTimer();
}

function displayTimer() {
    milliSecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
    hoursLabel.textContent = padTime(hours);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}