// retrieve all the gui elements
let distanceHTML ;
//let routePoints = [];
//let routeDistances = [];
let journey;
let gosthSession;

let currentRoute;
let currentMap;

let ellapsedTime ;
let speed;
let route;
let sampleRate;
let speedRate;

// Calculate distance
let distCalculated = false;

//markers
let originMarker;
let nextPointMarker;
let routeMarkers = [];
let fractionMarker;


function setup(){

	// retrieve all the gui elements
distanceHTML = document.getElementById("p1");
ellapsedTime = document.getElementById("ellapsedTime");
speed = document.getElementById("speed");
sampleRate = document.getElementById("sampleRate");
speedRate = document.getElementById("speedRate");

// Instantiate objects
currentRoute = new Route();

currentMap = new Cartography(currentRoute);

// initialize map
currentMap.setup();

// Buttons
document.getElementById("routeButton").onclick = setupRoute;
document.getElementById("calcDist").onclick = calcDistances;
//document.getElementById("fractionButton").onclick = calculateFractionPosition;
document.getElementById("activateJourney").onclick = activateJourney;
//document.getElementById("exportJSON").onclick = saveRouteJSON;

}



/*Create the route markers of the cornerpoints on the map */
var setupRoute = function(){

	let totalRoutePoints = 5;

	// initialize route
	currentRoute.initiateRoutePoints(totalRoutePoints);

	// plot route on map
	currentMap.plotRouteCornerPoints();

} 

/*Calculate distances between the corner points of a map*/
var calcDistances = function(){

	currentRoute.calcDistances();

	distanceHTML.innerHTML = currentRoute.distancesToString();

}

var activateJourney = function(){

	if (currentRoute.routePoints.length > 0){

		journey = new Journey(currentRoute);

		// make route active 
		journey.activateRoute(true);

		// Create Ghost session
		journey.addNewSession();

		// set Ghost session dataPoints
		journey.setGhostSessionPoints(speedRate, sampleRate, true);

		//plot ghost Session
		currentMap.plotSessionDataPoints(journey, 0);

	}else{
		
		alert("Please setup route first");
	}
}


