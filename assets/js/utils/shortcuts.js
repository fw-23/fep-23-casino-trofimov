function hideElementById(id) {
    const el = document.getElementById(id);
    el.style.display = "none";
    return el
}

function showElementById(id, kind = 'block') {
    const el = document.getElementById(id);
    el.style.display = kind
    return el
}

export {
    hideElementById,
    showElementById,
}