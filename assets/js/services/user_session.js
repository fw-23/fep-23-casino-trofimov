function getSession() {
    let out = JSON.parse(localStorage.getItem('session'))
    if (out === null) {
        return null;
    }
    out['endsAt'] = new Date(out['endsAt'])
    out['preferredColor'] = getPreferredColor()
    return out
}

function setSession(session) {
    localStorage.setItem('session', JSON.stringify(session))
}

function startSession(expiration, firstName, lastName, budget) {
    let sessionsCount = localStorage.getItem("sessionCount");
    if (sessionsCount === null) {
        localStorage.setItem('sessionCount', '1')
        sessionsCount = 1
    } else {
        sessionsCount = parseInt(sessionsCount) + 1
        localStorage.setItem('sessionCount', sessionsCount.toString())
    }
    let session = getSession()

    if (!(session === null)) {
        return session
    }
    session = {
        "endsAt": new Date(new Date().getTime() + expiration * 1000),
        "sessionCount": sessionsCount,
        "firstName": firstName,
        "lastName": lastName,
        "budget": budget,
        "lostInARow": 0,
    };
    setSession(session)
    session['preferredColor'] = getPreferredColor()
    return session
}

function savePreferredColor(color) {
    localStorage.setItem('preferredColor', color)
}

function getPreferredColor() {
    return localStorage.getItem('preferredColor')
}

function endSession() {
    localStorage.removeItem('session')
}

function addRpcGameRecord(bet, won) {
    let session = getSession()
    if (session === null) {
        return
    }
    if (won === true) {
        session['lostInARow'] = 0
        session['budget'] = session['budget'] + bet * 2
    } else {
        session['lostInARow'] = session['lostInARow'] + 1
        session['budget'] = session['budget'] - bet
    }
    setSession(session)
    return session
}


export {
    getSession,
    startSession,
    endSession,
    savePreferredColor,
    addRpcGameRecord,
}