// Time & Date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Meteo

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-input").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description-input").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity-input").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed-input").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "43788658daf451e7755faea7a9aeb739";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiCity).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "43788658daf451e7755faea7a9aeb739";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", search);

let buttonCurrent = document.querySelector("#current-input");
buttonCurrent.addEventListener("click", getCurrentLocation);
