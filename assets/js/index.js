import {
    endSession,
    generateUsername,
    getSession,
    isOpen,
    savePreferredColor,
    setToday,
    startSession as baseStartSession
} from './ioc.js'
import {hideElementById, showElementById} from './utils/shortcuts.js'
import {
    getBrowser,
    getGeolocation,
    getLanguage,
    getPlatform,
    getResolution,
    getWindowSize,
} from './utils/user_agent.js'


function onBecameClosed() {
    let session = getSession()
    if (!(session === null)) {
        logout()
    } else {
        hideElementById('wrapper__reg_form')
    }
    showElementById('wrapper__closed')
}

function onBecameOpen() {
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


function updateOpenTimer(wasOpen, periodic = true) {
    let result = isOpen();
    if (result['open'] === true && wasOpen === false) {
        onBecameOpen()
    }
    if (result['open'] === false && wasOpen === true) {
        onBecameClosed()
    }
    if (result['open'] === false) {
        let willOpenAt = result['willOpenAt']
        const el = document.getElementById('open_timer');

        let calculation = calculateTimer(new Date(), willOpenAt);
        const [seconds, minutes, hours] = [calculation['seconds'], calculation['minutes'], calculation['hours']]

        el.innerHTML = 'Will open at: ' + getDateTimeRepresentation(willOpenAt) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
    }

    if (periodic === true) {
        setTimeout(function () {
            updateOpenTimer(result['open'], true)
        }, 1000);
    }


}

function onSessionExpire() {
    alert('Session expired! Lets login again :)')
    logout();
    let open = isOpen()
    if (open['open'] === true) {
        showElementById('wrapper__reg_form')
    }
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


window.addEventListener('load', function () {
    updateCurrentTime();
});

window.addEventListener('load', function () {
    updateOpenTimer(isOpen()['open'])
});

window.addEventListener('load', function () {
    document.getElementById('reg_form').onsubmit = submitRegForm;
});

window.addEventListener('load', function () {
    document.getElementById('change_color').addEventListener('input', onColorChange);
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
        let wasOpen = isOpen()['open']
        setToday(currentToday)
        updateOpenTimer(wasOpen, false)
    });
});

window.addEventListener('load', function () {
    let session = getSession()
    if (!(session === null)) {
        onLogin(session)
    }
})


function setRegFormResult(result) {
    const error = document.getElementById("reg_form_result");
    error.style.padding = "10px";
    error.style.paddingBottom = '30px';
    error.innerHTML = result
}

function onGeolocationShareSuccess(result, context) {
    let session = startSession(context)
    onLogin(session)
}

function onLogin(session) {
    hideElementById('wrapper__reg_form')
    if (!(session['preferredColor'] === null)) {
        changeColor(session['preferredColor'])
    }
    showProfile(session)
    showElementById('wrapper__change_color')
    console.log(getPlatform())
    console.log(getBrowser())
    console.log(getWindowSize())
    console.log(getResolution())
    console.log(getLanguage())
    showElementById('wrapper__session_timer')
    updateSessionTimer()
}

function onGeolocationShareError(err, context) {
    alert('Share geo please:)')
}


function loginStart(context) {
    getGeolocation(function (result) {
        onGeolocationShareSuccess(result, context)
    }, function (err) {
        onGeolocationShareError(err, context)
    })
}

function logout() {
    hideElementById('wrapper__profile')
    hideElementById('wrapper__session_timer')
    hideElementById('wrapper__change_color')
    endSession();
}


function startSession(context) {
    return baseStartSession(context['expiration'], context['firstName'], context['lastName'], context['budget'])
}

function showProfile(session) {
    let el = showElementById('wrapper__profile')
    el.textContent = `Hej ${generateUsername(session['firstName'], session['lastName'])}! Sessions count: ${session['sessionCount']} `
}


function submitRegForm() {
    const sessionLength = document.getElementById("session_length_selector").value;
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
    const budget = document.getElementById("budget").value.replace(',', '.');

    let errors = [];

    if (firstName.length < 2) {
        errors.push("First name should be more than 2 characters");
    }
    if (lastName.length < 2) {
        errors.push("Last name should be more than 2 characters");
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
        setRegFormResult(errors.join("<br />"));
        alert(errors.join('\n'))
        return false;
    }

    loginStart({
        "expiration": sessionLength,
        "firstName": firstName,
        "lastName": lastName,
        "age": ageNumeric,
        "budget": budgetNumeric
    });

    return false;
}

function changeColor(color) {
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = color;
    savePreferredColor(color)
}

function onColorChange() {
    let color = document.getElementById('color_input').value
    changeColor(color)
}