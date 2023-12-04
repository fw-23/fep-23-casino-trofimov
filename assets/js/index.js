import {isOpen, setToday, getSession, startSession, endSession} from './ioc.js'

function hideElementById(id) {
    const regFormWrapper = document.getElementById(id);
    regFormWrapper.style.display = "none";
}

function showElementById(id, kind = 'block') {
    const regFormWrapper = document.getElementById(id);
    regFormWrapper.style.display = kind
}


function onClosed(willOpenAt) {
    hideElementById('wrapper__reg_form')
    showElementById('wrapper__closed')
    updateOpenTimer();
}

function onOpen() {
    hideElementById('wrapper__closed')
    showElementById('wrapper__reg_form')
}

function getDateTimeRepresentation(now) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };

    return now.toLocaleDateString('en-US', options);
}

function getTimerRepresentation(hours, minutes, seconds) {
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return hours + 'h ' + minutes + 'm ' + seconds + 's ';
}

function updateCurrentTime() {
    const el = document.getElementById('current_time');
    const now = new Date();
    el.textContent = 'Current Time: ' + getDateTimeRepresentation(now);
    setTimeout(updateCurrentTime, 1000);
}

function calculateTimer(date1, date2) {
    const diff = date2 - date1;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    return {
        "hours": hours, "seconds": seconds, "minutes": minutes
    }
}

function updateOpenTimer() {
    let result = isOpen();
    if (result['open'] === true) {
        return
    }
    let willOpenAt = result['willOpenAt']
    const el = document.getElementById('open_timer');

    let calculation = calculateTimer(new Date(), willOpenAt);
    const [seconds, minutes, hours] = [calculation['seconds'], calculation['minutes'], calculation['hours']]

    el.innerHTML = 'Will open at: ' + getDateTimeRepresentation(willOpenAt) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
    setTimeout(updateOpenTimer, 1000);
}

function onSessionExpire() {
    alert('Session expired! Lets login again :)')
    hideElementById('wrapper__session_timer')
    endSession();
    showElementById('wrapper__reg_form')
}


function updateSessionTimer() {
    const session = getSession()
    if (session === null || session['endsAt'] < new Date()) {
        onSessionExpire()
        return
    }
    const el = document.getElementById('session_timer');


    let calculation = calculateTimer(new Date(), session['endsAt']);
    const [seconds, minutes, hours] = [calculation['seconds'], calculation['minutes'], calculation['hours']]

    el.innerHTML = 'Session ends at: ' + getDateTimeRepresentation(session['endsAt']) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
    setTimeout(updateSessionTimer, 1000);
}


function checkIsOpen() {
    let result = isOpen();
    result['open'] === true ? onOpen() : onClosed(result['willOpenAt']);
}

window.addEventListener('load', function () {
    updateCurrentTime();
});

window.addEventListener('load', function () {
    checkIsOpen();
});

window.addEventListener('load', function () {
    document.getElementById('reg_form').onsubmit = submitRegForm;
});


window.addEventListener('load', function () {
    const daySelect = document.getElementById("day_selector");

    // Add an event listener to handle the selection
    daySelect.addEventListener("change", function () {
        // Get the selected value
        const selectedDay = daySelect.selectedIndex;
        let currentToday = new Date();
        currentToday.setDate(currentToday.getDate() - currentToday.getDay() + parseInt(selectedDay))
        if (currentToday < new Date()) {
            currentToday?.setDate(currentToday.getDate() + 7)
        }
        setToday(currentToday)
        checkIsOpen()
    });
});


function onLogin() {
    hideElementById('wrapper__reg_form')
    showElementById('wrapper__session_timer')
    updateSessionTimer()
}


function submitRegForm() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
    const budget = document.getElementById("budget").value.replace(',', '.');

    let errors = [];

    if (firstName.length < 6) {
        errors.push("First name should be more than 6 characters");
    }
    if (lastName.length < 6) {
        errors.push("Last name should be more than 6 characters");
    }

    const ageNumeric = !isNaN(parseInt(age)) && isFinite(age);
    const budgetNumeric = !isNaN(parseFloat(budget)) && isFinite(budget);

    if (!ageNumeric || !budgetNumeric) {
        errors.push('Age and Budget fields accept only numeric values')
    }

    if (ageNumeric && (age < 18)) {
        errors.push('Age must be 18 or older')
    }

    if (errors.length > 0) {
        const error = document.getElementById("reg_form_error");
        error.style.padding = "10px";
        error.style.paddingBottom = '30px';
        error.innerHTML = errors.join("<br />");
        alert(errors.join('\n'))
        return false;
    }

    startSession(1)
    onLogin();

    return false;
}