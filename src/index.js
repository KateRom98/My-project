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

function plusFunction(temperature) {
  let tempForecast = document.querySelectorAll(
    ".otherday-temp-max, .other-day-temp-min"
  );
  if (temperature > 0) {
    tempForecast.innerText = `+${temperature}`;
  } else {
    tempForecast.innerText = `${temperature}`;
  }
  return tempForecast.innerText;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <ul>
                  <li class="other-day">${formatDay(dayForecast.dt)}</li>
                  <li class="otherday-temperatures">
                    <span class="otherday-temp-max">${plusFunction(
                      Math.round(dayForecast.temp.max)
                    )}°C /</span>
                    <span class="other-day-temp-min">${plusFunction(
                      Math.round(dayForecast.temp.min)
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
  if (tempValue > 0) {
    document.querySelector(".tempActual").innerHTML = `+ ${tempValue}`;
  }
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

let celsiusTemp = null;

search("London");
