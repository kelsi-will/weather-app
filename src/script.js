function formatDate(timestamp) {
  let date = new Date(timestamp);

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

  return `${day} ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
}

function searchCity(city) {
  let apiKey = "4cdad8285585d2a190d4b58d406c5691";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "4cdad8285585d2a190d4b58d406c5691";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = fahrenheitTemperature;
  fahrenheitFeelsLike = Math.round(response.data.main.feels_like);

  document.querySelector(
    "#feels-like"
  ).innerHTML = `<em>Feels like</em> <strong>${fahrenheitFeelsLike}°</strong>`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  milesPerHour = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${milesPerHour} mph`;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperatureElement.innerHTML = celsiusTemperature;
  let feelsLikeElement = document.querySelector("#feels-like");
  let celsiusFeelsLike = Math.round(((fahrenheitFeelsLike - 32) * 5) / 9);
  feelsLikeElement.innerHTML = `<em>Feels like</em> <strong>${celsiusFeelsLike}°</strong>`;
  let windSpeedElement = document.querySelector("#wind");
  let kilometersPerHour = Math.round(milesPerHour * 1.609);
  windSpeedElement.innerHTML = `Wind: ${kilometersPerHour} km/h`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `<em>Feels like</em> <strong>${Math.round(
    fahrenheitFeelsLike
  )}°</strong>`;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `Wind: ${milesPerHour} mph`;
}

let fahrenheitTemperature = null;
let fahrenheitFeelsLike = null;
let milesPerHour = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("New York");
