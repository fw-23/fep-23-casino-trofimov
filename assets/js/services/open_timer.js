function updateOpenTimer(wasOpen, isOpen, onBecameOpen, onBecameClosed, onKeptClosed, periodic = true) {
    let result = isOpen();
    if (result['open'] === true && wasOpen === false) {
        onBecameOpen()
    }
    if (result['open'] === false && wasOpen === true) {
        onBecameClosed()
    }
    if (result['open'] === false) {
        onKeptClosed(result)
    }

    if (periodic === true) {
        setTimeout(function () {
            updateOpenTimer(result['open'], isOpen, onBecameOpen, onBecameClosed, onKeptClosed, true)
        }, 1000);
    }
}

export {
    updateOpenTimer,
}