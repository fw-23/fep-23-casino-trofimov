const onToggleClick = () => {
    const nav = document.getElementById("topnav");
    nav.className === "topnav" ? nav.className += " responsive" : nav.className = "topnav";
};

LINKS = [{
    "href": "index.html", "title": "Home"
}, {
    "href": "contacts.html", "title": "Contacts"
}, {
    "href": "gallery.html", "title": "Gallery"
}, {
    "href": "rps.html", "title": "RPS"
}, {
    "href": "memory_game.html", "title": "Memory Game"
}]

function createMenuItem(href, text, classList = null) {
    let a = document.createElement('a');
    a.href = href
    a.text = text
    a.classList = classList
    return a;
}

function fulfillMenu() {
    let menu = document.getElementById('topnav')
    LINKS.forEach(function (element) {
        const [key, value] = [element['href'], element['title']]
        let classList = window.location.pathname.endsWith(key) || (key === 'index.html' && window.location.pathname.endsWith('/')) ? ['active'] : null;
        // TODO: high coupling with files structure, refactor

        let href;

        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            href = (key === 'index.html') ? key : 'pages/' + key;
        } else {
            href = (key === 'index.html') ? '../' + key : key;
        }

        menu.appendChild(createMenuItem(href, value, classList))
    })
}

window.addEventListener('load', function () {
    fulfillMenu()
});

