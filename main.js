
$(document).ready(loadDocument);
var winningCity;

function loadDocument(){
    var airplaneSound = new Audio('audio/airplane.mp3');
    airplaneSound.play();
};

function insertWeatherInfo(cityInfo, hintInfo) {
    $(".weather-text").addClass("weather-text-bg");
    $(".weather-text").text(cityInfo);
}

function insertPicFromFlickr(photoArray){
    for (let index = 0; index < photoArray.length; index ++){
        let tempName = `url("${photoArray[index]}")`;
        let tempDiv = $("<div>").css("background", tempName);
        tempDiv.css("background-repeat", "no-repeat");
        tempDiv.css("background-size", "contain");
        tempDiv.addClass("pic-bg");
        //let tempDiv = $('<img>').attr('src',photoArray[index]).addClass('image-size');
        let tempDivName = '.pic-bg' + index;
        $(tempDivName).append(tempDiv);
    }
}

// input: lon, lat, searchText;
// output: array of 4 pictures;
function getFlickr(lon='-117.731803',lat='33.635682',searchText = 'dog',forMap=true){
    let photoArray = [];
    let rawFlickrData;
    const apiKey = 'aafae43be950e495d55bfe4055fde6e4';
    //const searchText = 'dog'; //search for this keyword from flickr
    const perPage = '4'; //number of pictures to get from flickr
    // unix timestamp of 1420070400 is 01/01/2015
    const flickrURL = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${searchText}&min_upload_date=1420070400&safe_search=1&sort=interestingness-asc&media=photos&lat=${lat}&lon=${lon}&radius=20&per_page=${perPage}`
    let ajaxConfig = {
        dataType: 'json',
        url: flickrURL,
        success: function(result) {
            rawFlickrData = result.photos.photo;
            for (let index = 0; index < rawFlickrData.length; index++){
                const farmId = rawFlickrData[index].farm;
                const serverId = rawFlickrData[index].server;
                const flickrId = rawFlickrData[index].id;
                const flickrSecret = rawFlickrData[index].secret;
                const picURL = `https:\/\/farm${farmId}.staticflickr.com\/${serverId}\/${flickrId}_${flickrSecret}.jpg`;
                //this is the format of the flickr picture
                //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
                if (forMap){photoArray.push(picURL);}
                    else {
                        let tempName = `url("${picURL}")`;
                        let divName = `#nomNomPics${index}`;
                        $(divName).css("background-image", tempName); //don't use only 'background'
                }
            }
            if (forMap){insertPicFromFlickr(photoArray);}
        }
    }
    $.ajax(ajaxConfig);
    //returns an array of photo urls
}

function initMap() {
    //map options
    var options = {
        zoom: 2.3,
        //center: {lat: 40.416775, lng: -3.703790},
        center: {lat: 16, lng: 8},
        mapTypeId: 'hybrid'
    }
    //creating a new map
    var gmap = new google.maps.Map(document.getElementById('theMap'), options)
    var cities = sliceAndSplicedCities(capitalCities, 3);
    let mapLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let capitalIndex = 0; capitalIndex < cities.length; capitalIndex++) {
            var marker = new google.maps.Marker({
                position: {lat: cities[capitalIndex].latitude, lng: cities[capitalIndex].longitude},
                map: gmap,
                label: mapLabels[capitalIndex],
                // icon: capitalCityObject.iconImg,
                content: `<h3>${cities[capitalIndex].city}, ${cities[capitalIndex].country}</h3>`,
            });
            google.maps.event.addListener(marker, 'click', (function (marker, capitalIndex) {
                return function () {
                    var nameOnFlagClick = new google.maps.InfoWindow({
                        content: `<h3>${cities[capitalIndex].city}, ${cities[capitalIndex].country}</h3>`
                    });
                    nameOnFlagClick.open(gmap, marker);
                }
            })(marker, capitalIndex));
        }
        winningCity = cities[Math.floor(Math.random() * cities.length)];
        console.log(winningCity);
        getFlickr(winningCity.longitude,winningCity.latitude,'city');
        getFlickr(winningCity.longitude,winningCity.latitude,'food',false);
        makeRequestForWeather(winningCity);
        makeRequestForWikipedia(winningCity);
        let winShortMsg = `This is ${winningCity.city}, ${winningCity.country}.`;
        $('#winShortMsg').text(winShortMsg);
        $('#myModal').on('click',function(){location.reload()});
        $(".button-text").on("click", handleButtonClick);
}

function sliceAndSplicedCities(capitalArray, splicedCount){
    var threeCitiesArray = [];
    let mapLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var copiedArray = capitalArray.slice(0);
    for (var cityIndex = 0; cityIndex < splicedCount; cityIndex++) {
        var randomNum = Math.floor(Math.random() * copiedArray.length);
        threeCitiesArray.push(copiedArray[randomNum]);
        let specificClickButton = ".button" + cityIndex;
        let displayText = mapLabels[cityIndex] + ') ' + copiedArray[randomNum].city + ', ' + copiedArray[randomNum].country;
        $(specificClickButton).text(displayText);
        copiedArray.splice(randomNum, 1);
    }
    return threeCitiesArray;
}

function handleButtonClick() {
    let answerTextArray = ["Nope", "Try again", "You don't know much do you?", "Either you don't know or the photographer don't know what he doing",
    "Take another stab at it", "Bruh...", "Nah but I want to go there", "I wish", "Did you fail 8th grade geography?",
    "You're not even trying are you?", "Guess what.....you're wrong",
    "No sir", "No mam", "Beautiful photos. Oh btw you're wrong", "Geographically challenged indeed"];
    let randomArrayIndex = Math.floor(Math.random() * answerTextArray.length);
    let answerText = answerTextArray[randomArrayIndex];
    let buttonTextVariable = $(this).text();
    let textSliceString = buttonTextVariable.slice(3);
    if (textSliceString === `${winningCity.city}, ${winningCity.country}`) {
        $(".button-text").removeClass("btn-warning");
        $(".button-text").addClass("btn");
        $(this).addClass("btn-success");
        $(".button-text").off("click");
        $(".description-text").text("Well Done!");
        $('#myModal').modal('show');
    }  else {
        $(this).removeClass("btn-warning");
        $(this).addClass("btn");
        $(this).off("click");
        $(".description-text").text(answerText);
    }
}

