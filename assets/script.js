var searchBtn = document.querySelector('#searchbtn');
var userInput = document.querySelector('#userinput').value;
var fiveDayForecast = document.querySelector('.fiveday');
var searchHist = document.querySelector('.searchhistory');

var submitUserEntry = function (userInput) {
console.log(userInput);
    var geocodeTranslator = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + ",840&limit=5&appid=1878dc2f6221aa2b08efb2c0a1e2da79";

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
        console.log(coords);
        storeCoords(coords);
        }) 
        .catch(function() {
            alert("Unable to connect to Server");
        });
}

function storeCoords() {
    // storing coords in variable to pass to request.url
    
}

function getApi () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1878dc2f6221aa2b08efb2c0a1e2da79"

    fetch(requestUrl)
        .then(function (response) {
        console.log(response)
        return response.json();
})
}

searchBtn.addEventListener("click", submitUserEntry);