import * as open_time from './services/open_time.js'
import * as user_session from './services/user_session.js'
import * as user from './services/user.js'


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

function startSession(expiration, firstName, lastName) {
    return user_session.startSession(expiration, firstName, lastName)
}

function endSession() {
    return user_session.endSession()
}

function generateUsername(firstName, lastName) {
    return user.generateUsername(firstName, lastName)
}

function savePreferredColor(color) {
    return user_session.savePreferredColor(color)
}

export {
    isOpen, setToday, getToday, getSession, startSession, endSession, generateUsername, savePreferredColor
}