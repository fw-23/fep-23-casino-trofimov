import * as open_time from './services/open_time.js'
import * as user_session from './services/user_session.js'


function isOpen() {
    return open_time.isOpen(getToday())
}

function setToday(today) {
    return open_time.setToday(today)
}

function getToday() {
    return open_time.getToday()
}

function getSession() {
    return user_session.getSession()
}

function startSession(expiration) {
    return user_session.startSession(expiration)
}

function endSession() {
    return user_session.endSession()
}


export {
    isOpen, setToday, getToday, getSession, startSession, endSession,
}