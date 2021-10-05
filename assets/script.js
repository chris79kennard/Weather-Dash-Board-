var my_api = " fce654b68af74729b25";
var city_name = "austin";

var five_day_api;
var one_call_api;
var latitude;
var longitude;
var part = "minutely, hourly";

function getCoordinates() {
  five_day_api = `api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid={my_api}`;

  fetch(five_day_api).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.city.coord);
        console.log(data.city.coord.lon);

        latitude = data.city.coord.lat;
        longitude = data.city.coord.lon;

        getOneDayWeather(latitude, longitude){
          
        }
      });
    }
  });
}

getCoordinates();

function getOneDayWeather(latitude, longitude) {
  one_call_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${my_api}`;


fetch(one_call_api)

.then(function(response) {
  if (response.ok){

    response.json().then(function(data) {
      console.log(data);
    
    })
  }
})
}
  
