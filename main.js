

$(document).ready(loadDocument);
var winningCity;
function loadDocument(){


};


function insertWeatherInfo(cityInfo, hintInfo) {
    $(".weather-text").addClass("weather-text-bg");
    $(".weather-text").text(cityInfo + hintInfo);
}


function insertPicFromFlickr(photoArray){
    for (let index = 0; index < photoArray.length; index ++){
        let tempName = `url("${photoArray[index]}")`;
        //console.log('tempName',tempName);
        let tempDiv = $("<div>").css("background", tempName);
        tempDiv.css("background-repeat", "no-repeat");
        tempDiv.css("background-size", "contain");
        tempDiv.addClass("pic-bg");
        //let tempDiv = $('<img>').attr('src',photoArray[index]).addClass('image-size');
        let tempDivName = '.pic-bg' + index;
        //console.log('tempDivName',tempDivName);

        $(tempDivName).append(tempDiv);
    }
}

// input: lon, lat, searchText;
// output: array of 4 pictures;
function getFlickr(lon='-117.731803',lat='33.635682',searchText = 'dog'){
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
                photoArray.push(picURL);
            }
            insertPicFromFlickr(photoArray);
        }
    }
    $.ajax(ajaxConfig);
    //returns an array of photo urls

}

function initMap() {
    //map options
    var options = {
        zoom: 2,
        //center: {lat: 40.416775, lng: -3.703790},
        center: {lat: 19.334968, lng: -31.423304},
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
            // var nameOnFlagClick = new google.maps.InfoWindow({
            //     content: `<h3>${cities[capitalIndex].city}, ${cities[capitalIndex].country}</h3>`
            // });
            // marker.addListener('click', function(){
            //     nameOnFlagClick.open(gmap, marker)
            // });
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
        makeRequestForWeather(winningCity);
        $(".button-text").on("click", handleButtonClick);
}

function sliceAndSplicedCities(capitalArray, splicedCount){
    var threeCitiesArray = [];
    let mapLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var copiedArray = capitalArray.slice(0);
    for (var cityIndex = 0; cityIndex < splicedCount; cityIndex++) {
        var randomNum = Math.floor(Math.random() * copiedArray.length)
        threeCitiesArray.push(copiedArray[randomNum]);
        let specificClickButton = ".button" + cityIndex;
        let displayText = mapLabels[cityIndex] + ') ' + copiedArray[randomNum].city;
        $(specificClickButton).text(displayText);
        copiedArray.splice(randomNum, 1);
    }
    return threeCitiesArray;
}


function handleButtonClick() {

}

