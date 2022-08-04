// день и дата
let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let toDay = days[currentDate.getDay()];
let currentDay = document.querySelector(".day");
currentDay.innerHTML = toDay;

let time = currentDate.toLocaleTimeString();
let currentTime = document.querySelector(".time");
currentTime.innerHTML = time;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
} 

function showForecast(response) {
  let forecast = response.data.daily;
  let currentForecast = document.querySelector(".forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
    forecastHTML = forecastHTML + 
    `
    <div class="col">
        <p class="nextDay">${formatDay(forecastDay.dt)}</p>
        <img
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        class="emojiNextDay"
      />
        <p class="tempNextDay">${Math.round(forecastDay.temp.max)}º / ${Math.round(forecastDay.temp.min)}º</p>
    </div>
    `
  }
  if (index < 1) {
    let dayTemp = document.querySelector(".dayTemperature");
    dayTemp.innerHTML = `Day ${Math.round(forecastDay.temp.max)}º / Night ${Math.round(forecastDay.temp.min)}º`;
    let rain = document.querySelector(".rain");
    rain.innerHTML = `Rain: ${Math.round((forecastDay.rain) * 10)}%`
    if (forecastDay.rain === undefined) {
      rain.innerHTML = `Rain: 0%`
    }
  }
})
  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "98dc9516d2cb8fe245b1b135cfa17cfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showForecast);
}

// точные данные о погоде
function showWeather(response) {
  console.log(response);
  let searchCity = document.querySelector(".yourCity");
  searchCity.innerHTML = response.data.name;
  let currentTemp = document.querySelector(".temperatureNow");
  celsiusTemp = response.data.main.temp;
  currentTemp.innerHTML = Math.round(celsiusTemp);
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  let currentSky = document.querySelector(".typeSky");
  currentSky.innerHTML = response.data.weather[0].description;
  let currentIcon = document.querySelector(".icon");
  currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  
  getForecast(response.data.coord)
}
// вызов данных о погоде
function showCity(city) {
  let apiKey = "98dc9516d2cb8fe245b1b135cfa17cfe";
  let weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(weather).then(showWeather);
}
// вызов города
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  showCity(city);
}

let celsiusTemp = null;
let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("submit", getCity);

showCity("Kharkiv");
