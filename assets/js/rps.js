import {hideElementById, showElementById} from './utils/shortcuts.js'
import {
    getSession,
    savePreferredColor,
    updateSessionTimer,
    isRpsGameWinner,
    addRpcGameRecord,
    endSession,
} from "./ioc.js";
import {showProfile as baseShowProfile} from "./common/profile.js";


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

let GAME_ITEMS = [
    {
        "name": "rock",
        "img": "../assets/img/rps/stone.png"
    },
    {
        "name": "paper",
        "img": "../assets/img/rps/paper.png"
    },
    {
        "name": "scissors",
        "img": "../assets/img/rps/scissors.png"
    }
]

function play() {
    let bet = document.getElementById('bet_amount_input').value
    bet = parseInt(bet)
    if (isNaN(bet) || bet == null) {
        alert('Please provide correct bet!')
        return
    }
    let session = getSession()
    if (bet > session['budget']) {
        alert('No enough money :(')
        return
    }
    let won = isRpsGameWinner(session['lostInARow'])
    session = addRpcGameRecord(bet, won)
    showProfile(session)
    if (session['budget'] === 0) {
        endSession()
        onSessionExpire()
        alert('No money left(. Good luck next time!')
    }
}

function createGameItemDiv(text, imgSrc) {
    let div = document.createElement('div');
    div.text = text
    div.classList = ['game_item']
    let img = document.createElement('img')
    img.src = imgSrc
    img.onclick = play
    div.appendChild(img)
    return div;
}


function initGameSession() {
    let gameItemsDiv = document.getElementById('game_items')
    GAME_ITEMS.forEach(function (element) {
        gameItemsDiv.appendChild(createGameItemDiv(element['name'], element['img']))
    })
    return {}
}


window.addEventListener('load', function () {
    initGameSession()
})


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
}