let start_time = null;
let lap_start_time = null;
let stopped_time = null;
let laps = [];
let is_running = false;

function startTimer() {
    if (!is_running) {
        start_time = Date.now();
        lap_start_time = start_time;
        is_running = true;
        updateDisplay();
        disableButton(document.getElementById('start'));
        enableButton(document.getElementById('lapBtn'));
        enableButton(document.getElementById('stop'));
    }
}

function recordLap() {
    if (is_running) {
        let lap_end_time = Date.now();
        let lap_duration = lap_end_time - lap_start_time;
        laps.push(lap_duration);
        lap_start_time = lap_end_time;
        updateDisplay();
    }
}

function stopTimer() {
    if (is_running) {
        is_running = false;
        enableButton(document.getElementById('start'));
        disableButton(document.getElementById('lapBtn'));
        disableButton(document.getElementById('stop'));
        enableButton(document.getElementById('reset'));

        let total_time_elapsed = Date.now() - start_time;
        stopped_time = total_time_elapsed;
        showResults(total_time_elapsed);
    }
}

function resetTimer() {
    start_time = null;
    lap_start_time = null;
    stopped_time = null;
    laps = [];
    is_running = false;
    enableButton(document.getElementById('start'));
    disableButton(document.getElementById('lapBtn'));
    disableButton(document.getElementById('stop'));
    disableButton(document.getElementById('reset'));
    updateDisplay();
}

function updateDisplay() {
    let timer_display = document.getElementById('timer');
    let lap_display_top = document.getElementById('lap-top');
    let lap_display_bottom = document.getElementById('lap-bottom');
    let stopped_display = document.getElementById('stopped');

    if (is_running) {
        let current_time = Date.now();
        let elapsed_time = current_time - start_time;
        let formatted_time = formatTime(elapsed_time);
        let lap_text = laps.map((lap, i) => `Lap ${i + 1}: ${formatTime(lap)}`).join('<br>');

        // Extract milliseconds part
        let millisecondsPart = formatted_time.slice(-3);

        timer_display.innerHTML = `${formatted_time.slice(0, -4)}:<span id="milliseconds">${millisecondsPart}</span>`;
        lap_display_top.innerHTML = "";
        lap_display_bottom.innerHTML = lap_text;
        setTimeout(updateDisplay, 10); // Update every 10 milliseconds
    } else if (stopped_time !== null) {
        stopped_display.innerHTML = `Stopped Time: ${formatTime(stopped_time)}`;
        showResults(stopped_time);
    } else {
        timer_display.innerHTML = "00:00:000";
        lap_display_top.innerHTML = "";
        lap_display_bottom.innerHTML = "";
        stopped_display.innerHTML = "";
        setTimeout(updateDisplay, 10); // Update every 10 milliseconds
    }
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let millisecondsPart = milliseconds % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsPart).padStart(3, '0')}`;
}

function showResults(total_time_elapsed) {
    let lap_text = laps.map((lap, i) => `Lap ${i + 1}: ${formatTime(lap)}`).join('<br>');
    let results_text = `Total Time: ${formatTime(total_time_elapsed)}<br>${lap_text}`;
    document.getElementById('results').innerHTML = results_text;
}

function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
});
