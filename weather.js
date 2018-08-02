// pulling from darksky.net api
// getting the following info: time zone, currently, 
// summary, temperature, windSpeed, uvIndex

//  how to pull from darksky api
//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
function makeRequestForWeather( capitalCities ) {
    var currentCityLat = capitalCities.latitude;
    var currentCityLon = capitalCities.longitude;
    var formattedLatLon = `${currentCityLat},${currentCityLon}`;
    var darkSkyApi = {
        url: `https://api.darksky.net/forecast/a7794c8b625563c07d784f703310aef9/${formattedLatLon}`,
        method: 'GET',
        dataType: 'jsonp',
        success: darkSkyApiCallData,
        failure: darkSkyApiError,
    };
    $.ajax(darkSkyApi);
}  // function that makes an ajax call using the variable darkSkyApi to obtain API information from darksky 
//  but it will use the latitude and longitude from the capitalCities array to pull the correct infomation
// dataType changed jsonp because it was giving an error and Cody helped fix it!

function darkSkyApiCallData ( getResponse ){
    const citySummary = getResponse.currently.summary;
    const citySummaryIcon = getResponse.currently.icon;
    const cityTemp = getResponse.currently.temperature;
    const cityWind = getResponse.currently.windSpeed;
    const cityUV = getResponse.currently.uvIndex;
    const citySentence = `Currently the city is experiencing: ${citySummaryIcon}.  
        The current temperature is ${cityTemp} degrees fahrenheit.  
        The wind speed is ${cityWind}.  
        And the the city UV Index is ${cityUV}.`;
    const cityTimeZone = getResponse.timezone;
    const hintSentence = `The timezone in which the city is located ${cityTimeZone}`;
    insertWeatherInfo(citySentence, hintSentence);
}  // function to pull this specific data from the darkSkyApi get request

function darkSkyApiError () {
    console.log(`something went wrong`);
}  // error function to console log if something does not work right during the request
// 