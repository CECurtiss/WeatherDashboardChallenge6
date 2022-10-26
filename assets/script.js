var searchBtn = document.querySelector('#searchbtn');
var fiveDayForecast = document.querySelector('#fiveday');
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
        getForecast(lat,lon);
        getWeather(lat,lon);
        }) 
        .catch(function() {
            alert("Unable to connect to Server");
        });
        document.getElementById('currentcityanddate').innerHTML = userInput;
}


function getForecast (lat, lon) {
    var requestForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1878dc2f6221aa2b08efb2c0a1e2da79"
    fetch(requestForecastUrl)
        .then(function (response) {
        console.log(response)
        return response.json();
        
})      .then(function(data){
        console.log(data);
        var weatherDays = []
        weatherDays.push(data.list[3])
        weatherDays.push(data.list[11])
        weatherDays.push(data.list[19])
        weatherDays.push(data.list[27])
        weatherDays.push(data.list[35])
        console.log(weatherDays)

        weatherCards(weatherDays);
        
        function weatherCards () {
             for (i=0; i<weatherDays.length; i++){
                              
                var displayCard=`
                <div class="p-2 m-2 bg-primary rounded" id="day-${i}">
                    <h5 class=city-date-icon">${new Date (weatherDays[i].dt_txt).toLocaleDateString("en-US")}</h2>
                    <div class="temp">temp: ${Math.floor(weatherDays[i].main.temp_max)} F</div>
                    <div class="humidity">humidity: ${weatherDays[i].main.humidity} %</div>
                    <div class="wind"> wind: ${weatherDays[i].wind.speed} MPH</div>
                </div>`;
                fiveDayForecast.innerHTML += displayCard;
            }
         }
        }
    );
    
}

function getWeather (lat, lon) {
    var requestCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1878dc2f6221aa2b08efb2c0a1e2da79"
    fetch(requestCurrentUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        currentTemp.textContent = data.main.temp + " F";
        currentWind.textContent=  data.wind.speed + " mph";
        currentHumidity.textContent =  data.main.humidity + "%";
    })
}

searchBtn.addEventListener("click", submitUserEntry);




// for (var i=7; i <=38; i+=7){
//     weatherDays.push(data.list[i])
// }
// weatherDays.push(data.list[-1]);