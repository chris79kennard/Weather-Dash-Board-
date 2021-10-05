var my_api = "fce654b68af74729b25c434332e9b7ad";
var city_name = "austin";

var five_day_api;
var one_call_api;
var latitude;
var longitude;
var part = "minutely,hourly";

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
        var currentTemp = (data.temp - 273.15) * (9 / 5) + 32;
        // CONVERT K TO F
        var temperature = (data.temp - 273.15) * (9 / 5) + 32;
        //  get date and time
        console.log(data.current.dt);
        var currentDateTime = data.current.dt;
        // get wind direction and speed
        console.log(data.current.wind_deg);
        console.log(data.current.wind_speed);
        var currentWindDir = data.current.wind_deg;
        var currentWindSpeed = data.current.wind_speed;
        console.log(data.current.weather[0].main);
        var currentStatus = data.current.weather[0].main;

        console.log(data.daily);

        for (var i = 1; i <= 5; i++) {
          console.log(data.daily[i]);
          // get humidity
          console.log(data.daily[i].humidity);
          var dailyHumidity = data.daily[i].humidity;
          // get day time temp
          console.log(data.daily[i].temp.day);
          var dailyTemp = data.daily[i].temp.day;
          // get date time
          console.log(data.daily[i].dt);
          var dailyDateTime = data.daily[i].weather[0].main;
          //daily weather status
          console.log(data.daily[i].weather[0].main);
          var dailyStatus = data.daily[i].weather[0].main;
          // get the icon
          console.log(data.daily[i].weather[0].icon);
          var dailyIcon = data.daily[i].weather.icon;

          var dailyWindSpeed = data.daily[i].wind_speed;
          var dailyWindDir = data.daily[i].wind_deg;
        }
      });
    }
  });
}
