const onToggleClick = () => {
    const nav = document.getElementById("topnav");
    nav.className === "topnav" ? nav.className += " responsive" : nav.className = "topnav";
};

LINKS = [
    {
        "href": "index.html",
        "title": "Home"
    },
    {
        "href": "contacts.html",
        "title": "Contacts"
    },
    {
        "href": "gallery.html",
        "title": "Gallery"
    },
]

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
        let classList = window.location.href.endsWith(key) ? ['active'] : null;
        // TODO: high coupling with files structure, refactor
        let href = window.location.href.endsWith('index.html') ? 'pages/' + key : (key !== 'index.html' ? key : '../' + key);
        menu.appendChild(createMenuItem(href, value, classList))
    })
}

window.addEventListener('load', function () {
    fulfillMenu()
});

