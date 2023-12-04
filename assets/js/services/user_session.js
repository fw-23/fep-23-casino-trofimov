let SESSION = null;

function getSession() {
    return structuredClone(SESSION);
}

function startSession(expiration, firstName, lastName) {
    let sessionsCount = localStorage.getItem("sessionCount");
    if (sessionsCount === null) {
        localStorage.setItem('sessionCount', '1')
        sessionsCount = 1
    } else {
        sessionsCount = parseInt(sessionsCount) + 1
        localStorage.setItem('sessionCount', sessionsCount.toString())
    }
    console.log(sessionsCount)
    if (!(SESSION === null)) {
        return
    }
    SESSION = {
        "endsAt": new Date(new Date().getTime() + expiration * 1000),
        "sessionCount": sessionsCount,
        "firstName": firstName,
        "lastName": lastName,
        "color": localStorage.getItem('preferredColor') || null
    };
    return getSession();
}

function savePreferredColor(color) {
    localStorage.setItem('preferredColor', color)
}

function endSession() {
    SESSION = null;
}

export {
    getSession,
    startSession,
    endSession,
    savePreferredColor,
}