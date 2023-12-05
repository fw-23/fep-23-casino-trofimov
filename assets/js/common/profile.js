import {hideElementById, showElementById} from "../utils/shortcuts.js";
import {generateUsername, savePreferredColor} from "../ioc.js";

function showProfile(firstName, lastName, sessionCount, budget) {
    let el = showElementById('wrapper__profile')
    el.textContent = `Hej ${generateUsername(firstName, lastName)}! Sessions count: ${sessionCount} Current budget: ${budget}`
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