
var x = document.getElementById("demo");

//negative location
//var lat = 40.104471;
//var lon = -88.231053;

//possitive location  
var lat = 40.102243;
var lon = -88.233872;
var maxDist = 500;


function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showIfPosition);
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showIfPosition(position) {
      // Initial content of the element
  var content = "<h2>Am I at home?</h2>"
  
  if(isInLocation(lat, lon, 500, position)){
    x.setAttribute('id','positive')
    
    content = content + "<br> <h1>Yes I at the latitude: "+lat+" and the longitude: "+lon+"!</h1> "

  }else{
    x.setAttribute('id','negative')
    content = content + "<br> <h1>No I'm not :c </h1> "
  }

  x.innerHTML = content
}


function isInLocation(lat, lon, maxDist,position){
//Distance code taken from: https://www.movable-type.co.uk/scripts/latlong.html

  var lat1 = lat;
  var lon1 = lon;
  var lat2 = position.coords.latitude;
  var lon2 = position.coords.longitude;

  var R = 6371e3; // metres
  
  var fi1 = Math.sin((lat1 * Math.PI) / 180);     
  var fi2 = Math.sin(lat1 * Math.PI / 180);     

  var deltaFi = Math.sin((lat2-lat1) * Math.PI / 180);
  var deltaLambda = Math.sin((lon2-lon1)*Math.PI / 180);

  var a = Math.sin(deltaFi/2) * Math.sin(deltaFi/2) + Math.cos(fi1) * Math.cos(fi2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  if(d<= maxDist){
    console.log("entro");
    return true;
  }
  else{
    console.log("no entro");
    return false;
  }
}

var tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );      

    getLocation();
 
    // do your work
}, 100 );
  
  