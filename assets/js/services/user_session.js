function getSession() {
    let out = JSON.parse(localStorage.getItem('session'))
    if (out === null) {
        return null;
    }
    out['endsAt'] = new Date(out['endsAt'])
    out['preferredColor'] = getPreferredColor()
    return out
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
    };
    localStorage.setItem('session', JSON.stringify(session))
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

export {
    getSession,
    startSession,
    endSession,
    savePreferredColor,
}