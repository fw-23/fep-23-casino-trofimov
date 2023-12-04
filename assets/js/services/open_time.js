let TODAY = null;


function isClosedByDayOfWeek(day) {
    return day === 0 || day === 6;
}

function closestWorkingDayOfWeek(today) {
    const dayOfWeek = today.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const out = new Date(today);
    out.setHours(0, 0, 0, 0)
    out.setDate(today.getDate() + daysUntilMonday);
    return out;
}


function isOpen(today) {
    let closed = isClosedByDayOfWeek(today.getDay());
    if (closed === true) {
        return {
            "open": false,
            "willOpenAt": closestWorkingDayOfWeek(today)
        }
    }
    return {
        "open": true,
    }
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