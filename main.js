$(document).ready(loadDocument);

function loadDocument(){
    

};



function initMap(){ 
    //map options
    var options = {
        zoom: 2,
        center: {lat: 40.416775, lng: -3.703790}
    }
    //creating a new map
    var gmap = new google.maps.Map(document.getElementById('theMap'), options)

    // var capitals = [
    //     {
    //       //location: 'Canberra, Aus',  
    //       coordinates:{lat: -35.2809, lng: 149.1300},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Canberra, Aus</h3>'
    //     },
    //     {
    //       //location: Rome, Italy,
    //       coordinates:{lat: 41.9, lng: 12.5},
    //       iconImg: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Rome, ITL</h3>'
    //     },
    //     {
    //       //location: Hanoi, Vietnam,
    //       coordinates:{lat: 21.028333, lng: 105.854167},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Hanoi, VT</h3>'
    //     },
    //       //location: Cape Town, South Africa
    //     {
    //       coordinates:{lat:-33.925278, lng: 18.423889},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Cape Town, SA</h3>'
    //     }           
    // // ]
    
    // for(var capitalIndex = 0; capitalIndex < capitals.length; capitalIndex++){
    //     addMarkerToMap(capitals[capitalIndex])
    // }

    ;
    addMarkerToMap(threeCitites(capitalCities));

    function addMarkerToMap(capitalCityObject){
        for(var capitalIndex = 0; capitalIndex < capitalCityObject.length; capitalIndex++){
            var marker = new google.maps.Marker({
                position: {lat:capitalCityObject[capitalIndex].latitude, lng:capitalCityObject[capitalIndex].longitude},
                map: gmap,
                // icon: capitalCityObject.iconImg,
                content: `<h3>${capitalCityObject[capitalIndex].city}, ${capitalCityObject[capitalIndex].country}</h3>`, 
                })
                var nameOnFlagClick = new google.maps.InfoWindow({
                    content: `<h3>${capitalCityObject[capitalIndex].city}, ${capitalCityObject[capitalIndex].country}</h3>`
                });
                marker.addListener('click', function(){
                    nameOnFlagClick.open(gmap, marker)
                })
        }

    }
}  



