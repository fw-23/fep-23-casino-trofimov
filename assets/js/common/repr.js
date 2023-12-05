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

export {
    getDateTimeRepresentation,
    getTimerRepresentation,
    calculateTimer,
}