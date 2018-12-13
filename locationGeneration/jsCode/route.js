class Route {

	constructor(){
		this.routePoints = [];
		this.status = false;
		this.routeDistances = [];
	}

	//Creates the list of corner points in a route from the values input in the GUI 
	 initiateRoutePoints(totalRoutePoints){
	 	this.routePoints = [];
		for (var i = 0; i < totalRoutePoints; i++) {
			let idLat = 'coordPointLat' + i;
			let idLon = 'coordPointLon' + i;
			let tmpLat = document.getElementById(idLat);
			let tmpLon = document.getElementById(idLon);
			let tmpPos = new Position(tmpLat.value, tmpLon.value);
			this.routePoints.push(tmpPos);
		}

		console.log("Route/initialized " + this.routePoints.length + " route points");
	}

	enable(){
		this.status = true; 
	}

	disable(){
		this.status = false;
	}

	/*Calculate distances between the corner points of a map
	ClosedRoute means that the route is a loop and the last corner-point connects with
	the first corner-point*/
	calcDistances(closedRoute){

		// Waits until the page detects the position of the current device
		/*let tid = setInterval( function () {
		    if ( document.readyState !== 'complete' ) return;
		    clearInterval( tid );  */

		    for (var i = 0; i < this.routePoints.length -1; i++) {
		    	
				let goalPosition = new Position(this.routePoints[i].lat, this.routePoints[i].lon);

		    	let currentPosition = new Position(this.routePoints[i+1].lat, this.routePoints[i+1].lon);

				this.routeDistances.push(getDistance(goalPosition, currentPosition).toPrecision(4));

		    }

		    if (closedRoute){

			    let goalPosition = new Position(routePoints[0].lat, routePoints[0].lon);

			    let currentPosition = new Position(routePoints[routePoints.length-1].lat, routePoints[routePoints.length-1].lon);

				this.routeDistances.push(getDistance(goalPosition, currentPosition).toPrecision(4));
			}
			console.log("dist claculated");

		//}, 100);

		return this.routeDistances;

	}

	distancesToString(){

		if (this.routeDistances != undefined){

			// From the last point to the origin
		    let distancesConcat =   "Distance between route points:\n" +  this.routeDistances[0] + " m., ";

		    for (var i = 1; i < this.routeDistances.length; i++) {
		    	distancesConcat = distancesConcat + this.routeDistances[i] + " m., ";
		    }

		    return (distancesConcat);

		}else{

			confirm("Calculate distances first");
		}

	}

	/*calculatePositionOnRoute (){
	//console.log("fraction " + ellapsedTime.value);
	//console.log("speed " + speed.value);

	setRouteBuilderValues();


	let startCoords = new Position(routePoints[0].lat, routePoints[0].lon);

    let endCoords = new Position(routePoints[1].lat, routePoints[1].lon);


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

		confirm("Calculate distances first");
	}*/
	
}

