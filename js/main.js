'use strict'; 

var weatherConditions = new XMLHttpRequest(); // create new xht request for conditions
var weatherForecast = new XMLHttpRequest(); // create new xht request for FORECARST
var cObj; //create object for conditions
var fObj; //create object for FORECARST

function loadWeather() {
var zip = document.getElementById('zip').value;
if (zip === '') { zip = "33155"}

var conditionsPath = "http://api.wunderground.com/api/f29e10f464d1aa14/conditions/q/"+zip+".json";
var forecastPath = "http://api.wunderground.com/api/f29e10f464d1aa14/forecast/q/"+zip+".json";
  // GET THE CONDITIONS . AJAX request
  weatherConditions.open('GET', conditionsPath, true);
  weatherConditions.responseType = 'text';
  weatherConditions.send(null);

  // GET THE FORECARST.  AJAX request to get the current forecast
  weatherForecast.open('GET', forecastPath, true);
  weatherForecast.responseType = 'text';
  weatherForecast.send();
}



weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText);
        console.log(cObj);
        document.getElementById('location').innerhtml = cObj.current_observation.display_location.full;
        document.getElementById('weather').innerhtml = cObj.current_observation.weather;
        document.getElementById('temperature').innerhtml = cObj.current_observation.temp_f;

    } //end if
}; //end function












weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);
  document.getElementById('desc').innerhtml = fObj.forecast.txt_forecast.forecastday["0"].fcttext;
  //Day 1
  document.getElementById('r1c1').innerhtml = fObj.forecast.simpleforecast.forecastday[1].date.weekday;
  document.getElementById('r1c3').innerhtml = fObj.forecast.simpleforecast.forecastday[1].high.fahrenheit+'°';
  document.getElementById('r1c4').innerhtml = fObj.forecast.simpleforecast.forecastday[1].low.fahrenheit+'°';
  var imagePath = fObj.forecast.simpleforecast.forecastday[1].icon_url;
  document.getElementById('r1c2').src = imagePath;

  // Day 2
  document.getElementById('r2c1').innerhtml = fObj.forecast.simpleforecast.forecastday[2].date.weekday;
  document.getElementById('r2c3').innerhtml = fObj.forecast.simpleforecast.forecastday[2].high.fahrenheit+'°';
  document.getElementById('r2c4').innerhtml = fObj.forecast.simpleforecast.forecastday[2].low.fahrenheit+'°';
  var imagePath = fObj.forecast.simpleforecast.forecastday[2].icon_url;
  document.getElementById('r2c2').src = imagePath;

  // Day 3
  document.getElementById('r3c1').innerhtml = fObj.forecast.simpleforecast.forecastday[3].date.weekday;
  document.getElementById('r3c3').innerhtml = fObj.forecast.simpleforecast.forecastday[3].high.fahrenheit+'°';
  document.getElementById('r3c4').innerhtml = fObj.forecast.simpleforecast.forecastday[3].low.fahrenheit+'°';
  var imagePath = fObj.forecast.simpleforecast.forecastday[3].icon_url;
  document.getElementById('r3c2').src = imagePath;



} //end if
}; //end function

loadWeather();
