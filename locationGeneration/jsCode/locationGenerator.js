
/*function getCurrentLocation() {
  if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition();
  } else {
      console.log("Error getting the position")
  }
}*/

function calculateCurrentPosition(startCoords, endCoords, speed, ellapsedTime) {
  let distance = getDistance(startCoords, endCoords);
  let fraction = getTrajectoryFraction(ellapsedTime, speed, distance);
  return getIntermediatePoint(startCoords, endCoords, fraction);

}


function getDistance(startCoords, endCoords){
//Distance code taken from: https://www.movable-type.co.uk/scripts/latlong.html

  let lat1 = startCoords.lat;
  let lon1 = startCoords.lon;
  let lat2 = endCoords.lat;
  let lon2 = endCoords.lon;

  let R = 6371e3; // metres
  
  //Converting latitud and longitude to radians
  //let fi1 = Math.sin((lat1 * Math.PI) / 180);     
  //let fi2 = Math.sin((lat2 * Math.PI) / 180);     

  let fi1 = (lat1 * Math.PI) / 180;     
  let fi2 = (lat2 * Math.PI) / 180;     

  let deltaFi = Math.sin((lat2-lat1) * Math.PI / 180);
  let deltaLambda = Math.sin((lon2-lon1)*Math.PI / 180);

  let a = Math.sin(deltaFi/2) * Math.sin(deltaFi/2) + Math.cos(fi1) * Math.cos(fi2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  let d = R * c;

  return d
}

function getIntermediatePoint(startCoords, endCoords, fraction){

  let lat1 = startCoords.getLatRad();
  let lon1 = startCoords.getLonRad();
  let lat2 = endCoords.getLatRad();
  let lon2 = endCoords.getLonRad();

  let R = 6371e3; // metres

  let d = getDistance(startCoords, endCoords) / R;

  let a = Math.sin((1-fraction) * d)/ Math.sin(d);

  let b = Math.sin(fraction * d) / Math.sin(d);

  let myX = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);

  let myY = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);

  let myZ = a * Math.sin(lat1) + b * Math.sin(lat2);

  let coords = new Position(Math.atan2(myZ, Math.sqrt(Math.pow(myX,2) +Math.pow(myY,2))),Math.atan2(myY, myX));

  coords.convertRadToCoords();

  return coords;
}

function getTrajectoryFraction(ellapsedTime, speed, totalDistance){

  return (speed * ellapsedTime) / totalDistance;

}

  

  