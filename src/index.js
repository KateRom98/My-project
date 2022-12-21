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

function formatDay(timestamp) {
  let then = new Date(timestamp * 1000);
  let day = then.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <ul>
                  <li class="other-day">${formatDay(dayForecast.dt)}</li>
                  <li class="otherday-temperatures">
                    <span class="otherday-temp-max">${Math.round(
                      dayForecast.temp.max
                    )}°C /</span>
                    <span class="other-day-temp-min">${Math.round(
                      dayForecast.temp.min
                    )}°C</span>
                  </li>
                  <div class="image">
                    <img src="http://openweathermap.org/img/wn/${
                      dayForecast.weather[0].icon
                    }@2x.png" alt="" width="60" id="icon" />
                  </div>
                </ul>
              </div>      
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  celsiusTemp = response.data.main.temp;
  let tempValue = Math.round(response.data.main.temp);
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".today-day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector(".location").innerHTML = response.data.name;
  getForecast(response.data.coord);
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

function showCelsius(event) {
  event.preventDefault();
  let celsiusChange = document.querySelector(".tempActual");
  farenheit.classList.remove("active");
  celsius.classList.add("active");
  celsiusChange.innerHTML = Math.round(celsiusTemp);
}

function showFarenheit(event) {
  event.preventDefault();
  let farenheitChange = Math.round((celsiusTemp * 9) / 5 + 32);
  let farenheitTemp = document.querySelector(".tempActual");
  celsius.classList.remove("active");
  farenheit.classList.add("active");
  farenheitTemp.innerHTML = farenheitChange;
}

let celsius = document.querySelector(".linkCelsius");
celsius.addEventListener("click", showCelsius);
let farenheit = document.querySelector(".linkFarenheit");
farenheit.addEventListener("click", showFarenheit);

let celsiusTemp = null;

search("London");
