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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#feels-like"
  ).innerHTML = `<em>Feels like</em> <strong>${Math.round(
    response.data.main.feels_like
  )}°</strong>`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 72;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 22;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");
