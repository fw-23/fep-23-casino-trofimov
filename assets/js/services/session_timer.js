import {calculateTimer, getDateTimeRepresentation, getTimerRepresentation} from "../common/repr.js";

function updateSessionTimer(getSession, onSessionExpire, elId) {
    const session = getSession()
    if (session === null || session['endsAt'] < new Date()) {
        onSessionExpire()
        return
    }
    const el = document.getElementById(elId);


    let calculation = calculateTimer(new Date(), session['endsAt']);
    const [seconds, minutes, hours] = [calculation['seconds'], calculation['minutes'], calculation['hours']]

    el.innerHTML = 'Session ends at: ' + getDateTimeRepresentation(session['endsAt']) + '<br/>Time left: ' + getTimerRepresentation(hours, minutes, seconds);
    setTimeout(function () {
        updateSessionTimer(getSession, onSessionExpire, elId)
    }, 1000);
}

export {
    updateSessionTimer,
}