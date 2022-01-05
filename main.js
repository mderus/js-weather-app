const button = document.getElementById('buttonSubmit');
const buttonGeolocation = document.getElementById('buttonGeolocation');
const inputValue = document.getElementById('inputValue');

window.addEventListener('load', getResultGeo);

button.addEventListener('click', getResult);
buttonGeolocation.addEventListener('click', getResultGeo);

const APIkey = `9b8779499483f4a617bd43e164a1a41f`;

function getResultGeo() {
  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
      fetch(api)
        .then((response) => response.json())
        .then(displayResult)
        .catch((err) => alert('Something goes wrong'));
    });
  }
  inputValue.value = '';
}

function getResult() {
  if (!inputValue.value) {
    alert('Enter a city name!');
  } else {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=${APIkey}`;
    fetch(api)
      .then((response) => response.json())
      .then(displayResult)
      .catch((err) => alert('Something goes wrong'));
  }

  inputValue.value = '';
}

function displayResult(response) {
  console.log(response);
  const name = document.querySelector('.name');
  name.innerText = `${response.name}, ${response.sys.country}`;

  let now = new Date();

  const date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(response.main.temp)} <span>°C</span>`;

  let locationIcon = document.querySelector('.weather-icon');
  const icon = response.weather[0].icon;
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

  const desc = document.querySelector('.desc');
  desc.innerText = response.weather[0].main;

  const high_low = document.querySelector('.high_low');
  high_low.innerHTML = `${Math.round(response.main.temp_min)}°C / ${Math.round(
    response.main.temp_max
  )}°C`;
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
