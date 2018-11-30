// retrieve all the gui elements
let distanceHTML ;
let originLat ;
let originLon ;
let nextPointLat ;
let nextPointLon ;
let ellapsedTime ;
let speed;

// Calculate distance
let distCalculated = false;

//markers
let originMarker;
let nextPointMarker;
let fractionMarker;


function setup(){

	// retrieve all the gui elements
distanceHTML = document.getElementById("p1");
originLat = document.getElementById("originLat");
originLon = document.getElementById("originLon");
nextPointLat = document.getElementById("next_pointLat");
nextPointLon = document.getElementById("next_pointLon");
ellapsedTime = document.getElementById("ellapsedTime");
speed = document.getElementById("speed");

// Buttons
document.getElementById("routeButton").onclick = setRouteBuilderValues;
document.getElementById("fractionButton").onclick = setFractionCalculatorValues;

}


var setRouteBuilderValues = function(){

	//console.log("origin: " + originLat.value + " " + originLon.value);
	//console.log("nextPoint: " + nextPointLat.value + " " + nextPointLon.value);

	// Origin Marker
	if (originMarker == undefined){
		originMarker = L.marker([originLat.value,originLon.value]).addTo(mymap);
		originMarker.bindPopup("Origin").openPopup();
	} else {
		var newLatLng = new L.LatLng(originLat.value,originLon.value);
		originMarker.setLatLng(newLatLng);
	}
	
	// Next point marker
	if (nextPointMarker == undefined){
		nextPointMarker = L.marker([nextPointLat.value,nextPointLon.value]).addTo(mymap);
		nextPointMarker.bindPopup("Next point").openPopup();
	} else {
		var newLatLng = new L.LatLng(nextPointLat.value,nextPointLon.value);
		nextPointMarker.setLatLng(newLatLng);
	}

	// Waits until the page detects the position of the current device
	let tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( tid );      

	let goalPosition = new Position(originLat.value, originLon.value);

    let currentPosition = new Position(nextPointLat.value, nextPointLon.value);

    // Calculates and sets the distance value on html page
    distanceHTML.innerHTML = getDistance(goalPosition, currentPosition).toPrecision(4) + " m.";

    distCalculated = true;

}, 100 );

}

var setFractionCalculatorValues = function(){
	//console.log("fraction " + ellapsedTime.value);
	//console.log("speed " + speed.value);

	let startCoords = new Position(originLat.value, originLon.value);

    let endCoords = new Position(nextPointLat.value, nextPointLon.value);


	if (distCalculated){

			let currentPos = calculateCurrentPosition(startCoords, endCoords, speed.value, ellapsedTime.value);

		if (fractionMarker == undefined){
			fractionMarker = L.marker([currentPos.lat,currentPos.lon]).addTo(mymap);
			fractionMarker.bindPopup("Fraction").openPopup();

		} else {
			var newLatLng = new L.LatLng(currentPos.lat,currentPos.lon);
			fractionMarker.setLatLng(newLatLng);
		}

	} else {

		setRouteBuilderValues();

			let currentPos = calculateCurrentPosition(startCoords, endCoords, speed.value, ellapsedTime.value);

		fractionMarker = L.marker([currentPos.lat,currentPos.lon]).addTo(mymap);
		fractionMarker.bindPopup("Fraction").openPopup();
	}

	
}


