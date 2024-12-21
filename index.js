const checkButton = document.getElementById("checkButton");
const messageElement = document.getElementById("message");

const latitudeBerlin = 52.5200;
const longitudeBerlin = 13.4050;

// Function to calculate Haversine distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function checkISS() {
    try {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        const issData = await response.json();
        const distance = calculateDistance(latitudeBerlin, longitudeBerlin, issData.latitude, issData.longitude);

        let message;
        if (distance < 100) {
            message = "The ISS is the closest it can be to Berlin!";
        } else if (distance < 500) {
            message = `The ISS is close to Berlin, approximately ${distance.toFixed(1)} km away.`;
        } else {
            message = `The ISS is far from Berlin, approximately ${distance.toFixed(1)} km away.`;
        }

        messageElement.textContent = message;
    } catch (error) {
        console.error("Failed to fetch ISS data:", error.message);
        messageElement.textContent = "Failed to retrieve ISS position.";
    }
}

checkButton.addEventListener("click", checkISS);
