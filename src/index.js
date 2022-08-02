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
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  // let dayTemp = document.querySelector(".dayTemperature");
  // dayTemp.innerHTML = `Max ${Math.round(
  //   response.data.main.temp_max
  // )}º / Min ${Math.round(response.data.main.temp_min)}º`;
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

// вызов фарингейт и обратно в цельсий
function showFahrenheit(event) {
  event.preventDefault()
  let currentTemp = document.querySelector(".temperatureNow");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTemp.innerHTML = fahrenheitTemp;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit)

function showCelsius(event) {
  event.preventDefault()
  let currentTemp = document.querySelector(".temperatureNow");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showCelsius)

showCity("Kharkiv");