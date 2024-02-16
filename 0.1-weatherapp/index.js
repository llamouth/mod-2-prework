const apiKey = "10b0277f2314acb6d692950648aaef8d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const toggleButton = document.getElementById('toggleButton');

let isFahrenheit = true; 

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Function to update temperature display
function updateTemperature(temperature, unit) {
    document.querySelector(".temp").innerHTML = `${temperature}°${unit}`;
}

// Event listener for the toggle button
toggleButton.addEventListener('click', function () {
    const currentTemperature = parseFloat(document.querySelector(".temp").innerHTML);

    if (isFahrenheit) {
        // Switch to Celsius
        const temperatureInCelsius = fahrenheitToCelsius(currentTemperature);
        updateTemperature(Math.round(temperatureInCelsius), 'C');
    } else {
        // Switch to Fahrenheit
        const temperatureInFahrenheit = celsiusToFahrenheit(currentTemperature);
        updateTemperature(Math.round(temperatureInFahrenheit), 'F');
    }

    isFahrenheit = !isFahrenheit;
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        const temperatureUnit = isFahrenheit ? 'F' : 'C';
        const temperature = isFahrenheit ? celsiusToFahrenheit(data.main.temp) : data.main.temp;
        updateTemperature(Math.round(temperature), temperatureUnit);
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 1.609344) + "mph";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/Clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/Clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/Rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/Mist.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/Drizzle.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


// ! IMPLEMENT NIGHT AND DAY DIFFERENTIAL 