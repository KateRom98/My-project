function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minute}`;
}

function displayTemp(response) {
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector(".tempActual").innerHTML = Math.round(
    response.data.main.temp
  );
  let tempValue = Math.round(response.data.main.temp);
  if (tempValue > 0) {
    document.querySelector(".tempActual").innerHTML = `+${tempValue}`;
  }
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".today-day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector(".location").innerHTML = `🚩 ${response.data.name}`;
}

function search(city) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function enterCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".search");
  search(cityInputElement.value);
}

document.querySelector("form").addEventListener("submit", enterCity);

search("London");

function showCelsius(event) {
  event.preventDefault();
  let celsiusChange = document.querySelector(".tempActual");
  celsiusChange.innerHTML = "";
}

function showFarenheit(event) {
  event.preventDefault();
  let farenheitChange = document.querySelector(".tempActual");
  farenheitChange.innerHTML = "";
}

let celsius = document.querySelector(".linkCelsius");
celsius.addEventListener("click", showCelsius);
let farenheit = document.querySelector(".linkFarenheit");
farenheit.addEventListener("click", showFarenheit);

function showActual(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlTemp).then(showTemp);
}

function showTemp(response) {
  document.querySelector(".location").innerHTML = `🚩 ${response.data.name}`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  let actualInfo = Math.round(response.data.main.temp);
  let tempActual = document.querySelector(".tempActual");
  tempActual.innerHTML = `${actualInfo}`;
  if (actualInfo > 0) {
    tempActual.innerHTML = `+ ${actualInfo}`;
  }
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".today-day").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

document.querySelector("button").addEventListener("click", showActual);
