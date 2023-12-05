import {hideElementById, showElementById} from './utils/shortcuts.js'
import {getSession, isOpen, updateCurrentTime, updateOpenTimer as baseUpdateOpenTimer} from "./ioc.js";

window.addEventListener('load', function () {
    updateCurrentTime('current_time');
});

function updateOpenTimer(wasOpen, periodic = true) {
    return baseUpdateOpenTimer(wasOpen, isOpen, onBecameOpen, onBecameClosed, onKeptClosed, periodic)
}

function onBecameClosed() {
    let session = getSession()
    if (!(session === null)) {
        logout()
    } else {
        hideElementById('wrapper__reg_form')
    }
    showElementById('wrapper__closed')
}

function onBecameOpen() {
    hideElementById('wrapper__closed')
    showElementById('wrapper__reg_form')
}
