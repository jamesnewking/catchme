$(document).ready(loadDocument);

function loadDocument(){
    

};



function initMap(){ 
    //map options
    var options = {
        zoom: 2,
        center: {lat: -25.2744, lng: 133.7751}
    }
    //creating a new map
    var gmap = new google.maps.Map(document.getElementById('theMap'), options)

    /*
    //creating a new marker
    var marker = new google.maps.Marker({
        position: {lat: -35.2809, lng: 149.1300},
        map: gmap,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

    })
 
    var nameOnFlagClick = new google.maps.InfoWindow({
        content: '<h1>Canberra, AUS</h1>'
    })
    marker.addListener('click', function(){
        nameOnFlagClick.open(gmap, marker)
    })

    */

//     var capitals = [{
//        position: {lat: -35.2809, lng: 149.1300},
//        map: gmap,
//        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
//        content: <h3>Canberra, Aus</h3>
//     }
// ]
    var capitals = [
        {
          //location: 'Canberra, Aus',  
          coordinates:{lat: -35.2809, lng: 149.1300},
          iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: '<h3>Canberra, Aus</h3>'
        },
        {
          //location: Rome, Italy,
          coordinates:{lat: 41.9, lng: 12.5},
          iconImg: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: '<h3>Rome, ITL</h3>'
        },
        {
          //location: Hanoi, Vietnam,
          coordinates:{lat: 21.028333, lng: 105.854167},
          iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content: '<h3>Hanoi, VT</h3>'
        }
    ]
    
    for(var capitalIndex = 0; capitalIndex < capitals.length; capitalIndex++){
        addMarkerToMap(capitals[capitalIndex])
    }


    function addMarkerToMap(capitalCityObject){
        var marker = new google.maps.Marker({
            position: capitalCityObject.coordinates,
            map: gmap,
            icon: capitalCityObject.iconImg,
            content: capitalCityObject.content, 
            })
            var nameOnFlagClick = new google.maps.InfoWindow({
                content: capitalCityObject.content
            });
            marker.addListener('click', function(){
                nameOnFlagClick.open(gmap, marker)
            })
    }
}  

