var my_api = "fce654b68af74729b25c434332e9b7ad";
var city_name = "austin";

var five_day_api;
var one_call_api;
var latitude;
var longitude;
var part = "minutely,hourly";
var mainDiv = document.getElementById("main");

function getCoordinates() {
  five_day_api = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${my_api}`;

  fetch(five_day_api).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.city.coord);
        console.log(data.city.coord.lon);

        latitude = data.city.coord.lat;
        longitude = data.city.coord.lon;

        getOneDayWeather(latitude, longitude);
      });
    }
  });
}

getCoordinates();

function getOneDayWeather(latitude, longitude) {
  one_call_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${my_api}`;

  fetch(one_call_api).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        // get humidity
        console.log(data.current.humidity);
        var currentHumidity = data.current.humidity;

        // GET TEMP!
        console.log(data.current.temp);
        var currentTemp = Math.round(
          (data.current.temp - 273.15) * (9 / 5) + 32
        );
        console.log(data.current.uvi);

        var currentUVI = data.current.uvi;
        //  get date and time
        console.log(data.current.dt);
        var currentDateTime = new Date(data.current.dt * 1000);
        currentDateTime = currentDateTime.toLocaleDateString("en-US");

        // get wind direction and speed
        console.log(data.current.wind_deg);
        console.log(data.current.wind_speed);
        var currentWindDir = data.current.wind_deg;
        var currentWindSpeed = Math.round(data.current.wind_speed);
        console.log(data.current.weather[0].main);
        var currentStatus = data.current.weather[0].main;
        var currentIcon = data.current.weather[0].icon;
        var currentIcon = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;

        var currentWeatherResults = document.createElement("div");
        currentWeatherResults.innerHTML = `<div class="card border-success mb-3 row">
      <div class="card-header bg-transparent border-success">Header</div>
      <div class="card-body text-success">
        <h5 class="card-title">${city_name}</h5>
        <p class="card-text">${currentStatus}</p>
        <p class="card-text">${currentTemp}F</p>
        <p class="card-text">${currentUVI}</p>
        <p class="card-text">${currentHumidity}%</p>
        <p class="card-text">${currentWindSpeed}mph</p>
        <p class="card-text">${currentWindDir}</p>
        
        </div>
      </div>`;

        mainDiv.appendChild(currentWeatherResults);

        console.log(data.daily);

        for (var i = 1; i <= 5; i++) {
          console.log(data.daily[i]);
          // get humidity
          console.log(data.daily[i].humidity);
          var dailyHumidity = data.daily[i].humidity;
          // get day time temp
          console.log(data.daily[i].temp.day);
          var dailyTemp = Math.round(data.daily[i].temp.day);

          console.log(data.daily[i].uvi);
          var UVI = data.daily[i].UVI;
          // get date time
          console.log(data.daily[i].dt);
          var dailyDateTime = new Date(data.daily[i].dt * 1000);
          dailyDateTime = dailyDateTime.toLocaleDateString("en-US");

          //daily weather status
          console.log(data.daily[i].weather[0].main);
          var dailyStatus = data.daily[i].weather[0].main;
          // get the icon
          console.log(data.daily[i].weather[0].icon);
          var dailyIcon = data.daily[i].weather.icon;
          var currentIconURL = `http://openweathermap.org/img/wn/${currentIconURL}@2x.png`;

          var dailyUVI = data.daily[i].uvi;
          var dailyWindSpeed = Math.round(data.daily[i].wind_speed);
          var dailyWindDir = data.daily[i].wind_deg;

          var dailyWeatherResults = document.createElement("div");
          dailyWeatherResults.innerHTML = `<div class="card border-success mb-3 row">
      <div class="card-header bg-transparent border-success">${dailyDateTime}</div>
      <div class="card-body text-success">
        <h5 class="card-title">${city_name}</h5>
        <p class="card-text">${dailyStatus}</p>
        <p class="card-text">${dailyTemp}</p>
        <p class="card-text">${dailyUVI}</p>
        <p class="card-text">${dailyHumidity}</p>
        <p class="card-text">${dailyWindSpeed}</p>
        <p class="card-text">${dailyWindDir}</p>
        
        </div>
      </div>`;

          mainDiv.appendChild(dailyWeatherResults);
        }
      });
    }
  });
}
