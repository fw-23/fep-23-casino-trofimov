import {hideElementById, showElementById} from './utils/shortcuts.js'
import {getSession, isOpen, updateCurrentTime, updateOpenTimer as baseUpdateOpenTimer} from "./ioc.js";

window.addEventListener('load', function () {
    updateCurrentTime('current_time');
});
