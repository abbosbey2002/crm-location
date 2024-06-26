const predefinedLatitude = 41.2995; // misol uchun Toshkent shahri
const predefinedLongitude = 69.2401; // misol uchun Toshkent shahri
const radius = 1000; // radius metrda (misol uchun 1000 metr)

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        document.getElementById("result").textContent = "Geolocation is not supported by this browser.";
    }
}

function success(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    const distance = calculateDistance(predefinedLatitude, predefinedLongitude, userLatitude, userLongitude);

    if (distance <= radius) {
        document.getElementById("result").textContent = "User is within the predefined area.";
    } else {
        document.getElementById("result").textContent = "User is outside the predefined area.";
    }
}

function error() {
    document.getElementById("result").textContent = "Unable to retrieve your location.";
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Yerning radiusi, metrda
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2 - lat1) * Math.PI/180;
    const Δλ = (lon2 - lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // masofa metrda

    return d;
}