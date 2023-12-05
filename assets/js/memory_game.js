import {hideElementById, showElementById} from './utils/shortcuts.js'
import {
    getSession, savePreferredColor, updateSessionTimer,
} from "./ioc.js";
import {showProfile as baseShowProfile} from "./common/profile.js";

let BOARD_SYMBOLS = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G'];
let KNOWN_SYMBOLS = new Set();
let LATEST_PICKED_TILE = null;
let ALLOWED_TO_PICK = false;


function createTile(index, symbol) {
    let div = document.createElement('div');
    div.id = "tile_" + index
    div.index = index
    div.symbol = symbol
    div.onclick = onTileClick
    div.innerText = symbol
    return div;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function createNewBoard() {
    shuffleArray(BOARD_SYMBOLS)
    let boardDiv = document.getElementById('memory_board')
    boardDiv.innerHTML = ''
    BOARD_SYMBOLS.forEach(function (el, index) {
        boardDiv.appendChild(createTile(index, el))
    })
    ALLOWED_TO_PICK = true
}

function flipTileBack(tile) {
    tile.style.background = 'lightsteelblue';
    tile.style.color = 'black'
}

function flipTileFront(tile) {
    tile.style.background = '';
    tile.style.color = 'white'
}


function onTileClick(event) {
    if (ALLOWED_TO_PICK === false) {
        return
    }
    let tile = event.target
    if (!(LATEST_PICKED_TILE === null) && LATEST_PICKED_TILE.id === tile.id) {
        return
    }

    flipTileBack(tile)
    KNOWN_SYMBOLS.add(tile.index)

    if (LATEST_PICKED_TILE === null) {
        LATEST_PICKED_TILE = tile;
        return
    }

    setTimeout(function () {
        flipTileFront(LATEST_PICKED_TILE)
        flipTileFront(tile)
        LATEST_PICKED_TILE = null;
        if (KNOWN_SYMBOLS.size === BOARD_SYMBOLS.length) {
            setTimeout(createNewBoard, 1200)
        } else {
            ALLOWED_TO_PICK = true
        }

    }, 700)
    ALLOWED_TO_PICK = false;
}

window.addEventListener('load', function () {
    let session = getSession()
    if (!(session === null)) {
        onLogin(session)
    }
})

function changeColor(color) {
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = color;
    savePreferredColor(color)
}

function onSessionExpire() {
    window.location.href = '../index.html';
}


function showProfile(session) {
    baseShowProfile(session['firstName'], session['lastName'], session['sessionCount'], session['budget'])
}


function onLogin(session) {
    hideElementById('wrapper__login_required')
    showElementById('wrapper__game', 'flex')
    if (!(session['preferredColor'] === null)) {
        changeColor(session['preferredColor'])
    }
    showProfile(session)
    showElementById('wrapper__session_timer')
    updateSessionTimer(getSession, onSessionExpire, 'session_timer')
    createNewBoard()
}


