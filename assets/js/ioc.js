import * as open_time from './services/open_time.js'
import * as user_session from './services/user_session.js'
import * as user from './services/user.js'
import * as current_time from "./services/current_time.js";
import * as open_timer from "./services/open_timer.js";
import * as session_timer from "./services/user_session_timer.js";
import * as rps from "./services/rps.js";


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

function startSession(expiration, firstName, lastName, budget) {
    return user_session.startSession(expiration, firstName, lastName, budget)
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

function updateCurrentTime(elId) {
    return current_time.updateCurrentTime(elId)
}

function updateOpenTimer(wasOpen, isOpen, onBecameOpen, onBecameClosed, onKeptClosed, periodic = true) {
    return open_timer.updateOpenTimer(wasOpen, isOpen, onBecameOpen, onBecameClosed, onKeptClosed, periodic)
}

function updateSessionTimer(getSession, onSessionExpire, elId) {
    return session_timer.updateSessionTimer(getSession, onSessionExpire, elId)
}

function addRpcGameRecord(bet, won) {
    return user_session.addRpcGameRecord(bet, won)
}


function isRpsGameWinner(lostInARow) {
    return rps.isWinner(lostInARow)
}

export {
    isOpen,
    setToday,
    getToday,
    getSession,
    startSession,
    endSession,
    generateUsername,
    savePreferredColor,
    updateCurrentTime,
    updateOpenTimer,
    updateSessionTimer,
    addRpcGameRecord,
    isRpsGameWinner,
}