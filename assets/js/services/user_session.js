let SESSION = null;

function getSession() {
    return structuredClone(SESSION);
}

function startSession(expiration) {
    if (!(SESSION === null)) {
        return
    }
    SESSION = {
        "endsAt": new Date(new Date().getTime() + expiration * 1000)
    };
    return getSession();
}

function endSession() {
    SESSION = null;
}

export {
    getSession,
    startSession,
    endSession,
}