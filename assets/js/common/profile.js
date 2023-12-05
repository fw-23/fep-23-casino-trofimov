import {hideElementById, showElementById} from "../utils/shortcuts.js";
import {generateUsername} from "../ioc.js";

function showProfile(firstName, lastName, sessionCount, budget) {
    let el = showElementById('wrapper__profile')
    let lines = [`Hej ${generateUsername(firstName, lastName)}!`, `Session count: ${sessionCount}`, `Current budget: ${budget / 100}`]
    el.innerHTML = lines.join('<br/>')
}

function hideProfile(profileElId, sessionTimerElId, changeColorId) {
    hideElementById(profileElId)
    hideElementById(sessionTimerElId)
    hideElementById(changeColorId)
}


export {
    showProfile,
    hideProfile
}