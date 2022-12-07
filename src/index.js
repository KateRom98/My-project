let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todayDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
} else {
  currentMinute = currentMinute;
}

let currentTime = `📆 ${todayDay} ${currentHour}:${currentMinute}`;
let today = document.querySelector(".today-day");
today.innerHTML = currentTime;

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search");
  document.querySelector(".location").innerHTML = `🌐 ${city.value}`;
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  document.querySelector(".tempActual").innerHTML = Math.round(
    response.data.main.temp
  );
  let tempValue = Math.round(response.data.main.temp);
  if (tempValue > 0) {
    document.querySelector(".tempActual").innerHTML = `+${tempValue}`;
  }
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
}

let search = document.querySelector("form");
search.addEventListener("submit", enterCity);

function displayTempLondon(response) {
  document.querySelector(".tempActual").innerHTML = Math.round(
    response.data.main.temp
  );
  let tempValue = Math.round(response.data.main.temp);
  if (tempValue > 0) {
    document.querySelector(".tempActual").innerHTML = `+${tempValue}`;
  }
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
}
document.querySelector(".location").innerHTML = `🌐 London`;
let apiKeyStandard = "203fa770242fcd2b9555d832a88ea567";
let apiUrlStandard = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKeyStandard}&units=metric`;
axios.get(apiUrlStandard).then(displayTempLondon);

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
  function showPosition(position) {
    function showGeo(response) {
      document.querySelector(
        ".location"
      ).innerHTML = `🌐 ${response.data[0].name}`;
    }
    function showTemp(response) {
      let actualInfo = Math.round(response.data.main.temp);
      let tempActual = document.querySelector(".tempActual");
      tempActual.innerHTML = `${actualInfo}`;
      if (actualInfo > 0) {
        tempActual.innerHTML = `+ ${actualInfo}`;
      }
      document.querySelector(".humidity").innerHTML =
        response.data.main.humidity;
      document.querySelector(".wind").innerHTML = response.data.wind.speed;
    }

    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiKey = "203fa770242fcd2b9555d832a88ea567";
    let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlTemp).then(showTemp);
    let apiUrlGeo = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios.get(apiUrlGeo).then(showGeo);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentInfo = document.querySelector("button");
currentInfo.addEventListener("click", showActual);
