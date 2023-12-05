import {getDateTimeRepresentation} from "../common/repr.js";

function updateCurrentTime(elId) {
    const el = document.getElementById(elId);
    const now = new Date();
    el.textContent = 'Current Time: ' + getDateTimeRepresentation(now);
    setTimeout(function () {
        updateCurrentTime(elId)
    }, 1000);
}

export {
    updateCurrentTime
}