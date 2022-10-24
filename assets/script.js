var searchBtn = document.querySelector('#searchbtn');
var fiveDayForecast = document.querySelector('.fiveday');
var searchHist = document.querySelector('.searchhistory');
var currentCityDate = document.querySelector('#currentcityanddate');
var currentTemp = document.querySelector('#currenttemp');
var currentWind = document.querySelector('#currentwind');
var currentHumidity = document.querySelector('#currenthumidity');

var submitUserEntry = function () {
    userInput = document.querySelector('#userinput').value;
    var geocodeTranslator = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&appid=1878dc2f6221aa2b08efb2c0a1e2da79";

    fetch(geocodeTranslator)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            } else {
                alert('Oops!' + response.statusText);
            }
        })
        .then(function (coords) {
        var lat = coords[0].lat;
        var lon = coords[0].lon;
        console.log(lat,lon)
        getWeather(lat,lon);
        }) 
        .catch(function() {
            alert("Unable to connect to Server");
        });
}


function getWeather (lat, lon) {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1878dc2f6221aa2b08efb2c0a1e2da79"
    fetch(requestUrl)
        .then(function (response) {
        console.log(response)
        return response.json();
        
})      .then(function(data){
        console.log(data);
        var weatherDays = []
        weatherDays.push(data.list[0])
        weatherDays.push(data.list[7])
        weatherDays.push(data.list[15])
        weatherDays.push(data.list[23])
        weatherDays.push(data.list[31])
        weatherDays.push(data.list[39])
        // for (var i=7; i <=38; i+=7){
        //     weatherDays.push(data.list[i])
        // }
        // weatherDays.push(data.list[-1]);
        console.log(weatherDays)
        
});

}

searchBtn.addEventListener("click", submitUserEntry);