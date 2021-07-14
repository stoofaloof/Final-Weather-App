// Current Weather x Open Weather API

function currentWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#country-display").innerHTML =
    response.data.sys.country;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#note-display").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
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
