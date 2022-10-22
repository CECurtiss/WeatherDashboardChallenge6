var searchBtn = $('#searchbtn');
var userInput = $('#userinput').val;
var fiveDayForecast = $('.fiveday');
var searchHist = $('.searchhistory');

var submitUserEntry = function (userInput) {

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
        console.log(coords);
        storeCoords(userInput, coords);
        }) 
        .catch(function() {
            alert("Unable to connect to Server");
        });
}
function getApi () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=1878dc2f6221aa2b08efb2c0a1e2da79"

    fetch(requestUrl)
        .then(function (response) {
        console.log(response)
        return response.json();
})
}

$(searchBtn).click(sumbitUserEntry);