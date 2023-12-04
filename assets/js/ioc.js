import * as open_time from './services/open_time.js'

let TODAY = null;

function isOpen() {
    return open_time.isOpen(getToday())
}

function setToday(today) {
    TODAY = today;
}

function getToday() {
    return TODAY === null ? new Date() : TODAY;
}


export {
    isOpen,
    setToday,
    getToday,
}