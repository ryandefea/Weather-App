import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#city').val();
    const state = $('#state').val();
    const lon = $('#longitude').val();
    const lat = $('#latitude').val();
    $('#city').val("");
    $('#state').val("");
    $('#latitude').val("");
    $('#longitude').val("");
    
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}lon= ${lon}&appid=${process.env.API_KEY}`;
    
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city},${state} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${(Math.round(((response.main.temp)-273.15)*1.8)+32)} degrees.`);
      $('.showSpeed').text(`The wind speed is ${response.wind.speed} mph.`)
      $('.showSky').text(`with ${response.weather[0].description}`)
    }
  });
});


