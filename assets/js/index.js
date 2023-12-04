import {isOpen, setToday, getToday} from './ioc.js'


function onClosed(willOpenAt) {
    const regFormWrapper = document.getElementById('wrapper__reg_form');
    regFormWrapper.style.display = "none";
    const closedWrapper = document.getElementById('wrapper__closed');
    closedWrapper.style.display = "block";
    updateOpenTimer(willOpenAt);
}

function onOpen() {
    const closedWrapper = document.getElementById('wrapper__closed');
    closedWrapper.style.display = "none";
    const regFormWrapper = document.getElementById('wrapper__reg_form');
    regFormWrapper.style.display = "block";
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

function updateOpenTimer(willOpenAt) {
    const el = document.getElementById('open_timer');
    const diff = willOpenAt - new Date();
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    el.innerHTML = 'Will open at: ' + getDateTimeRepresentation(willOpenAt) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
    setTimeout(function () {
        updateOpenTimer(willOpenAt)
    }, 1000);
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

    if (errors) {
        const error = document.getElementById("reg_form_error");
        error.style.padding = "10px";
        error.innerHTML = errors.join("<br />");
    }
    alert(errors.join('\n'))
    return false;
}