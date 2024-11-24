class Stopwatch {
    constructor(display, startStopBtn, resetBtn, lapsContainer, progressCircle) {
        this.stopwatch = null;
        this.isRunning = false;
        this.startTime = null;
        this.elapsedTime = 0;
        this.laps = [];
        this.display = display;
        this.startStopBtn = startStopBtn;
        this.resetBtn = resetBtn;
        this.lapsContainer = lapsContainer;
        this.progressCircle = progressCircle;

        startStopBtn.addEventListener('click', () => this.startStop());
        resetBtn.addEventListener('click', () => this.resetOrLap());
        this.updateDisplay();
    }

    startStop() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.stopwatch = setInterval(() => this.updateDisplay(), 10);
            this.startStopBtn.textContent = 'Stop';
            this.startStopBtn.classList.add('stop');
            this.resetBtn.textContent = 'Lap';
        } else {
            this.isRunning = false;
            this.elapsedTime = Date.now() - this.startTime;
            clearInterval(this.stopwatch);
            this.startStopBtn.textContent = 'Start';
            this.startStopBtn.classList.remove('stop');
            this.resetBtn.textContent = 'Reset';
        }
    }

    resetOrLap() {
        if (this.isRunning) {
            this.recordLap();
        } else {
            this.reset();
        }
    }

    recordLap() {
        const lapTime = this.formatTime(Date.now() - this.startTime);
        this.laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${this.laps.length}: ${lapTime}`;
        this.lapsContainer.appendChild(lapElement);
    }

    reset() {
        clearInterval(this.stopwatch);
        this.isRunning = false;
        this.elapsedTime = 0;
        this.startStopBtn.textContent = 'Start';
        this.startStopBtn.classList.remove('stop');
        this.resetBtn.textContent = 'Reset';
        this.laps = [];
        this.lapsContainer.innerHTML = '';
        this.updateDisplay();
    }

    updateDisplay() {
        const currentTime = this.isRunning ? Date.now() - this.startTime : this.elapsedTime;
        this.display.textContent = this.formatTime(currentTime);
        this.updateProgressCircle(currentTime);
    }

    formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }

    updateProgressCircle(time) {
        const seconds = time / 1000;
        const offset = 301.59 - (seconds % 60) * (301.59 / 60);
        this.progressCircle.style.strokeDashoffset = offset;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const lapsContainer = document.getElementById('laps');
    const progressCircle = document.getElementById('progress-circle');
    new Stopwatch(display, startStopBtn, resetBtn, lapsContainer, progressCircle);
});
