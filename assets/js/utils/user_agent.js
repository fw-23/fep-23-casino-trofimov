function getPlatform() {
    return navigator.platform;
}

// Function to get browser information
function getBrowser() {
    return navigator.userAgent;
}

// Function to get window size
function getWindowSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}

// Function to get screen resolution
function getResolution() {
    return {
        width: screen.width, height: screen.height
    };
}

// Function to get user's language
function getLanguage() {
    return navigator.language || navigator.userLanguage || navigator.systemLanguage || null;
}

// Function to get geolocation data
function getGeolocation(onSuccess, onError) {
    navigator.geolocation.getCurrentPosition(function (position) {
        onSuccess({
            "latitude": position.coords.latitude, "longitude": position.coords.longitude
        })
    }, function (error) {
        onError(error)
    });
}

export {
    getPlatform, getBrowser, getWindowSize, getResolution, getLanguage, getGeolocation,
}