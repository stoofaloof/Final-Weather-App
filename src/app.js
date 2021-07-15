// Current Weather x Open Weather API

function currentWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#country-display").innerHTML =
    response.data.sys.country;

  celciusTemp = Math.round(response.data.main.temp);
  document.querySelector("#main-temp").innerHTML = `${celciusTemp}`;

  document.querySelector("#note-display").innerHTML =
    response.data.weather[0].description;

  celciusFeelsLikeTemp = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `${celciusFeelsLikeTemp}°C`;

  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document
    .querySelector("#weather-image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-image")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Set Current Date and Time

let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekday = weekdays[now.getDay()];
let month = months[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");

function currentDate(datestamp) {
  document.querySelector(
    "#date-display"
  ).innerHTML = `${weekday}, ${month} ${day}, ${year}`;
  document.querySelector("#time-display").innerHTML = `${hour}:${minutes}`;
}

currentDate(now);

// Search Engine

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let city = input.value;
  let apiKey = "5c1e7eee50bb2935f340cf0e657b8b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", searchCity);

// Geolocation

function geoWeather(coordinates) {
  let lat = coordinates.coords.latitude;
  let long = coordinates.coords.longitude;
  let apiKey = "5c1e7eee50bb2935f340cf0e657b8b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentWeather);
}

function logCurrent() {
  navigator.geolocation.getCurrentPosition(geoWeather);
}

document
  .querySelector("#geolocation-button")
  .addEventListener("click", logCurrent);

navigator.geolocation.getCurrentPosition(geoWeather);

// Unit Conversion

let celciusTemp = null;
let celciusFeelsLikeTemp = null;

function fconvertTemp(event) {
  event.preventDefault();

  cConvert.classList.remove("active");
  fConvert.classList.add("active");
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  document.querySelector("#main-temp").innerHTML = `${fahrenheitTemp}`;

  let fahrenheitFeelsLikeTemp = Math.round((celciusFeelsLikeTemp * 9) / 5 + 32);
  document.querySelector(
    "#feels-like"
  ).innerHTML = `${fahrenheitFeelsLikeTemp}°F`;
}

function cconvertTemp(event) {
  event.preventDefault();

  cConvert.classList.add("active");
  fConvert.classList.remove("active");
  document.querySelector("#main-temp").innerHTML = `${celciusTemp}`;
  document.querySelector("#feels-like").innerHTML = `${celciusFeelsLikeTemp}°C`;
}

let fConvert = document.querySelector("#f-convert");
fConvert.addEventListener("click", fconvertTemp);

let cConvert = document.querySelector("#c-convert");
cConvert.addEventListener("click", cconvertTemp);

// Forecast Set-Up

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastHTML = `<div class=row>`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <h5 class="forecastDay">${day}</h5>
              <img
                src="http://openweathermap.org/img/wn/02d@2x.png"
                alt=""
                class="forecastWeatherIcon"
              />
              <div class="forecastTemp">
                <span class="maxForecastTemp">40°C</span> /
                <span class="minForecastTemp">30°C</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast-display").innerHTML = forecastHTML;
}

// Forecast API Set-Up

function getForecast(coordinates) {
  let apiKey = "5c1e7eee50bb2935f340cf0e657b8b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
