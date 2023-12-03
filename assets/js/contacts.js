var map = L.map('map').setView([53.349805, -6.26031], 6); // Center the map around Dublin and set the zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var libraryLocations = [
    {lat: 53.349805, lng: -6.26031, name: "Central Library, Dublin"},
    {lat: 51.8969, lng: -8.4863, name: "Riverside Library, Cork"},
    {lat: 53.2707, lng: -9.0568, name: "Harborview Library, Galway"}
];

libraryLocations.forEach(function (library) {
    L.marker([library.lat, library.lng]).addTo(map)
        .bindPopup(library.name);
});