import {
    endSession,
    getSession,
    isOpen,
    savePreferredColor,
    setToday,
    updateCurrentTime,
    updateSessionTimer,
    startSession,
    updateOpenTimer as baseUpdateOpenTimer,
} from './ioc.js'
import {hideElementById, showElementById} from './utils/shortcuts.js'
import {
    getBrowser, getGeolocation, getLanguage, getPlatform, getResolution, getWindowSize,
} from './utils/user_agent.js'
import {hideProfile, showProfile} from "./common/profile.js";
import {calculateTimer, getDateTimeRepresentation, getTimerRepresentation} from "./common/repr.js";


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


function updateOpenTimer(wasOpen, periodic = true) {
    return baseUpdateOpenTimer(wasOpen, isOpen, onBecameOpen, onBecameClosed, onKeptClosed, periodic)
}

function onSessionExpire() {
    alert('Session expired! Lets login again :)')
    logout();
    let open = isOpen()
    if (open['open'] === true) {
        showElementById('wrapper__reg_form')
    }
}

function onKeptClosed(result) {
    let willOpenAt = result['willOpenAt']
    const el = document.getElementById('open_timer');

    let calculation = calculateTimer(new Date(), willOpenAt);
    const [seconds, minutes, hours] = [calculation['seconds'], calculation['minutes'], calculation['hours']]

    el.innerHTML = 'Will open at: ' + getDateTimeRepresentation(willOpenAt) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
}


window.addEventListener('load', function () {
    updateCurrentTime('current_time');
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
    let session = startSession(context['expiration'] * 60, context['firstName'], context['lastName'], context['budget'])
    onLogin(session)
}

function onLogin(session) {
    hideElementById('wrapper__reg_form')
    if (!(session['preferredColor'] === null)) {
        changeColor(session['preferredColor'])
    }
    showProfile(session['firstName'], session['lastName'], session['sessionCount'], session['budget'])
    showElementById('wrapper__change_color')
    console.log('Platform: ', getPlatform())
    console.log('Browser: ', getBrowser())
    console.log('Window size: ', getWindowSize())
    console.log('Resolution: ', getResolution())
    console.log('Language: ', getLanguage())
    showElementById('wrapper__session_timer')
    updateSessionTimer(getSession, onSessionExpire, 'session_timer')
}

function onGeolocationShareError(err, context) {
    alert('Share geo please:)')
}


function startLogin(context) {
    getGeolocation(function (result) {
        onGeolocationShareSuccess(result, context)
    }, function (err) {
        onGeolocationShareError(err, context)
    })
}

function logout() {
    hideProfile('wrapper__profile', 'wrapper__session_timer', 'wrapper__change_color')
    endSession();
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

    startLogin({
        "expiration": sessionLength,
        "firstName": firstName,
        "lastName": lastName,
        "age": parseInt(age),
        "budget": parseInt(budget),
    });

    return false;
}