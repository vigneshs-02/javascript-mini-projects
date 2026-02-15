const inputCity = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherSection = document.querySelector(".weather-data");
const searchMessage = document.querySelector(".search-city");
const notFoundMessage = document.querySelector(".not-found");

const cityNameEl = document.querySelector(".place");
const dateEl = document.querySelector(".date");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const humidityEl = document.querySelector(".info-row .info-item:nth-child(1) strong");
const windEl = document.querySelector(".info-row .info-item:nth-child(2) strong");

const API_KEY = "56969b664e5effa2309fbd23e83bdf83";

searchBtn.addEventListener("click", () => {
    const city = inputCity.value.trim();
    if (!city) return;
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (res.status === 404) {
            showNotFound();
            return;
        }

        const data = await res.json();
        updateUI(data);

    } catch (err) {
        console.error(err);
        showNotFound();
    }
}

function updateUI(data) {
    searchMessage.style.display = "none";
    notFoundMessage.style.display = "none";
    weatherSection.style.display = "block";

    cityNameEl.innerHTML =
        `<span class="material-symbols-outlined">place</span>${data.name}`;

    dateEl.textContent = new Date().toDateString();

    tempEl.innerHTML =
        `${Math.round(data.main.temp)} <span class="unit">°C</span>`;

    descEl.textContent = data.weather[0].main;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;

    const icon = document.getElementById("weatherIcon");

const condition = data.weather[0].main.toLowerCase();

if (condition.includes("cloud")) {
    icon.src = "icons/clouds.png";
} else if (condition.includes("rain")) {
    icon.src = "icons/rain.png";
} else if (condition.includes("clear")) {
    icon.src = "icons/clear.png";
} else if (condition.includes("smoke") || condition.includes("haze")) {
    icon.src = "icons/haze.png";
} else {
    icon.src = "icons/default.png";
}

}

function showNotFound() {
    weatherSection.style.display = "none";
    searchMessage.style.display = "none";
    notFoundMessage.style.display = "flex";
}
